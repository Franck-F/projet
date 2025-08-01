import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const N8N_WEBHOOK_URL = 'https://n8n.srv856869.hstgr.cloud/webhook/4091fa09-fb9a-4039-9411-7104d213f601/chat';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Seuls les requêtes POST sont autorisées
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
      headers: { 'Allow': 'POST' }
    };
  }

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Transférez d'autres en-têtes si nécessaire, par exemple pour l'authentification
      },
      body: event.body
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    console.error('Error proxying to n8n:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch from n8n' })
    };
  }
};

export { handler };
