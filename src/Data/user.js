import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'counter',
  initialState: {
    id: 0,
    email: '',
    name: '',
  },
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id
      state.email = action.payload.email
      state.name = action.payload.given_name
    },
  },
})

// Action creators are generated for each case reducer function
export const { login } = userSlice.actions

export default userSlice.reducer
