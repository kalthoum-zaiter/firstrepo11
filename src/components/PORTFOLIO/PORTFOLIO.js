import React, { useState } from 'react';
import axios from 'axios';
import PortfolioPopup from '../PortefolioPopUp/PortefolioPopUp';  // Assuming this component handles the modal

const PortfolioManager = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  // Function to handle saving a new portfolio
  const handleSavePortfolio = async (portfolioName) => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');

      // Check if token is present
      if (!token) {
        console.error('User is not authenticated');
        alert('Please log in to create a portfolio.');
        return;
      }

      // API request to save the portfolio
      const response = await axios.post(
        'http://127.0.0.1:5000/portfolios',
        { name: portfolioName },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Use backticks for correct token interpolation
            'Content-Type': 'application/json',
          },
        }
      );

      // If successful, log the response and close the modal
      console.log('Portfolio saved successfully:', response.data);
      setModalOpen(false);  // Close the modal on success
    } catch (error) {
      // Handle any errors that occur during the API request
      if (error.response) {
        console.error('Error response:', error.response.data);
        if (error.response.status === 422) {
          alert('Validation error: ' + error.response.data.message);
        } else {
          alert('Error: ' + error.response.data.message);
        }
      } else {
        console.error('Error saving portfolio:', error);
        alert('An error occurred while saving the portfolio.');
      }
    }
  };
  
  return (
    <div>
      {/* Button to open the modal */}
      <button 
        onClick={() => setModalOpen(true)}  
        style={{ marginTop: '2em', width: '100%' }}  // Styling for the button
      >
        + Nouveau portefeuille
      </button>

      {/* Modal component to handle portfolio creation */}
      <PortfolioPopup
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSavePortfolio}  // Pass the save handler to the modal
      />
    </div>
  );
};

export default PortfolioManager;
