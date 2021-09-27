let petToken;
let expires;

// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch("/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

// save book data for a logged in user
export const savePet = (petData, token) => {
  return fetch("/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(petData),
  });
};

// remove saved book data for a logged in user
export const deletePet = (petId, token) => {
  return fetch(`/api/users/pets/${petId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

const getAuth = function () {
  console.log("Inside getAuth");
  return fetch("https://api.petfinder.com/v2/oauth2/token", {
    method: "POST",
    body: "grant_type=client_credentials&client_id=fDLyZMIt3QxNOiFOmsmbBmyj25vnJh6zT0D2cCELxUNVO6yzIE&client_secret=qomZFgNLnDj5L8Hqllp13zRAjSjSbRAEwEUqamHm",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      petToken = data.access_token;
      expires = new Date().getTime() + data.expires_in * 1000;
      return petToken;
    })
    .catch((error) => {
      console.log("No bueno", error);
    });
};

// make a search to petfinder api
export const findPetSearch = async (query) => {
  if (!petToken) {
    petToken = await getAuth();
  }
  console.log("petToken After oAuth", petToken);
  if (expires - new Date().getTime() < 0) getAuth();
  return fetch(`https://api.petfinder.com/v2/animals?type=${query}&page=2`, {
    headers: {
      authorization: `Bearer ` + petToken,
    },
  });
};
