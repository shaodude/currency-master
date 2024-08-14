import axios from 'axios'; // Correct import for Axios

const baseURL = "https://open.er-api.com/v6/latest";

async function getCurrencyData(currencyCode) {
  try {
    const response = await axios.get(baseURL + '/' + currencyCode);
    console.log("fetch currency data: " + response.data.result)
    return response.data;
  } catch (error) {
    console.error(error);
    return "error"
  }
}

export default getCurrencyData;