import React, { useState } from 'react';

import { useHistory } from "react-router-dom";

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material';

import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

import { LoginDialog } from './LoginDialog';

interface Props {
  token: string | null
  updateToken: (newValue: string, options?: Cookies.CookieAttributes | undefined) => void
  deleteToken: () => void
}

export const Navbar = (props: Props) => {
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [collectionCnt, setCollectionCnt] = useState(0);
  const [cartCnt, setCartCnt] = useState(0);

  const open = Boolean(anchorEl);

  const handleCollections = (event: React.MouseEvent) => {
    if (props.token == null) setFormOpen(true);
  };

  const handleCart = (event: React.MouseEvent) => {
    if (props.token == null) setFormOpen(true);
  };

  const handleAccount = (event: React.MouseEvent<HTMLElement>) => {
    if (props.token == null) {
      setFormOpen(true);
      return;
    };

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    history.push('/userProfile');
  };

  const handleLogOut = () => {
    props.deleteToken();
    setAnchorEl(null);

    history.push('/');
  };

  const menuId = 'primary-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={handleEditProfile}>EDIT</MenuItem>
      <MenuItem onClick={handleLogOut}>LOG OUT</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <LoginDialog formOpen={formOpen} setFormOpen={setFormOpen} updateToken={props.updateToken}></LoginDialog>

        <Toolbar>
            <Button
              variant="text"
              color="inherit"
              size="large"
              href="/"
              sx={{ textTransform: 'none' }}
            >
              eLIBRARY
            </Button>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="collections"
              color="inherit"
              onClick={handleCollections}
            >
              <Badge badgeContent={collectionCnt} color="error">
                <CollectionsBookmarkIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              aria-label="shopping-cart"
              color="inherit"
              onClick={handleCart}
            >
              <Badge badgeContent={cartCnt} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleAccount}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
