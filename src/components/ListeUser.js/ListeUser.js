import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Chip, Grid } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt'; // Icon for lists
import AddIcon from '@mui/icons-material/Add'; // Icon to add a list
import axios from 'axios'; // For API requests
import { useNavigate } from 'react-router-dom';

const UserLists = ({ lists }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {lists.map((list, index) => (
          <Grid item key={index}>
            <Chip
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ListAltIcon sx={{ marginRight: '5px' }} />
                  {list.name}
                </Box>
              }
              variant="outlined"
              sx={{
                borderRadius: '25px',
                padding: '10px 15px',
                fontSize: '16px',
              }}
            />
          </Grid>
        ))}

        {/* Add new list button */}
        <Grid item>
          <Button
            startIcon={<AddIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              color: 'blue',
              fontSize: '16px',
            }}
          >
            New List
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const ListeUser = () => {
  const [lists, setLists] = useState([]); // State to store the lists
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = localStorage.getItem('token'); // Fetch the JWT token from localStorage
        const response = await axios.get('http://127.0.0.1:5000/users/lists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          
        });

        setLists(response.data.lists); // Update state with fetched lists
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lists:', error);
        setError('Failed to fetch lists.');
        setLoading(false);
      }
    };

    fetchLists(); // Call the function to fetch lists on component mount
  }, []);

  // Handle loading and error states
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return <UserLists lists={lists} />;
};

export default ListeUser;
