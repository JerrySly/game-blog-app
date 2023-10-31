import { Button, TextField } from "@mui/material"
import './Login.scss';

export const Login = () => {
  return <>
    <div className="login__wrapper">
      <div className="login">
        <TextField id="name" label="Username" variant="outlined" />
        <TextField id="password" label="Password" variant="outlined" />
        <div className="login__actions">
          <Button variant="contained">Login</Button>
        </div>
      </div>
    </div>
  </>
}