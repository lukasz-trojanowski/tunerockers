export default function(state, action) {
  switch (action.type) {
    case 'START_SCRAPPER': {
      return {
        ...state,
        isParsing: true
      };
    }
    case 'STOP_SCRAPPER': {
      return {
        ...state,
        isParsing: false
      };
    }
    case 'SET_CURRENT_SONG': {
      return {
        ...state,
        currentSong: action.payload
      };
    }
    case 'SET_MUSIC_DATABASE': {
      return {
        ...state,
        database: action.payload
      };
    }
    case 'SET_LOBBY_DATABASE': {
      return {
        ...state,
        lobbyDatabase: action.payload.sort((a, b) => {
          const nameA = a.author.toUpperCase(); // ignore upper and lowercase
          const nameB = b.author.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        })
      };
    }
    case 'REMOVE_FROM_LOBBY': {
      return {
        ...state,
        lobbyDatabase: state.lobbyDatabase.filter(
          item => item._id !== action.payload
        )
      };
    }
    case 'GET_MUSIC': {
      return state;
    }
    default: {
      return state;
    }
  }
}
