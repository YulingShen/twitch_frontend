const SERVER_ORIGIN = 'https://1wqylleoj0.execute-api.us-east-1.amazonaws.com';

const loginUrl = `${SERVER_ORIGIN}/login`;

export const login = (credential) => {
  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    credentials: 'include',
    body: JSON.stringify(credential)
  }).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to log in');
    }

    return response.json();
  })
}

const registerUrl = `${SERVER_ORIGIN}/register`;

export const register = (data) => {
  return fetch(registerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: JSON.stringify(data)
  }).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to register');
    }
  })
}

const logoutUrl = `${SERVER_ORIGIN}/logout`;

export const logout = () => {
  // return fetch(logoutUrl, {
  //   method: 'POST',
  //   credentials: 'include',
  // }).then((response) => {
  //   if (response.status !== 200) {
  //     throw Error('Fail to log out');
  //   }
  // })
}

const topGamesUrl = `${SERVER_ORIGIN}/game`;

export const getTopGames = () => {
  return fetch(topGamesUrl).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to get top games');
    }

    return response.json();
  })
}

const getGameDetailsUrl = `${SERVER_ORIGIN}/game?game_name=`;

const getGameDetails = (gameName) => {
  return fetch(`${getGameDetailsUrl}${gameName}`).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to find the game');
    }

    return response.json();
  });
}

const searchGameByIdUrl = `${SERVER_ORIGIN}/search?game_id=`;

export const searchGameById = (gameId) => {
  return fetch(`${searchGameByIdUrl}${gameId}`).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to find the game');
    }
    return response.json();
  })
}

export const searchGameByName = (gameName) => {
  return getGameDetails(gameName).then((data) => {
    if (data && data.id) {
      return searchGameById(data.id);
    }

    throw Error('Fail to find the game')
  })
}

const favoriteItemUrl = `${SERVER_ORIGIN}/favorite`;
const getFavoriteItemUrl = `${SERVER_ORIGIN}/favorite?user_id=`;
const deleteFavoriteItemUrl = `${SERVER_ORIGIN}/delete_favorite`;

export const addFavoriteItem = (favItem, userId) => {
  return fetch(favoriteItemUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    credentials: 'include',
    body: JSON.stringify({ favorite: favItem, user_id: userId })
  }).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to add favorite item');
    }
  })
}

export const deleteFavoriteItem = (favItem, userId) => {
  return fetch(deleteFavoriteItemUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    credentials: 'include',
    body: JSON.stringify({ favorite: favItem, user_id: userId })
  }).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to delete favorite item');
    }
  })
}

export const getFavoriteItem = (userId) => {
  return fetch(`${getFavoriteItemUrl}${userId}`, {
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to get favorite item');
    }

    return response.json();
  })
}

const getRecommendedItemsUrl = `${SERVER_ORIGIN}/recommendation?user_id=`;
const getRecommendedItemsUrlNoUser = `${SERVER_ORIGIN}/recommendation`;


export const getRecommendations = (userId, loggedIn) => {
  if (loggedIn){
    return fetch(`${getRecommendedItemsUrl}${userId}`, {
      credentials: 'include',
    }).then((response) => {
      if (response.status !== 200) {
        throw Error('Fail to get recommended item');
      }

      return response.json();
    })
  }
  return fetch(getRecommendedItemsUrlNoUser, {
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to get recommended item');
    }

    return response.json();
  })
}
