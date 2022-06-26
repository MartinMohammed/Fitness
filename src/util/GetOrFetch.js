// A function that should look in the localstorage for a specific item
// if its available return it as js object from localStorage
// else use the callback to fetch from the api and save the returned data in the lS

const GetOrFetch = async (itemName, fetchAPI) => {
  const check = localStorage.getItem(itemName);
  if (check) {
    // Available
    console.log("fetch from localstorage");
    return JSON.parse(check);
  } else {
    // no data in the localstorage under this name
    const data = await fetchAPI();
    console.log("fetch from api");
    localStorage.setItem(itemName, JSON.stringify(data));
    return data;
  }
};

export default GetOrFetch;
