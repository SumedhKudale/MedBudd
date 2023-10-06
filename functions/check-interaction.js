// Import the 'node-fetch' library to make HTTP requests
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    // Parse the incoming JSON data from the request body
    const requestBody = JSON.parse(event.body);
    const { drug1, drug2 } = requestBody;

    // Make an API request to the Drug Interaction API
    const apiUrl = `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${drug1}+${drug2}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch drug interaction data');
    }

    const interactionData = await response.json();

    // Prepare the response to send back to the client
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Drug interaction data received', data: interactionData }),
    };
  } catch (error) {
    // Handle any errors that occur during the process
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while checking drug interactions' }),
    };
  }
};
