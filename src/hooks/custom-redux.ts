import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { RootDispatch, RootState } from "../store";

type DispatchFunc = () => RootDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 