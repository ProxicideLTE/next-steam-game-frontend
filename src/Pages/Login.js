import axios from 'axios'
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from './../Data/user'

const GOOGLE_API_HOST = 'https://www.googleapis.com/oauth2/v1/userinfo'

const createNewUser = async (userData) => {
  axios
    .post(`${process.env.REACT_APP_BACKEND_API}/user/`, userData)
    .then((response) => {
      return new Promise((resolve) => resolve())
    })
}

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLoginClicked = useGoogleLogin({
    onSuccess: (response) => {
      let userID, userEmail

      axios
        .get(
          `${GOOGLE_API_HOST}?alt=json&access_token=${response.access_token}`
        )
        .then(({ data }) => {
          console.log(data)
          dispatch(login(data))
          userID = data.id
          userEmail = data.email

          localStorage.setItem(
            'google-account',
            JSON.stringify({
              id: userID,
              email: userEmail,
            })
          )

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
          } else if (!data.steam_id && !data.name) {
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
    <div>
      <button onClick={() => onLoginClicked()}>Login with Google</button>
    </div>
  )
}

export default Login
