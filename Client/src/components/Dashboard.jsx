import React, { useState } from "react";
import { Button, Modal, Form, Table, Card } from "react-bootstrap";

const AuctionDashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [auctions, setAuctions] = useState([
        { id: 1, item: "Vintage Watch", bid: "$500", status: "Live" },
        { id: 2, item: "Classic Car Model", bid: "$1200", status: "Upcoming" },
        { id: 3, item: "Painting", bid: "$800", status: "Completed" },
    ]);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Auction Dashboard</h2>

            {/* Add Auction Button */}
            <div className="d-flex justify-content-end mb-3">
                <Button variant="primary" onClick={handleShow}>Add Auction</Button>
            </div>

            {/* Auction Table */}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Item</th>
                        <th>Current Bid</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {auctions.map((auction, index) => (
                        <tr key={auction.id}>
                            <td>{index + 1}</td>
                            <td>{auction.item}</td>
                            <td>{auction.bid}</td>
                            <td>
                                <span className={`badge bg-${auction.status === "Live" ? "success" : auction.status === "Upcoming" ? "warning" : "secondary"}`}>
                                    {auction.status}
                                </span>
                            </td>
                            <td>
                                <Button variant="info" size="sm" className="me-2 mb-2">View</Button>
                                <Button variant="danger" size="sm" className="mb-2 ">End Auction</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Add Auction Modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Auction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter item name" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Starting Bid</Form.Label>
                            <Form.Control type="number" placeholder="Enter starting bid" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select>
                                <option>Upcoming</option>
                                <option>Live</option>
                                <option>Completed</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit">Add Auction</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AuctionDashboard;
