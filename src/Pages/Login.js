import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

import './Login.scss'
import storage from './../util/util.local-storage'

const GOOGLE_API_HOST = 'https://www.googleapis.com/oauth2/v1/userinfo'
const PARTICLES_COUNT = 100

/**
 * Creates a new user record in the database.
 * @param {Object} userData JSON object cotaining user ID and email.
 */
const createNewUser = async (userData) => {
  axios
    .post(`${process.env.REACT_APP_BACKEND_API}/user/`, userData)
    .then(() => {
      return new Promise((resolve) => resolve())
    })
}

/**
 * Creates the particles effect on the login page.
 * @param {Array} particles blank array that the particle elements will be pushed to
 * @return {Array} of particle elements that will be animated on screen.
 */
const createParticles = (particlesList) => {
  for (let i = 0; i < PARTICLES_COUNT; i++) {
    particlesList.push(
      <div key={i} className="circle-container">
        <div className="circle"></div>
      </div>
    )
  }

  return particlesList
}

/**
 * Gets the user's Google information using the userinfo Google API.
 * @param {String} accessToken access token to use with the Google API
 * @returns {Object} JSON object containing the user's Google information
 */
const getGoogleUser = async (accessToken) => {
  const user = await axios.get(
    `${GOOGLE_API_HOST}?alt=json&access_token=${accessToken}`
  )
  return user.data
}

const Login = () => {
  const navigate = useNavigate()
  const particles = createParticles([])
  document.querySelector('body').classList.add('login')

  const onLoginClicked = useGoogleLogin({
    onSuccess: async (response) => {
      const user = await getGoogleUser(response.access_token)
      const { id, email } = user
      storage.storeUserID(id)

      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/user/${id}`
      )

      if (!data.success) {
        await createNewUser({ id, email })
        navigate('/link-steam')
      } else if (!data.message.steam_id && !data.message.name) {
        navigate('/link-steam')
      } else {
        navigate('/dashboard')
      }
    },
    onError: (res) => {
      console.log(res)
    },
  })

  return (
    <section className="flex h-screen">
      <div className="m-auto text-center px-[20px]">
        <h1 className="font-bold text-white text-8xl pb-[25px]">Next Game</h1>
        <button
          className="btn-google-sso text-center"
          onClick={() => onLoginClicked()}
        >
          Sign in with Google
        </button>

        <div className="m-auto pt-[50px] sm:w-[80%] md:w-[550px]">
          Keep track of what Steam games you completed in your Steam game
          library. And see how many hours you sinked into each game.
        </div>
      </div>

      {particles.map((particle) => particle)}
    </section>
  )
}

export default Login
