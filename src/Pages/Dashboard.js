import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setUserGameList, setUserSteamID } from '../Data/user-games'
import storage from '../util/util.local-storage'
import Header from '../Components/Header'
import GameTile from '../Components/GameTile'
import NoLogin from '../Components/NoLogin'
import LoginError from '../Components/LoginError'

import USER_ERROR_STATE_ENUM from '../util/util.user-state'

const Dashboard = () => {
  const dispatch = useDispatch()
  const [userState, setUserState] = useState('')
  const { userGames } = useSelector((state) => state.userGames)
  document.body.classList.remove('login')

  useEffect(() => {
    const userID = storage.getUserID()

    // User not signed in.
    if (!userID) {
      setUserState(USER_ERROR_STATE_ENUM.USER_NOT_SIGNED_IN)
      return
    }

    // Get active user.
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/user/${userID}`)
      .then(({ data }) => {
        if (!data.success) {
          return new Promise((resolve, reject) => {
            reject({ error: USER_ERROR_STATE_ENUM.USER_NOT_FOUND })
          })
        } else if (!data.message.steam_id) {
          return new Promise((resolve, reject) => {
            reject({ error: USER_ERROR_STATE_ENUM.USER_NOT_FOUND })
          })
        } else {
          const steamID = data.message.steam_id

          // Update store.
          dispatch(setUserSteamID(steamID))

          // Get the list of games the user has in their steam account.
          return axios.get(
            `${process.env.REACT_APP_BACKEND_API}/user/games/${steamID}`
          )
        }
      })
      .then(({ data }) => {
        // Update store.
        dispatch(setUserGameList(data.message.games))
      })
      .catch(({ error }) => {
        setUserState(error)
      })
  }, [])

  switch (userState) {
    case USER_ERROR_STATE_ENUM.USER_NOT_SIGNED_IN:
      return <NoLogin />
    case USER_ERROR_STATE_ENUM.USER_NOT_FOUND:
      return <LoginError />
    default:
      return (
        <>
          <Header />

          <section className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-4 p-[20px] pt-[100px]">
            {userGames.map((game) => (
              <GameTile
                key={game.appid}
                appid={game.appid}
                name={game.name}
                playtime={game.playtime_forever}
                completed={game.completed}
              />
            ))}
          </section>
        </>
      )
  }
}

export default Dashboard
