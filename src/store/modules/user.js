import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
  name:"user",
  initialState:{
    token:''
  },
  reducers:{
    setToken(state,action){
      state.token = action.payload
    }
  }
})

const { setToken } = userStore.actions 

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post('/authorizations', loginForm)
    dispatch(setToken(res.data.token))
  }
}
const userReducer = userStore.reducer

export { fetchLogin, setToken } 
export default userReducer