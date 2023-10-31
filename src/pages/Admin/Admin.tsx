import { useState } from "react"
import { Login } from "../../components/admin/Login/Login"
import { AdminMenu } from "../../components/admin/AdminMenu/AdminMenu";
import './Admin.scss';
import { Outlet } from "react-router";

export const Admin = () => {
  const [auth, setAuth] = useState(true);
  return <>
    { !auth ? <Login />
    : <div className="admin__page">
        <AdminMenu className="admin__menu"/>
        <div className="admin__main">
          <Outlet />
        </div>
      </div>
    }
  </>
}