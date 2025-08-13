import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function DatabaseBrowser() {
    const { tables, currentTable, columns, rows, primaryKey } = usePage().props;
    const [showModal, setShowModal] = useState(false);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Database Browser
                </h2>
            }
        >
            <Head title="Database Browser" />

            <div className="flex space-x-4">
                {/* Tables list */}
                <aside className="w-1/4 bg-white border border-gray-200 p-4">
                    <h3 className="font-semibold mb-2">Tables</h3>
                    <ul>
                        {tables.map((table) => (
                            <li
                                key={table}
                                className={`py-1 ${
                                    table === currentTable ? 'font-bold' : ''
                                }`}
                            >
                                <Link
                                    href={route('dev.database-browser', { table })}
                                >
                                    {table}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Columns display */}
                <section className="flex-1 bg-white border border-gray-200 p-4">
                    {currentTable ? (
                        <>
                            {/* Columns display */}
                            <h3 className="font-semibold mb-2">
                                Columns in {currentTable}
                            </h3>
                            <div className="overflow-auto">
                                <table className="w-full table-auto border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="border px-2 py-1">Field</th>
                                            <th className="border px-2 py-1">Type</th>
                                            <th className="border px-2 py-1">Null</th>
                                            <th className="border px-2 py-1">Key</th>
                                            <th className="border px-2 py-1">Default</th>
                                            <th className="border px-2 py-1">Extra</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {columns.map((col) => (
                                            <tr key={col.Field}>
                                                <td className="border px-2 py-1">
                                                    {col.Field}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {col.Type}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {col.Null}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {col.Key}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {col.Default}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {col.Extra}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Add New Record trigger */}
                            <Button
                                label="Add New Record"
                                icon="pi pi-plus"
                                className="mb-4"
                                onClick={() => setShowModal(true)}
                            />

                            {/* Modal popup for new record */}
                            <Dialog
                                visible={showModal}
                                header={`Add New Record to ${currentTable}`}
                                modal
                                onHide={() => setShowModal(false)}
                            >
                                <form
                                    method="post"
                                    action={route('dev.database-browser.store')}
                                    className="p-fluid"
                                >
                                    <input type="hidden" name="table" value={currentTable} />
                                    {columns.map((col) => (
                                        <div key={col.Field} className="p-field">
                                            <label htmlFor={col.Field}>{col.Field}</label>
                                            <InputText id={col.Field} name={col.Field} />
                                        </div>
                                    ))}
                                    <div className="flex justify-end mt-3">
                                        <Button
                                            label="Cancel"
                                            className="p-button-text"
                                            onClick={() => setShowModal(false)}
                                        />
                                        <Button
                                            label="Add"
                                            icon="pi pi-check"
                                            type="submit"
                                            className="p-button-primary ml-2"
                                        />
                                    </div>
                                </form>
                            </Dialog>

                            {/* Rows display */}
                            <DataTable value={rows} responsiveLayout="scroll" className="mt-4">
                                {columns.map((col) => (
                                    <Column key={col.Field} field={col.Field} header={col.Field} />
                                ))}
                                <Column
                                    header="Actions"
                                    body={(row) => (
                                        <Link
                                            href={
                                                route(
                                                    'dev.database-browser.destroy',
                                                    { table: currentTable, id: row[primaryKey] }
                                                ) + `?primaryKey=${primaryKey}`
                                            }
                                            method="delete"
                                            as="button"
                                            className="p-button p-button-text p-button-danger"
                                        >
                                            <i className="pi pi-trash" />
                                        </Link>
                                    )}
                                />
                            </DataTable>
                        </>
                    ) : (
                        <div>Select a table to view columns.</div>
                    )}
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
