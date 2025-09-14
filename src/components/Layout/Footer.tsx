import React from 'react';
import { Box, Container, Typography, Grid, Link, Divider } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.dark',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              ShoeShop Pro
            </Typography>
            <Typography variant="body2">
              Votre boutique de chaussures en ligne de confiance. 
              Plus de 100 références pour toute la famille.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Navigation
            </Typography>
            <Box>
              <Link href="#" color="inherit" variant="body2" display="block">
                Accueil
              </Link>
              <Link href="#" color="inherit" variant="body2" display="block">
                Hommes
              </Link>
              <Link href="#" color="inherit" variant="body2" display="block">
                Femmes
              </Link>
              <Link href="#" color="inherit" variant="body2" display="block">
                Enfants
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Service Client
            </Typography>
            <Box>
              <Link href="#" color="inherit" variant="body2" display="block">
                Contact
              </Link>
              <Link href="#" color="inherit" variant="body2" display="block">
                Livraison
              </Link>
              <Link href="#" color="inherit" variant="body2" display="block">
                Retours
              </Link>
              <Link href="#" color="inherit" variant="body2" display="block">
                FAQ
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Légal
            </Typography>
            <Box>
              <Link href="#" color="inherit" variant="body2" display="block">
                Mentions légales
              </Link>
              <Link href="#" color="inherit" variant="body2" display="block">
                CGV
              </Link>
              <Link href="#" color="inherit" variant="body2" display="block">
                Politique de confidentialité
              </Link>
              <Link href="#" color="inherit" variant="body2" display="block">
                Gestion des cookies
              </Link>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, backgroundColor: 'white', opacity: 0.2 }} />
        
        <Box textAlign="center">
          <Typography variant="body2">
            © {new Date().getFullYear()} ShoeShop Pro. Tous droits réservés.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}