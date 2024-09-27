import React from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { useState } from 'react';

// Fonction pour se déconnecter
const handleLogout = () => {
    // Supprimer le token du localStorage ou sessionStorage
    localStorage.removeItem('access_token');  // Si tu utilises localStorage
    sessionStorage.removeItem('access_token');  // Si tu utilises sessionStorage

    // Optionnel : Supprimer aussi les informations de l'utilisateur
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');

    // Rediriger vers la page de connexion
    window.location.href = '/signin';
};

const LogoutButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    // Fonction pour ouvrir le menu au clic sur l'avatar
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Fonction pour fermer le menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenu}
                >
                    {/* Avatar pour l'utilisateur connecté */}
                    <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
                </IconButton>
                {/* Menu déroulant avec l'option de déconnexion */}
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleLogout}>Se Déconnecter</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default LogoutButton;
