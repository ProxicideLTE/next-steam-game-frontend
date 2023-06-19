import React from 'react'

const Game = ({ appid, name, playtime }) => {
  return (
    <div
      className={`ease duration-200 p-[10px] border-[#D1D5D9] border-solid rounded-md border-2 hover:border-[#67c1f5]`}
    >
      <h2 className="font-bold text-md">{name}</h2>
      <p>Total Playtime: {(playtime / 60).toFixed(1)} hours</p>
      <input type="checkbox" id={appid} name={appid} />
      &nbsp;
      <label htmlFor={appid}>Completed</label>
    </div>
  )
}

export default Game
