import axios from 'axios'
import { useState, useEffect } from 'react'

import Game from '../Components/Game'

const Dashboard = () => {
  const [userGames, setUserGames] = useState([])

  useEffect(() => {
    const userID = getUserID()

    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/user/${userID}`)
      .then((response) => {
        if (response.data.length === 0) {
          return
        }

        return axios.get(
          `${process.env.REACT_APP_BACKEND_API}/user/games/${response.data[0].steam_id}`
        )
      })
      .then((response) => {
        setUserGames(response.data.response.games)
      })
  }, [])

  return (
    <div className="grid grid-cols-3 gap-4">
      {userGames.map((game) => (
        <Game
          key={game.appid}
          appid={game.appid}
          name={game.name}
          playtime={game.playtime_forever}
        ></Game>
      ))}
    </div>
  )
}

const getUserID = () => {
  return JSON.parse(localStorage.getItem('google-account')).id
}

export default Dashboard
