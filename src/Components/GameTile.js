import React from 'react'
import { useDispatch } from 'react-redux'

import { setGameComplete, setGameIncomplete } from '../Data/user-games'

const GameTile = ({ appid, name, playtime, completed }) => {
  const dispatch = useDispatch()

  const onCompletionChange = (event) => {
    if (event.target.checked) {
      dispatch(setGameComplete(appid))
    } else {
      dispatch(setGameIncomplete(appid))
    }
  }

  return (
    <div
      className={`ease duration-200 p-[10px] border-[#D1D5D9] border-solid rounded-md border-2 hover:border-[#67c1f5]`}
    >
      <h2 className="font-bold text-md">{name}</h2>
      <p>Total Playtime: {(playtime / 60).toFixed(1)} hours</p>
      <input
        type="checkbox"
        id={appid}
        name={appid}
        onChange={onCompletionChange}
      />
      &nbsp;
      <label htmlFor={appid}>Completed</label>
    </div>
  )
}

export default GameTile
