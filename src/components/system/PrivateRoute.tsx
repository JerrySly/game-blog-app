import { useAppSelector } from "../../hooks/custom-redux"
import { Navigate, Outlet, useNavigate, useNavigation } from "react-router";

export type PrivateRouteProps = {
 needRoles: Role[],
}

export const PrivateRoute = (props: PrivateRouteProps) => {
 const role  = useAppSelector(state => state.auth.userInfo?.role);


 if (props.needRoles.map(x => x.uuid).some(x => x === role)) {
  return <Outlet />
 } else {
  return <Navigate to="/" />
 }
}