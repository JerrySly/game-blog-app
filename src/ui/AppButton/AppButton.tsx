import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { CommonProps } from "../../common/props";

interface AppButtonInterface {
  type: 'submit' | 'button' | 'reset' | undefined
}

export const AppButton = (props: AppButtonInterface & CommonProps & React.HTMLProps<HTMLButtonElement>) => {
  return <button   {...props} type={ props.type ?? 'button'}
   >{props.children}</button>
}