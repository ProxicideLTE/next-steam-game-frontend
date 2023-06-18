import React from 'react'
import { Link } from 'react-router-dom'

const ValidUser = () => {
  return (
    <section>
      <h1>Error: Steam Link Already Established</h1>
      <p>You have already linked your steam account.</p>
      <p>
        Go to the <Link to="/dashboard">dashboard</Link> page.
      </p>
    </section>
  )
}

export default ValidUser
