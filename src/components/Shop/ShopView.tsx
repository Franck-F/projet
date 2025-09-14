import React, { useState, useMemo } from 'react';
import {
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Chip,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { ExpandMore, FilterList, Clear } from '@mui/icons-material';
import { useShop } from '../../context/ShopContext';
import ProductCard from './ProductCard';

export default function ShopView() {
  const { products } = useShop();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 200]);
  const [sortBy, setSortBy] = useState<string>('name');

  // Get unique brands
  const brands = useMemo(() => 
    Array.from(new Set(products.map(p => p.brand))).sort(),
    [products]
  );

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && product.isActive;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'brand':
          return a.brand.localeCompare(b.brand);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, selectedBrand, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange([0, 200]);
    setSortBy('name');
  };

  const FilterSection = () => (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <TextField
          label="Rechercher"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 200, flex: 1 }}
        />
        
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Catégorie</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Catégorie"
          >
            <MenuItem value="all">Toutes</MenuItem>
            <MenuItem value="men">Hommes</MenuItem>
            <MenuItem value="women">Femmes</MenuItem>
            <MenuItem value="kids">Enfants</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Marque</InputLabel>
          <Select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            label="Marque"
          >
            <MenuItem value="all">Toutes</MenuItem>
            {brands.map(brand => (
              <MenuItem key={brand} value={brand}>{brand}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Trier par</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="Trier par"
          >
            <MenuItem value="name">Nom</MenuItem>
            <MenuItem value="price-low">Prix croissant</MenuItem>
            <MenuItem value="price-high">Prix décroissant</MenuItem>
            <MenuItem value="brand">Marque</MenuItem>
            <MenuItem value="category">Catégorie</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          startIcon={<Clear />}
          onClick={clearFilters}
          size="small"
        >
          Effacer
        </Button>
      </Box>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterList fontSize="small" />
            Filtres avancés
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography variant="body2" gutterBottom>
              Fourchette de prix: {priceRange[0]}€ - {priceRange[1]}€
            </Typography>
            <Slider
              value={priceRange}
              onChange={(_, newValue) => setPriceRange(newValue as number[])}
              valueLabelDisplay="auto"
              min={0}
              max={200}
              step={5}
              sx={{ width: 250 }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Boutique de Chaussures
      </Typography>
      
      <FilterSection />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="body1">
          {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {selectedCategory !== 'all' && (
            <Chip
              label={`Catégorie: ${selectedCategory === 'men' ? 'Hommes' : selectedCategory === 'women' ? 'Femmes' : 'Enfants'}`}
              onDelete={() => setSelectedCategory('all')}
              color="primary"
              size="small"
            />
          )}
          {selectedBrand !== 'all' && (
            <Chip
              label={`Marque: ${selectedBrand}`}
              onDelete={() => setSelectedBrand('all')}
              color="primary"
              size="small"
            />
          )}
          {searchTerm && (
            <Chip
              label={`"${searchTerm}"`}
              onDelete={() => setSearchTerm('')}
              color="primary"
              size="small"
            />
          )}
        </Box>
      </Box>

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h6" color="text.secondary">
            Aucun produit trouvé
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Essayez de modifier vos critères de recherche
          </Typography>
        </Box>
      )}
    </Container>
  );
}