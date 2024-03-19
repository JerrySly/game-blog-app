import { useState } from 'react';
import './SingUp.scss';
import { AppTabs } from '../../ui/AppTabs/AppTabs';
import { AppButton } from '../../ui/AppButton/AppButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Navigate, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/custom-redux';
import { deleteCookies, logIn, singUp as reg } from '../../api/user';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, TextField } from '@mui/material';

interface IFormSingIn {
  email: string,
  password: string,
}

const singUpSchema = yup.object({
  email: yup.string().required('Email is required'),
  nickname: yup.string().required('Nickname is required'),
  password: yup.string().required('Password is required').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$/, 'The password must contain numbers, spec symbols, lowercase and uppercase letters and have length more 7 and least 32 symbols'),
  confirmPassword: yup.string().required('Password must match').oneOf([yup.ref('password')], 'Password must match'),
})

type SingUpType = yup.InferType<typeof singUpSchema>

export const SingUp = () => {

  const auth = useAppSelector(state => state.auth.userInfo);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  
  let [dialog, setDialog] = useState(true);
  let tabsValues = ['SingIn', 'SingUp'];
  let [authMode, setAuthMode] = useState('SingIn');
  let [form, setForm] = useState({
    email: null,
    nickname: null,
    password: null,
    confirmPassword: null,
  })


  const setFormProp = (prop: string, value: React.FormEvent<HTMLDivElement>) => {
    setForm({
      ...form,
      [prop]: value.currentTarget.innerText,
    });
  }

  const changeTab = (value: string): any => {
    setAuthMode(value);
  }

  const {handleSubmit: singInSubmit, register: singInRegister, formState: { errors: singInErrors }} = useForm<IFormSingIn>();


  const {handleSubmit: singUpSubmit, register: singUpRegister, formState: { errors: singUpErrors }} = useForm<SingUpType>({
    resolver: yupResolver(singUpSchema)
  });

  const onSubmitIn: SubmitHandler<IFormSingIn> = async data => {
    await deleteCookies();
    logIn(data).then( data => {
      dispatch({ type: 'auth/setToken', payload: data.token});
      dispatch({ type: 'auth/setUserInfo', payload: {
        nickname: data.nickname,
        uuid: data.uuid,
        role: data.role,
      } });
      dispatch({type: 'auth/setRefreshToken', payload: data.refreshToken});
      localStorage.setItem('token', data.token);
      navigate('/');
    })
  };
  const onSubmitUp: SubmitHandler<Omit<SingUpType, 'confirmPassword'>> = data => {
    reg(data).then(data => {
      console.log(data);
      setAuthMode('SingIn');
    }).catch(err => {
      if(err.response.status === 500) {
        const notifyError = () => toast.error('User already exist exist');
        notifyError();
      }
    });
  };

  const closeHandler = () => {
    navigate('/');
  }

  
  if (auth?.uuid) {
    return <Navigate  to={'/'}/>
  }
  return (
      <Dialog onClose={closeHandler} open={true}  fullWidth={true}>
        <div className='dialog-window'>
        <AppTabs className='auth__tabs' values={tabsValues} onChange={changeTab} />
          <div className='auth__name'>{authMode}</div>
            { authMode === 'SingIn' ? 
            <form className='auth__form' onSubmit={singInSubmit(onSubmitIn)}>
              <label>Email</label>
              <TextField {...singInRegister('email', { required: true })} aria-invalid={singInErrors ? true : false} className='auth__field' type='email' onInput={(value) => {setFormProp('email', value)}}/>
              {singInErrors.email?.type === 'required' && <p className='auth__error' role='alert'>Email is required</p>}
              <label>Password</label>
              <TextField {...singInRegister('password', { required: true })} aria-invalid={singInErrors ? true : false} className='auth__field' type='password'  onInput={(value) => {setFormProp('password', value)}}/>
              {singInErrors.password?.type === 'required' && <p className='auth__error' role='alert'>Password is required</p> }
              <div className='auth__actions'>
                <AppButton type='submit' className='auth__btn' >LogIn</AppButton>
              </div>
            </form>
            :
            <form className='auth__form' onSubmit={singUpSubmit(onSubmitUp)}>
              <label>Email</label>
              <TextField {...singUpRegister('email')} className='auth__field' type='email'  onInput={(value) => {setFormProp('email', value)}}/>
              <p className='auth__error'>{singUpErrors.email?.message}</p>
              <label>NickName</label>
              <TextField {...singUpRegister('nickname')} className='auth__field'  onInput={(value) => {setFormProp('nickName', value)}}/>
              <p className='auth__error'>{singUpErrors.nickname?.message}</p>
              <label>Password</label>
              <TextField {...singUpRegister('password')} className='auth__field' type='password' onInput={(value) => {setFormProp('password', value)}}/>
              <p className='auth__error'>{singUpErrors.password?.message}</p>
              <label>Confirm password</label>
              <TextField {...singUpRegister('confirmPassword')} className='auth__field' type='password' onInput={(value) => {setFormProp('confirmPassword', value)}}/>
              <p className='auth__error'>{singUpErrors.confirmPassword?.message}</p>
              <div className='auth__actions'>
                <AppButton type='submit' className='auth__btn'>Register</AppButton> 
              </div>
            </form>
            }
          </div>
      </Dialog>
  ) 
    
}