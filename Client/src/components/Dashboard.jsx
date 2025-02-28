import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table, Card } from "react-bootstrap";
import api from '../utils/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [auctions, setAuctions] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newItem, setNewItem] = useState({
        title: '',
        description: '',
        startingBid: '',
        endDate: ''
    });

    useEffect(() => {
        fetchAuctions();
    }, []);

    const fetchAuctions = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/auctions');
            setAuctions(response.data);
        } catch (error) {
            console.error('Error fetching auctions:', error);
            setError('Failed to load auctions');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            const formattedItem = {
                title: newItem.title.trim(),
                description: newItem.description.trim(),
                startingBid: parseFloat(newItem.startingBid),
                endDate: new Date(newItem.endDate).toISOString()
            };

            console.log("Sending auction data:", formattedItem);

            // Validate data before sending
            if (!formattedItem.title || !formattedItem.description) {
                setError('Title and description are required');
                return;
            }

            if (isNaN(formattedItem.startingBid) || formattedItem.startingBid <= 0) {
                setError('Starting bid must be a positive number');
                return;
            }

            const response = await api.post('/auctions', formattedItem);
            console.log("Server response:", response.data);

            setAuctions(prevAuctions => [...prevAuctions, response.data]);
            setShowAddModal(false);
            setNewItem({
                title: '',
                description: '',
                startingBid: '',
                endDate: ''
            });
        } catch (error) {
            console.error('Error adding item:', error.response?.data || error);
            setError(
                error.response?.data?.message || 
                error.response?.data?.error || 
                'Failed to add item'
            );
        }
    };

    return (
        <div className="auction-dashboard">
            <div className="dashboard-header">
                <h2>Active Auctions</h2>
                <button 
                    className="btn"
                    onClick={() => setShowAddModal(true)}
                >
                    Add Item
                </button>
            </div>

            {isLoading ? (
                <div className="loading-spinner">Loading...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : auctions.length === 0 ? (
                <div className="no-auctions">No active auctions found.</div>
            ) : (
                <div className="auction-grid">
                    {auctions.map(auction => (
                        <div key={auction._id} className="card auction-card">
                            <div className="auction-card-content">
                                <h3>{auction.title}</h3>
                                <p>{auction.description}</p>
                                <p>Current Bid: ${auction.currentBid || auction.startingBid}</p>
                                <p>Ends: {new Date(auction.endDate).toLocaleDateString()}</p>
                            </div>
                            <div className="auction-card-actions">
                                <Link to={`/auction/${auction._id}`} className="btn">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button 
                            className="modal-close"
                            onClick={() => setShowAddModal(false)}
                        >
                            ×
                        </button>
                        <h3 className="form-title">Add New Item</h3>
                        <form onSubmit={handleAddItem}>
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={newItem.title}
                                    onChange={e => setNewItem({...newItem, title: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={newItem.description}
                                    onChange={e => setNewItem({...newItem, description: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Starting Bid ($)</label>
                                <input
                                    type="number"
                                    value={newItem.startingBid}
                                    onChange={e => setNewItem({...newItem, startingBid: e.target.value})}
                                    required
                                    min="0"
                                />
                            </div>
                            <div className="form-group">
                                <label>End Date</label>
                                <input
                                    type="datetime-local"
                                    value={newItem.endDate}
                                    onChange={e => setNewItem({...newItem, endDate: e.target.value})}
                                    required
                                    min={new Date().toISOString().slice(0, 16)}
                                />
                            </div>
                            <div className="form-actions">
                                <button 
                                    type="button" 
                                    className="btn btn-outline"
                                    onClick={() => setShowAddModal(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn">
                                    Add Item
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
