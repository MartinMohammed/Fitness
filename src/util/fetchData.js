export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
  },
};

export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_YOUTUBE_KEY,
    "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_YOUTUBE_HOST,
  },
};

// * All Util files should be created so that we can reuse it all over the application

const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json(); // extract the data
  if (
    data.message ===
    "You have exceeded the MONTHLY quota for Requests on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb"
  ) {
    return [];
  }
  return data;
};

export default fetchData;
