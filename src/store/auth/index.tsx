import {SliceCaseReducers, createSlice} from '@reduxjs/toolkit'

interface AuthState {
  userIsAuth: boolean
}

interface AuthReducer extends SliceCaseReducers<AuthState> {
  setUserIsAuth: (state: AuthState, action: {payload: any, type:string})=>void
}


export const authSlice = createSlice<AuthState,AuthReducer, "auth">({
  name: 'auth',
  initialState: {
    userIsAuth: true,
  },
  reducers: {
    setUserIsAuth: (state, action) => {
      state.userIsAuth = action.payload
    }
  }
});

export const {setUserIsAuth} = authSlice.actions;
export default authSlice.reducer;