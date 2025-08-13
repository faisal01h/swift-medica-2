import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function ViewUserModal({ userId, visible, onHide }) {
    const [user, setUser] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (visible && userId) {
            setLoading(true);
            fetch(route('users.show', userId))
                .then(res => res.json())
                .then(data => {
                    setUser(data.user);
                    setSessions(data.sessions);
                })
                .catch(() => {})
                .finally(() => setLoading(false));
        }
    }, [visible, userId]);

    return (
        <Dialog
            header="User Details"
            visible={visible}
            style={{ width: '600px' }}
            onHide={onHide}
            modal
        >
            {loading ? (
                <div>Loading...</div>
            ) : user ? (
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-medium">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Active Sessions</h4>
                        <DataTable value={sessions} responsiveLayout="scroll">
                            <Column field="ip_address" header="IP Address" />
                            <Column field="user_agent" header="User Agent" />
                            <Column
                                field="last_activity"
                                header="Last Activity"
                                body={data => new Date(data.last_activity * 1000).toLocaleString()}
                            />
                        </DataTable>
                    </div>
                </div>
            ) : (
                <div>No user data</div>
            )}
        </Dialog>
    );
}
