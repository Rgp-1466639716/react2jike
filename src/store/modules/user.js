import { removeToken } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { getToken, setToken as _setToken  } from "@/utils";
import { loginAPI, getProfileAPI } from '@/apis/index'

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
    },
    clearUserInfo(state){
      state.token =''
      state.userInfo = {}
      removeToken()
    }
  }
})

const { setToken, setUserInfo, clearUserInfo } = userStore.actions 

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await loginAPI(loginForm)
    dispatch(setToken(res.data.token))
  }
}
// 获取个人信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await getProfileAPI()
    dispatch(setUserInfo(res.data))
  }
}
const userReducer = userStore.reducer

export { fetchLogin, fetchUserInfo, clearUserInfo } 
export default userReducer