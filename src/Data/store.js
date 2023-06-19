import { configureStore } from '@reduxjs/toolkit'
import userGamesReducer from './user-games'

export default configureStore({
  reducer: {
    userGames: userGamesReducer,
  },
})
