import { useEffect, useState } from 'react'
import axios from 'axios'

import storage from '../util/util.local-storage'
import NoLogin from '../Components/NoLogin'
import LoginError from '../Components/LoginError'
import ValidUser from '../Components/ValidUser'

import USER_STATE_ENUM from '../util/util.user-state'

const LinkSteam = () => {
  const [userID, setUserID] = useState('')
  const [userState, setUserState] = useState('')

  document.body.classList.remove('login')

  useEffect(() => {
    const id = storage.getUserID()

    // User not signed in.
    if (!id) {
      setUserState(USER_STATE_ENUM.USER_NOT_SIGNED_IN)
      return
    }

    setUserID(id)

    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/user/${id}`)
      .then((response) => {
        // User not found.
        if (response.data.length === 0) {
          setUserState(USER_STATE_ENUM.USER_NOT_FOUND)
          return
        }

        // Valid user.
        const profile = response.data[0]
        if (profile.steam_id) setUserState(USER_STATE_ENUM.USER_VALID)
      })
  }, [])

  switch (userState) {
    case USER_STATE_ENUM.USER_NOT_SIGNED_IN:
      return <NoLogin />
    case USER_STATE_ENUM.USER_NOT_FOUND:
      return <LoginError />
    case USER_STATE_ENUM.USER_VALID:
      return <ValidUser />
    default:
      return (
        <section>
          <h1>Step 2: Link Steam Account</h1>
          <p>
            Now link your steam account in order to gather the list of games you
            own.
          </p>

          <a href={`${process.env.REACT_APP_BACKEND_API}/auth/steam/${userID}`}>
            Login with Steam
          </a>
        </section>
      )
  }
}

export default LinkSteam
