import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Divider,
  TextField,
  Avatar,
  Chip
} from '@mui/material';
import { Close, Add, Remove, Delete, ShoppingCartCheckout } from '@mui/icons-material';
import { useShop } from '../../context/ShopContext';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartDrawer({ open, onClose, onCheckout }: CartDrawerProps) {
  const { cart, products, updateCartQuantity, removeFromCart, getCartTotal } = useShop();

  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);

  const handleQuantityChange = (productId: string, size: number, change: number) => {
    const currentItem = cart.find(item => item.productId === productId && item.size === size);
    if (currentItem) {
      const newQuantity = currentItem.quantity + change;
      updateCartQuantity(productId, size, newQuantity);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              Mon Panier ({cart.length})
            </Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
        </Box>

        {cartItems.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center', flexGrow: 1 }}>
            <Typography variant="body1" color="text.secondary">
              Votre panier est vide
            </Typography>
          </Box>
        ) : (
          <>
            <List sx={{ flexGrow: 1, overflow: 'auto' }}>
              {cartItems.map((item, index) => (
                <React.Fragment key={`${item.productId}-${item.size}`}>
                  <ListItem alignItems="flex-start">
                    <Avatar
                      src={item.product!.image}
                      alt={item.product!.name}
                      sx={{ mr: 2, width: 60, height: 60 }}
                      variant="rounded"
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" noWrap>
                        {item.product!.brand} {item.product!.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Pointure: {item.size}
                      </Typography>
                      <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                        {item.product!.price}€
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.productId, item.size, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <TextField
                          size="small"
                          value={item.quantity}
                          inputProps={{
                            style: { textAlign: 'center' },
                            min: 1,
                            max: 10
                          }}
                          sx={{ width: 60 }}
                          disabled
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.productId, item.size, 1)}
                          disabled={item.quantity >= 10}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removeFromCart(item.productId, item.size)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {(item.product!.price * item.quantity).toFixed(2)}€
                      </Typography>
                    </Box>
                  </ListItem>
                  {index < cartItems.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>

            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary">
                  {getCartTotal().toFixed(2)}€
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<ShoppingCartCheckout />}
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
              >
                Passer commande
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}