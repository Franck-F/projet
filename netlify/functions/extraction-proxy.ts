import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

// URL cible : uniquement le webhook pour l'extraction de données
const EXTRACTION_WEBHOOK_URL = 'https://n8n.srv856869.hstgr.cloud/webhook/c9b3deb8-2d60-40c3-9eb6-624961acde5e';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // On ne fait suivre que les requêtes POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
      headers: { 'Allow': 'POST' }
    };
  }

  try {
    // On fait suivre la requête à l'URL du webhook d'extraction
    const response = await fetch(EXTRACTION_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        // n8n attend du multipart/form-data pour les fichiers
        // On laisse le navigateur et fetch déterminer le Content-Type exact avec la boundary
      },
      body: event.body
    });

    const data = await response.json();

    // On renvoie la réponse de n8n au client
    return {
      statusCode: response.status,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    console.error('Erreur dans le proxy vers n8n:', error);
    return {
      statusCode: 502, // Bad Gateway
      body: JSON.stringify({ error: 'Erreur lors de la communication avec le service n8n.' })
    };
  }
};

export { handler };
