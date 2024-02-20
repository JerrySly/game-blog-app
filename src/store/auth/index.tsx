import {SliceCaseReducers, createSlice} from '@reduxjs/toolkit'

interface AuthState {
  token: String | null,
  roleId: String | null,
  nickname: String | null,
  userUuid: String | null,
  updateToken: String | null,
}

interface AuthReducer extends SliceCaseReducers<AuthState> {
  setToken: (state: AuthState, action: {payload: any, type:string})=>void,
  setUserInfo: (state: AuthState, action: {payload: {
    token: string | null,
  }, type: string}) => void
  setUpdateToken: (state: AuthState, action: {payload: any, type:string})=>void,
}

const parseJWT = (token: string) => {
  let info = token.split('.')[1];
  info = info.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(info));
}

export const authSlice = createSlice<AuthState,AuthReducer, "auth">({
  name: 'auth',
  initialState: {
    token: null,
    roleId: null,
    nickname: null,
    userUuid: null,
    updateToken: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUpdateToken: (state, action) => {
      state.updateToken = action.payload
    },
    setUserInfo: (state, action) => {
      if(action.payload.token) {
        const info = parseJWT(action.payload.token);
        state.roleId = info._role;
        state.nickname = info._nickname;
        state.userUuid = info._uuid;
      }
    }
  }
});

export const {setToken, setUpdateToken, setUserInfo} = authSlice.actions;
export default authSlice.reducer;