import React from 'react'
import { useSelector } from 'react-redux'

const LinkSteam = () => {
  const { id } = useSelector((state) => state.user)

  return (
    <div>
      <h1>Step 2: Link Steam Account</h1>
      <p>
        Now link your steam account in order to gather the list of games you
        own.
      </p>

      <a href={`${process.env.REACT_APP_BACKEND_API}/auth/steam/${id}`}>
        Login with Steam
      </a>
    </div>
  )
}

export default LinkSteam
