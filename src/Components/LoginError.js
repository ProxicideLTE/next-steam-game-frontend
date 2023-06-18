import React from 'react'
import { Link } from 'react-router-dom'

const LoginError = () => {
  return (
    <section>
      <h1>Error: Invalid user</h1>
      <p>Your account is invalid and not registered.</p>
      <p>
        Back to <Link to="/">login</Link> page.
      </p>
    </section>
  )
}

export default LoginError
