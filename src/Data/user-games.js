import { createSlice } from '@reduxjs/toolkit'

export const userGamesSlice = createSlice({
  name: 'UserGames',
  initialState: {
    userGames: [],
  },
  reducers: {
    setUserGameList: (state, action) => {
      state.userGames = action.payload
    },
    setGameComplete: (state, action) => {
      state.userGames.map((game) => {
        if (game.appid === action.payload) {
          game.completed = true
        }
      })
    },
    setGameIncomplete: (state, action) => {
      state.userGames.map((game) => {
        if (game.appid === action.payload) {
          game.completed = false
        }
      })
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserGameList, setGameComplete, setGameIncomplete } =
  userGamesSlice.actions

export default userGamesSlice.reducer
