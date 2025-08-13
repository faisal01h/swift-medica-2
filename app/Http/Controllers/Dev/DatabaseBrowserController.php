<?php

namespace App\Http\Controllers\Dev;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DatabaseBrowserController extends Controller
{
    /**
     * Display a list of tables and optionally columns for a selected table.
     */
    public function index(Request $request)
    {
        $driver = DB::connection()->getDriverName();
        if ($driver === 'mysql') {
            $dbName = DB::getDatabaseName();
            $tablesRaw = DB::select("SHOW TABLES");
            $key = "Tables_in_{$dbName}";
            $tables = collect($tablesRaw)->map(fn($row) => $row->$key)->toArray();
        } elseif ($driver === 'sqlite') {
            $tablesRaw = DB::select("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
            $tables = collect($tablesRaw)->pluck('name')->toArray();
        } elseif ($driver === 'pgsql') {
            // PostgreSQL: list public tables
            $tablesRaw = DB::select("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'");
            $tables = collect($tablesRaw)->pluck('table_name')->toArray();
        } else {
            $tables = [];
        }

        $currentTable = $request->query('table');
        $columns = [];
        if ($currentTable) {
            if ($driver === 'mysql') {
                $columns = DB::select("SHOW COLUMNS FROM `{$currentTable}`");
            } elseif ($driver === 'sqlite') {
                $pragma = DB::select("PRAGMA table_info('{$currentTable}')");
                $columns = collect($pragma)->map(fn($col) => (object) [
                    'Field' => $col->name,
                    'Type' => $col->type,
                    'Null' => $col->notnull ? 'NO' : 'YES',
                    'Key' => ($col->pk ? 'PRI' : ''),
                    'Default' => $col->dflt_value,
                    'Extra' => '',
                ])->toArray();
            } elseif ($driver === 'pgsql') {
                // PostgreSQL: fetch column metadata
                $columnsRaw = DB::select(
                    "SELECT column_name AS Field, data_type AS Type, is_nullable AS Null, column_default AS Default
                     FROM information_schema.columns
                     WHERE table_name = ? AND table_schema='public'
                     ORDER BY ordinal_position",
                    [$currentTable]
                );
                $columns = collect($columnsRaw)->map(fn($col) => (object) [
                    'Field' => $col->Field,
                    'Type' => $col->Type,
                    'Null' => $col->Null,
                    'Key' => '',
                    'Default' => $col->Default,
                    'Extra' => '',
                ])->toArray();
            } else {
                $columns = [];
            }
            // Fetch rows
            $rows = DB::table($currentTable)->limit(100)->get();
            // Determine primary key
            if ($driver === 'pgsql') {
                $pkInfo = DB::select(
                    "SELECT a.attname AS primarykey
                     FROM pg_index i
                     JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
                     WHERE i.indrelid = ?::regclass
                       AND i.indisprimary",
                    [$currentTable]
                );
                $primaryKey = $pkInfo[0]->primarykey ?? null;
            } else {
                $primaryKey = collect($columns)->first(fn($col) => $col->Key === 'PRI')->Field ?? null;
            }
        } else {
            $rows = [];
            $primaryKey = null;
        }

        return Inertia::render('Dev/DatabaseBrowser', [
            'tables' => $tables,
            'currentTable' => $currentTable,
            'columns' => $columns,
            'rows' => $rows,
            'primaryKey' => $primaryKey,
        ]);
    }

    /**
     * Store a new record in the selected table.
     */
    public function store(Request $request)
    {
        $data = $request->except('_token', 'table');
        $table = $request->input('table');
        DB::table($table)->insert($data);
        return redirect()->route('dev.database-browser', ['table' => $table]);
    }

    /**
     * Delete a record by primary key from the selected table.
     */
    public function destroy(Request $request, $table, $id)
    {
        $primaryKey = $request->query('primaryKey');
        DB::table($table)->where($primaryKey, $id)->delete();
        return redirect()->route('dev.database-browser', ['table' => $table]);
    }
}