import React from 'react'
import { googleLogout } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'

import storage from '../util/util.local-storage'

const Header = () => {
  const navigate = useNavigate()

  const onLogout = () => {
    googleLogout()
    storage.clearSession()
    navigate('/')
  }

  return (
    <header className="bg-[#171a21] p-[20px] fixed w-full">
      <nav>
        <button onClick={onLogout}>Logout</button>
      </nav>
    </header>
  )
}

export default Header
