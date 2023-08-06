import { forwardRef } from "react"
import { CommonProps } from "../../common/props"

interface InputProps {
  onInput?: React.FormEventHandler<HTMLInputElement>,
}

type Props = CommonProps & InputProps & React.HTMLProps<HTMLInputElement>;

export const AppInput = forwardRef<HTMLInputElement, Props>((props, ref) => {


  return <input {...props} ref={ref} />
})