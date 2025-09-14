import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  ShoppingCart,
  AccountCircle,
  Menu as MenuIcon,
  Store,
  Dashboard,
  Inventory,
  People,
  ShoppingBag
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useShop } from '../../context/ShopContext';

interface HeaderProps {
  onCartOpen: () => void;
  onAuthOpen: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

export default function Header({ onCartOpen, onAuthOpen, currentView, onViewChange }: HeaderProps) {
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useShop();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    onViewChange('shop');
  };

  const getNavigationItems = () => {
    if (!user) {
      return [
        { key: 'shop', label: 'Boutique', icon: <Store /> }
      ];
    }

    switch (user.role) {
      case 'admin':
        return [
          { key: 'shop', label: 'Boutique', icon: <Store /> },
          { key: 'dashboard', label: 'Dashboard', icon: <Dashboard /> },
          { key: 'products', label: 'Produits', icon: <Inventory /> },
          { key: 'orders', label: 'Commandes', icon: <ShoppingBag /> },
          { key: 'users', label: 'Utilisateurs', icon: <People /> }
        ];
      case 'seller':
        return [
          { key: 'shop', label: 'Boutique', icon: <Store /> },
          { key: 'products', label: 'Produits', icon: <Inventory /> },
          { key: 'orders', label: 'Commandes', icon: <ShoppingBag /> }
        ];
      default:
        return [
          { key: 'shop', label: 'Boutique', icon: <Store /> },
          { key: 'orders', label: 'Mes Commandes', icon: <ShoppingBag /> }
        ];
    }
  };

  const NavigationContent = () => (
    <List>
      {getNavigationItems().map((item) => (
        <ListItem
          button
          key={item.key}
          onClick={() => {
            onViewChange(item.key);
            setDrawerOpen(false);
          }}
          selected={currentView === item.key}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ShoeShop Pro
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {getNavigationItems().map((item) => (
                <Button
                  key={item.key}
                  color="inherit"
                  onClick={() => onViewChange(item.key)}
                  variant={currentView === item.key ? 'outlined' : 'text'}
                  startIcon={item.icon}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {user?.role === 'customer' && (
              <IconButton color="inherit" onClick={onCartOpen}>
                <Badge badgeContent={getCartItemsCount()} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            )}

            {user ? (
              <>
                <IconButton color="inherit" onClick={handleMenuOpen}>
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}>
                    <Typography variant="body2">
                      {user.firstName} {user.lastName} ({user.role})
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
                </Menu>
              </>
            ) : (
              <Button color="inherit" onClick={onAuthOpen}>
                Connexion
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, mt: 8 }}>
          <NavigationContent />
        </Box>
      </Drawer>
    </>
  );
}