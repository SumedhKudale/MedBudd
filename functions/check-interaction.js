const fetch = require('node-fetch'); // If not already imported

exports.handler = async function(event, context) {
  try {
    const requestBody = JSON.parse(event.body);
    const { drug1, drug2 } = requestBody;

    console.log('Request received with drug1:', drug1, 'drug2:', drug2);

    const apiUrl = `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${drug1}+${drug2}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch drug interaction data');
    }

    const interactionData = await response.json();

    console.log('Interaction data:', interactionData);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Drug interaction data received', data: interactionData }),
    };
  } catch (error) {
    console.error('Error occurred:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while checking drug interactions' }),
    };
  }
};
