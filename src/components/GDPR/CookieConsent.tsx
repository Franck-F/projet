import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Collapse,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link
} from '@mui/material';
import { Settings } from '@mui/icons-material';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    setPreferences(newPreferences);
    localStorage.setItem('cookieConsent', JSON.stringify(newPreferences));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowBanner(false);
  };

  const acceptNecessaryOnly = () => {
    const newPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    setPreferences(newPreferences);
    localStorage.setItem('cookieConsent', JSON.stringify(newPreferences));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowBanner(false);
  };

  const savePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowBanner(false);
    setShowSettings(false);
  };

  if (!showBanner) return null;

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          p: 2
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 3,
            backgroundColor: 'rgba(33, 33, 33, 0.98)',
            color: 'white',
            borderRadius: '12px 12px 0 0'
          }}
        >
          <Typography variant="h6" gutterBottom>
            🍪 Gestion des cookies
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Nous utilisons des cookies pour améliorer votre expérience, analyser notre trafic et personnaliser le contenu. 
            Vous pouvez accepter tous les cookies ou personnaliser vos préférences.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={acceptAll}
              size="small"
            >
              Tout accepter
            </Button>
            <Button
              variant="outlined"
              sx={{ color: 'white', borderColor: 'white' }}
              onClick={acceptNecessaryOnly}
              size="small"
            >
              Nécessaires uniquement
            </Button>
            <Button
              variant="text"
              sx={{ color: 'white' }}
              startIcon={<Settings />}
              onClick={() => setShowSettings(true)}
              size="small"
            >
              Personnaliser
            </Button>
            <Link
              component="button"
              variant="body2"
              onClick={() => setShowPolicy(true)}
              sx={{ color: 'lightblue', ml: 2 }}
            >
              Politique de confidentialité
            </Link>
          </Box>
        </Paper>
      </Box>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onClose={() => setShowSettings(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Préférences des cookies</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Choisissez les types de cookies que vous souhaitez autoriser. Vous pouvez modifier ces paramètres à tout moment.
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={preferences.necessary} disabled />}
              label="Cookies nécessaires"
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
              Essentiels au fonctionnement du site. Ils ne peuvent pas être désactivés.
            </Typography>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                />
              }
              label="Cookies d'analyse"
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
              Nous aident à comprendre comment vous utilisez notre site pour l'améliorer.
            </Typography>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                />
              }
              label="Cookies marketing"
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
              Utilisés pour vous proposer des publicités personnalisées.
            </Typography>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={preferences.functional}
                  onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                />
              }
              label="Cookies fonctionnels"
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
              Améliorent les fonctionnalités et la personnalisation du site.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSettings(false)}>Annuler</Button>
          <Button variant="contained" onClick={savePreferences}>
            Enregistrer les préférences
          </Button>
        </DialogActions>
      </Dialog>

      {/* Privacy Policy Dialog */}
      <Dialog open={showPolicy} onClose={() => setShowPolicy(false)} maxWidth="md" fullWidth>
        <DialogTitle>Politique de confidentialité</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>1. Collecte des données</Typography>
          <Typography variant="body2" paragraph>
            ShoeShop Pro collecte uniquement les données nécessaires au fonctionnement du service :
            nom, prénom, adresse email, adresse de livraison et données de navigation.
          </Typography>
          
          <Typography variant="h6" gutterBottom>2. Utilisation des données</Typography>
          <Typography variant="body2" paragraph>
            Vos données sont utilisées pour traiter vos commandes, améliorer notre service
            et vous contacter concernant vos achats. Elles ne sont jamais vendues à des tiers.
          </Typography>
          
          <Typography variant="h6" gutterBottom>3. Stockage et sécurité</Typography>
          <Typography variant="body2" paragraph>
            Toutes les données sont stockées de manière sécurisée et chiffrées.
            Nous respectons les normes RGPD et vous pouvez exercer vos droits à tout moment.
          </Typography>
          
          <Typography variant="h6" gutterBottom>4. Vos droits</Typography>
          <Typography variant="body2" paragraph>
            Vous avez le droit d'accéder, modifier ou supprimer vos données personnelles.
            Contactez-nous à privacy@shoeshop.com pour exercer ces droits.
          </Typography>
          
          <Typography variant="h6" gutterBottom>5. Cookies</Typography>
          <Typography variant="body2" paragraph>
            Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez gérer
            vos préférences via notre bandeau de consentement.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPolicy(false)} variant="contained">
            Compris
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}