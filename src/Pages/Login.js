import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

import './Login.scss'
import storage from './../util/util.local-storage'

const GOOGLE_API_HOST = 'https://www.googleapis.com/oauth2/v1/userinfo'
const PARTICLES_COUNT = 100

const Login = () => {
  const navigate = useNavigate()
  const particles = []

  document.querySelector('body').classList.add('login')

  for (let i = 0; i < PARTICLES_COUNT; i++) {
    particles.push(
      <div class="circle-container">
        <div class="circle"></div>
      </div>
    )
  }

  const onLoginClicked = useGoogleLogin({
    onSuccess: (response) => {
      let userID, userEmail

      axios
        .get(
          `${GOOGLE_API_HOST}?alt=json&access_token=${response.access_token}`
        )
        .then(({ data }) => {
          userID = data.id
          userEmail = data.email

          storage.storeUserID(userID)

          return axios.get(
            `${process.env.REACT_APP_BACKEND_API}/user/${userID}`
          )
        })
        .then(({ data }) => {
          if (data.length === 0) {
            createNewUser({
              id: userID,
              email: userEmail,
            })

            navigate('/link-steam')
          } else if (!data[0].steam_id && !data[0].name) {
            navigate('/link-steam')
          } else {
            navigate('/dashboard')
          }
        })
    },
    onError: (res) => {
      console.log(res)
    },
  })

  return (
    <section className="flex h-screen">
      <div class="m-auto text-center">
        <h1 className="text-white text-8xl pb-[25px]">Next Game</h1>
        <button
          className="btn-google-sso text-center"
          onClick={() => onLoginClicked()}
        >
          Sign in with Google
        </button>
      </div>

      {particles.map((particle) => particle)}
    </section>
  )
}

const createNewUser = async (userData) => {
  axios
    .post(`${process.env.REACT_APP_BACKEND_API}/user/`, userData)
    .then(() => {
      return new Promise((resolve) => resolve())
    })
}

export default Login
