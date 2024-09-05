import axios from "axios";

const baseURL = "https://open.er-api.com/v6/latest";

async function getCurrencyData(currencyCode) {
  try {
    const response = await axios.get(baseURL + "/" + currencyCode);
    console.log("fetch currency data: " + response.data.result);
    // eol default value is 0, if API is deprecated, eol field will be updated
    if (response.data.time_eol_unix !== 0) {
      console.warn(
        "API has an expected deprecation date: " + response.data.time_eol_unix
      );
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return "error";
  }
}

export default getCurrencyData;
