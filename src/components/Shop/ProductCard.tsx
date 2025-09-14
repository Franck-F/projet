import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Badge
} from '@mui/material';
import { ShoppingCart, Warning } from '@mui/icons-material';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useShop();
  const { user } = useAuth();
  const [selectedSize, setSelectedSize] = React.useState<number | ''>('');

  const availableSizes = product.sizes.filter(size => size.stock > 0);
  const totalStock = product.sizes.reduce((sum, size) => sum + size.stock, 0);
  const isLowStock = totalStock <= 10;
  const isOutOfStock = totalStock === 0;

  const handleAddToCart = () => {
    if (selectedSize && user?.role === 'customer') {
      const success = addToCart(product.id, selectedSize as number, 1);
      if (success) {
        setSelectedSize('');
      }
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'men': return 'Homme';
      case 'women': return 'Femme';
      case 'kids': return 'Enfant';
      default: return category;
    }
  };

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box position="relative">
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
        />
        {isOutOfStock && (
          <Chip
            label="Épuisé"
            color="error"
            sx={{ position: 'absolute', top: 8, right: 8 }}
          />
        )}
        {isLowStock && !isOutOfStock && (
          <Badge
            badgeContent={<Warning fontSize="small" />}
            color="warning"
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <Chip label="Stock faible" color="warning" />
          </Badge>
        )}
        <Chip
          label={getCategoryLabel(product.category)}
          color="primary"
          size="small"
          sx={{ position: 'absolute', top: 8, left: 8 }}
        />
      </Box>
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {product.brand} {product.name}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Couleur: {product.color}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {product.description.substring(0, 100)}...
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" color="primary">
            {product.price}€
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Stock: {totalStock}
          </Typography>
        </Box>

        {user?.role === 'customer' && !isOutOfStock && (
          <Box sx={{ mt: 'auto' }}>
            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel>Pointure</InputLabel>
              <Select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value as number)}
                label="Pointure"
              >
                {availableSizes.map((size) => (
                  <MenuItem key={size.size} value={size.size}>
                    {size.size} (Stock: {size.stock})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Button
              variant="contained"
              fullWidth
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              disabled={!selectedSize}
            >
              Ajouter au panier
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}