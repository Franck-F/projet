import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { ShopProvider } from './context/ShopContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ShopView from './components/Shop/ShopView';
import CartDrawer from './components/Cart/CartDrawer';
import AuthDialog from './components/Auth/AuthDialog';
import CookieConsent from './components/GDPR/CookieConsent';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      dark: '#115293'
    },
    secondary: {
      main: '#ff6f00'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            transform: 'translateY(-2px)'
          },
          transition: 'all 0.3s ease'
        }
      }
    }
  }
});

function App() {
  const [currentView, setCurrentView] = useState('shop');
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ShopProvider>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header
              onCartOpen={() => setCartOpen(true)}
              onAuthOpen={() => setAuthOpen(true)}
              currentView={currentView}
              onViewChange={setCurrentView}
            />
            
            <Box component="main" sx={{ flexGrow: 1, mt: 8 }}>
              {currentView === 'shop' && <ShopView />}
            </Box>
            
            <Footer />
            
            <CartDrawer
              open={cartOpen}
              onClose={() => setCartOpen(false)}
              onCheckout={() => {
                console.log('Checkout process');
              }}
            />
            
            <AuthDialog
              open={authOpen}
              onClose={() => setAuthOpen(false)}
            />
            
            <CookieConsent />
          </Box>
        </ShopProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;