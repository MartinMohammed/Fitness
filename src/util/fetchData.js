export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
  },
};

// * All Util files should be created so that we can reuse it all over the application

const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json(); // extract the data

  return data;
};

export default fetchData;
