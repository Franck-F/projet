# Projet d'Interface d'Automatisation JRBC

Bienvenue ! Ce projet sert d'interface pour que JRBC interagisse avec une automatisation n8n et des agents IA fonctionnant également sur n8n.

## Démarrage

> **Prérequis :**
> Les étapes suivantes nécessitent que [NodeJS](https://nodejs.org/en/) soit installé sur votre système. Veuillez donc
> l'installer au préalable si ce n'est pas déjà fait.

Pour démarrer avec votre projet, vous devrez d'abord installer les dépendances avec :
```
npm install
```

Ensuite, vous pourrez exécuter une version de développement du projet avec :
```
npm run dev
```

Après quelques secondes, votre projet devrait être accessible à l'adresse
[http://localhost:5173/](http://localhost:5173/)

## Configuration

### Variables d'environnement

L'application nécessite que les variables d'environnement suivantes soient définies :

-   `N8N_URL` : L'URL de l'instance n8n.
-   `AI_AGENT_API_KEY` : La clé API pour les agents IA.

Vous pouvez définir ces variables dans un fichier `.env` à la racine du projet :

```
N8N_URL=https://votre-instance-n8n.com
AI_AGENT_API_KEY=your_api_key_here
```

### Exécution en Production

Si vous êtes satisfait du résultat, vous pouvez enfin compiler le projet pour la publication avec :
```
npm run build
```
Cela créera un dossier `dist` contenant l'application prête pour la production. Vous pouvez ensuite déployer ce dossier sur un serveur web.

[![Netlify Status](https://api.netlify.com/api/v1/badges/b4923ec5-976a-4867-8302-7e965c20d1f6/deploy-status)](https://app.netlify.com/projects/jrbc-docs-assistant/deploys)
