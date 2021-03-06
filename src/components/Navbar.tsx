import React, { useState, useEffect } from 'react';

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
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import EditIcon from '@mui/icons-material/Edit';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LogoutIcon from '@mui/icons-material/Logout';


import { LoginDialog } from './LoginDialog';

import { ApiError, CartsService } from '../services/elibraryAPI';

const { cartsApiGetCart } = CartsService;

interface Props {
  token: string | null
  updateToken: (newValue: string, options?: Cookies.CookieAttributes | undefined) => void
  deleteToken: () => void
  cartCnt?: number
  setCartCnt?: React.Dispatch<React.SetStateAction<number>>
}

export const Navbar = (props: Props) => {
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [formOpen, setFormOpen] = useState(false);

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (!props.setCartCnt) return;

    cartsApiGetCart()
      .then((resp) => {
        if (props.setCartCnt) {
          props.setCartCnt(resp.data.length);
        }
      })
      .catch((err: ApiError) => console.log(err))
  // eslint-disable-next-line
  }, []);

  const handleCollections = (event: React.MouseEvent) => {
    if (props.token == null) {
      setFormOpen(true);
      return;
    }

    history.push('/collected');
  };

  const handleCart = (event: React.MouseEvent) => {
    if (props.token == null) {
      setFormOpen(true);
      return;
    }

    history.push('/cart');
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
      <MenuItem onClick={handleEditProfile}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>EDIT</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => { history.push('/orders'); }}>
        <ListItemIcon>
          <ReceiptIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>ORDERS</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleLogOut}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>LOG OUT</ListItemText>
      </MenuItem>
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
              <CollectionsBookmarkIcon />
            </IconButton>

            <IconButton
              size="large"
              aria-label="shopping-cart"
              color="inherit"
              onClick={handleCart}
            >
              <Badge badgeContent={props.cartCnt ?? 0} color="error">
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
