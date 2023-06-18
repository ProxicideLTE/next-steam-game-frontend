import React from 'react'

const Game = ({ appid, name, playtime }) => {
  return (
    <div className={`ease p-[10px] border-solid rounded-md border-2`}>
      <h2 className="font-bold">{name}</h2>
      <p>Total Playtime: {(playtime / 60).toFixed(1)} hours</p>
      <input type="checkbox" id={appid} name={appid} />
      &nbsp;
      <label htmlFor={appid}>Complete</label>
    </div>
  )
}

export default Game
