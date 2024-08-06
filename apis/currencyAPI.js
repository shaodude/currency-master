import axios from 'axios'; // Correct import for Axios

const baseURL = "https://open.er-api.com/v6/latest";

async function getCurrencyData(currencyCode) {
  try {
    const response = await axios.get(`${baseURL}/${currencyCode}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export default getCurrencyData;