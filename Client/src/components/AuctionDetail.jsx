import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const AuctionDetail = ({ user }) => {
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [closing, setClosing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAuctionDetails();
    const timer = setInterval(fetchAuctionDetails, 5000); // Refresh every 5 seconds
    return () => clearInterval(timer);
  }, [id]);

  const fetchAuctionDetails = async () => {
    try {
      const response = await api.get(`/auctions/${id}`);
      setAuction(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching auction:', error);
      setError('Failed to load auction details');
      setLoading(false);
    }
  };

  const handleBid = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (!user) {
        navigate('/login');
        return;
      }

      const response = await api.post(`/auctions/${id}/bid`, {
        amount: parseFloat(bidAmount)
      });

      setAuction(response.data);
      setBidAmount('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to place bid');
    }
  };

  const handleCloseAuction = async () => {
    try {
      if (!window.confirm('Are you sure you want to end this auction?')) {
        return;
      }

      setClosing(true);
      setError('');
      
      const response = await api.post(`/auctions/${id}/close`);
      setAuction(response.data);
      
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to close auction');
    } finally {
      setClosing(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!auction) return <div>Auction not found</div>;

  const isOwner = user && auction.creator._id === user.id;
  const isEnded = auction.status === 'ended' || new Date(auction.endDate) < new Date();
  const highestBid = auction.bids[auction.bids.length - 1];

  return (
    <div className="auction-detail">
      <h2>{auction.title}</h2>
      <div className="auction-info">
        <p>Created by: {auction.creator.username}</p>
        <p>{auction.description}</p>
        <p>Starting Bid: ${auction.startingBid}</p>
        <p>Current Bid: ${auction.currentBid}</p>
        <p>End Date: {new Date(auction.endDate).toLocaleString()}</p>
        <p>Status: {isEnded ? 'Ended' : 'Active'}</p>
        {highestBid && (
          <p>Highest Bidder: {highestBid.bidder.username}</p>
        )}
        
        {isOwner && !isEnded && (
          <button 
            className="btn btn-outline"
            onClick={handleCloseAuction}
            disabled={closing}
          >
            {closing ? 'Ending Auction...' : 'End Auction Now'}
          </button>
        )}
      </div>

      {!isEnded && !isOwner && user && (
        <form onSubmit={handleBid} className="bid-form">
          <div className="form-group">
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              min={auction.currentBid + 1}
              step="0.01"
              placeholder={`Min bid: $${(auction.currentBid + 1).toFixed(2)}`}
              required
            />
            <button type="submit" className="btn">Place Bid</button>
          </div>
          {error && <div className="error">{error}</div>}
        </form>
      )}

      <div className="bid-history">
        <h3>Bid History</h3>
        {auction.bids.length > 0 ? (
          <ul>
            {auction.bids.map((bid, index) => (
              <li key={index}>
                ${bid.amount.toFixed(2)} by {bid.bidder.username} 
                - {new Date(bid.timestamp).toLocaleString()}
                {index === auction.bids.length - 1 && isEnded && (
                  <span className="winner-badge">Winner!</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No bids yet</p>
        )}
      </div>
    </div>
  );
};

export default AuctionDetail; 