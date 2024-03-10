import { PayloadAction, SliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";


interface IAppState {
 roles: Array<Role>,
}

const initState: IAppState = {
 roles: []
}

interface IAppReducers extends SliceCaseReducers<IAppState> {
 setRoles: (state: IAppState, action: PayloadAction<Array<Role>>) => void;
}

export const appSlice = createSlice<IAppState, IAppReducers, 'app'>({
 name: 'app',
 initialState: initState,
 reducers: {
  setRoles: (state, action: PayloadAction<Array<Role>>) => {
   state.roles = action.payload;
  }
 }
});

export const {setRoles} = appSlice.actions;
export default appSlice.reducer;

export const selectedRoles = () => appSlice.getInitialState().roles;