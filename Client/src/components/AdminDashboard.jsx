import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersResponse, auctionsResponse] = await Promise.all([
                    api.get('/admin/users'),
                    api.get('/admin/auctions')
                ]);
                setUsers(usersResponse.data);
                setAuctions(auctionsResponse.data);
            } catch (error) {
                console.error('Error fetching admin data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            
            <section className="dashboard-section">
                <h3>Users Management</h3>
                <div className="card">
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.status}</td>
                                    <td>
                                        <button className="btn btn-sm">Edit</button>
                                        <button className="btn btn-sm btn-outline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="dashboard-section">
                <h3>Auctions Overview</h3>
                <div className="card">
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Current Bid</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {auctions.map(auction => (
                                <tr key={auction._id}>
                                    <td>{auction.item}</td>
                                    <td>${auction.currentBid}</td>
                                    <td>{auction.status}</td>
                                    <td>
                                        <button className="btn btn-sm">View</button>
                                        <button className="btn btn-sm btn-outline">End</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard; 