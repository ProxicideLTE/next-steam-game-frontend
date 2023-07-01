import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import utilLocalStorage from '../util/util.local-storage'

export const userGamesSlice = createSlice({
  name: 'UserGames',
  initialState: {
    steamUserID: '',
    userGames: [],
  },
  reducers: {
    setUserSteamID: (state, action) => {
      state.steamUserID = action.payload
    },
    setUserGameList: (state, action) => {
      state.userGames = action.payload
    },
    setGameComplete: (state, action) => {
      // Record game in database.
      axios.post(`${process.env.REACT_APP_BACKEND_API}/user/games/completed`, {
        userID: utilLocalStorage.getUserID(),
        appUserID: state.steamUserID,
        gameAppID: action.payload,
      })

      // Update state.
      state.userGames.map((game) => {
        if (game.appid === action.payload) {
          game.completed = true
        }
      })
    },
    setGameIncomplete: (state, action) => {
      // Remove completed game in database.
      axios.delete(
        `${process.env.REACT_APP_BACKEND_API}/user/games/completed`,
        {
          data: {
            userID: utilLocalStorage.getUserID(),
            appUserID: state.steamUserID,
            gameAppID: action.payload,
          },
        }
      )

      // Update state.
      state.userGames.map((game) => {
        if (game.appid === action.payload) {
          game.completed = false
        }
      })
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setUserGameList,
  setGameComplete,
  setGameIncomplete,
  setUserSteamID,
} = userGamesSlice.actions

export default userGamesSlice.reducer
