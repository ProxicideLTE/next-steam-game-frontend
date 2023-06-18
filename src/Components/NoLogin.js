import React from 'react'
import { Link } from 'react-router-dom'

const NoLogin = () => {
  return (
    <section>
      <h1>Error: Not signed in</h1>
      <p>You need to sign-in to use this feature of the application.</p>
      <p>
        Back to <Link to="/">login</Link> page.
      </p>
    </section>
  )
}

export default NoLogin
