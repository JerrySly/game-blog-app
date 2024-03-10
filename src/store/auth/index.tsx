import {PayloadAction, SliceCaseReducers, createSlice} from '@reduxjs/toolkit'
import * as jwt from 'jwt-decode';

interface AuthState {
  token: String | null,
  userInfo: UserInfo | null,
  refreshToken: String | null,
  prevAuthRoute: String | null,
}

type UserInfo = {
  nickname: string,
  uuid: string,
  role: string,
}

interface AuthReducer extends SliceCaseReducers<AuthState> {
  setToken: (state: AuthState, action: {payload: any, type:string})=>void,
  setUserInfo: (state: AuthState, action: {payload: {
    nickname: string,
    uuid: string,
    role: string,
  }, type: string}) => void
  setRefreshToken: (state: AuthState, action: {payload: any, type:string})=>void,
  setInfoFromToken: (state: AuthState, action: PayloadAction<string | null | undefined>)=>void,
}

const parseJWT = (token: string) => {
  let info = token.split('.')[1];
  info = info.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(info));
}

export const authSlice = createSlice<AuthState, AuthReducer, "auth">({
  name: 'auth',
  initialState: {
    token: null,
    userInfo: null,
    refreshToken: null,
    prevAuthRoute: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload
    },
    setUserInfo: (state, action) => {
      if(action.payload) {
        state.userInfo 
        = {
          ...action.payload,
        }
      }
    },
    setPrevAuthRoute: (state, action) => {
      state.prevAuthRoute = action.payload;
    },
    setInfoFromToken: (state, action: PayloadAction<string | null | undefined>) => {
      const token = action.payload;
      if (token) {
        state.token = token;
        const info = jwt.jwtDecode(token)  as {
          _name: string,
          _role: string,
          _uuid: string,
        };
        state.userInfo = {
          nickname: info._name,
          role: info._role,
          uuid: info._uuid,
        }
      }
    }
  }
});

export const {setToken, setRefreshToken, setUserInfo, setPrevAuthRoute, setInfoFromToken} = authSlice.actions;
export default authSlice.reducer;