import { useState, useEffect } from "react";

const Dashboard = () => {
  const [userGames, setUserGames] = useState([]);

  useEffect(() => {
    // const userID = new URLSearchParams(window.location.search).get('userID')
    // fetch(`http://localhost:3001/user/${userID}`)
    // .then(response => {
    //   return response.json()
    // })
    // .then(response => {
    //   return fetch(`http://localhost:3001/user/games/${userID}`)
    //   // if (response[0].id != userID) {
    //   // }
    // })
    // .then(response => {
    //   return response.json()
    // })
    // .then(response => {
    //   setUserGames(response.games)
    // })
    // if (!userID) {
    //   setUserGames([])
    //   return;
    // }
    // fetch(`http://localhost:3001/user/games/${userID}`)
    // .then(response => {
    //   return response.json()
    // })
    // .then(response => {
    //   setUserGames(response.games)
    // })
  }, []);

  const onBeatedClicked = async (event, gameID) => {
    let gamesCopy = [...userGames];

    const game = gamesCopy.filter((game) => game.appid === gameID);
    game[0].completed = event.target.checked;

    setUserGames(gamesCopy);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {userGames.map((game) => (
        <div
          className={`ease p-[10px] border-solid rounded-md border-2 ${
            game.completed ? "border-green-400" : "border-black"
          }`}
          key={game.appid}
        >
          <h2 className="font-bold">{game.name}</h2>
          <p>Total Playtime: {(game.playtime_forever / 60).toFixed(1)} hours</p>
          <input
            type="checkbox"
            id={game.appid}
            name={game.appid}
            onChange={(event) => onBeatedClicked(event, game.appid)}
          />
          &nbsp;
          <label htmlFor={game.appid}>Complete</label>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
