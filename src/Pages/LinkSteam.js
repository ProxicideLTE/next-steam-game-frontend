import React from 'react'

const LinkSteam = () => {
  return (
    <div>
      <h1>Part 2: LINK your steam account!</h1>

      <a href={`${process.env.REACT_APP_BACKEND_API}/auth/steam`}>
        Login with Steam
      </a>
    </div>
  )
}

export default LinkSteam
