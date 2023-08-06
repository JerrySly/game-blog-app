import { CommonProps } from '../../common/props';
import './AppDialog.scss';

interface WindowProps extends CommonProps {
  onBlur?: boolean,
  closeCallback?: Function
  closeOnBlur?: boolean
}


export const AppDialog = ({children, ...props}: WindowProps) => {
  return <>
    { props.onBlur ? <div className='blur' onClick={() => {
      if(props.closeCallback && props.closeOnBlur) props.closeCallback();
    }}/> : null }
    <div className="window">
      {children}
    </div>
  </>
}