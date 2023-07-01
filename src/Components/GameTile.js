import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useDispatch } from 'react-redux'

import { setGameComplete, setGameIncomplete } from '../Data/user-games'
import './GameTile.scss'

const STEAM_IMAGE_HOST_URL = 'https://cdn.akamai.steamstatic.com/steam/apps'

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
      className={`${
        completed ? 'completed border-[#5EB95E]' : 'border-[#999]'
      } game-tile relative border-solid rounded-md border-4 ease duration-300`}
    >
      <div>
        <LazyLoadImage
          src={`${STEAM_IMAGE_HOST_URL}/${appid}/header.jpg`}
          alt={name}
          className="w-full h-auto bg-[#171a21]"
        />
      </div>

      <div className="p-[15px]">
        <h2
          className={`font-bold text-xl ${
            completed ? 'text-[#5EB95E]' : 'text-[#D1D5D9]'
          }`}
        >
          {name}
        </h2>
        <p>
          <strong>Total Playtime</strong>: {(playtime / 60).toFixed(1)} hours
        </p>

        <fieldset className="pt-[15px]">
          <input
            type="checkbox"
            id={appid}
            name={appid}
            onChange={onCompletionChange}
          />
          &nbsp;
          <label
            className={`${completed ? 'text-[#5EB95E]' : 'text-[#D1D5D9]'}`}
            htmlFor={appid}
          >
            Completed
          </label>
        </fieldset>
      </div>
    </div>
  )
}

export default GameTile
