import mockData from "./mock-data";

/**
 *
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */

export const extractLocations = (events) => {
  const extractLocations = events.map((event) => event.location);
  const locations = [...new Set(extractLocations)];
  return locations;
};

/**
 *
 * This function will fetch the list of all events
 */

const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

export const getEvents = async () => {
  if (window.location.href.startsWith("http://localhost")) {
    return mockData;
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = `https://r0wsbu3wn2.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url/${token}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const result = await response.json();
    if (result) {
      return result.events;
    } else return null;
  }
};

const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    window.history.pushState("", "", url);
    return;
  }

  const url = `${window.location.protocol}//${window.location.host}`;
  window.history.pushState("", "", url);
};

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    `https://r0wsbu3wn2.execute-api.us-east-1.amazonaws.com/dev/api/token/${encodeCode}`,
    {
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  const { access_token } = await response.json();
  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const response = await fetch(
        "https://r0wsbu3wn2.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url",
        {
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};
