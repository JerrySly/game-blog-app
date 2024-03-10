import { AdminMenu } from "../../components/admin/AdminMenu/AdminMenu";
import './Admin.scss';
import { Outlet } from "react-router";

export const Admin = () => {
  return <>
    <div className="admin__page">
      <AdminMenu className="admin__menu"/>
      <div className="admin__main">
        <Outlet />
      </div>
    </div>
  </>
}