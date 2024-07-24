import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { getToken, setToken as _setToken  } from "@/utils";

const userStore = createSlice({
  name:"user",
  initialState:{
    token: getToken() || '',
    userInfo:{}
  },
  reducers:{
    setToken(state,action){
      state.token = action.payload
      // localstorage
      _setToken(action.payload)
    },
    setUserInfo(state,action){
      state.userInfo = action.payload
    }
  }
})

const { setToken, setUserInfo } = userStore.actions 

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post('/authorizations', loginForm)
    dispatch(setToken(res.data.token))
  }
}
// 获取个人信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await request.get('/user/profile')
    dispatch(setUserInfo(res.data))
  }
}
const userReducer = userStore.reducer

export { fetchLogin, fetchUserInfo, setToken,setUserInfo } 
export default userReducer