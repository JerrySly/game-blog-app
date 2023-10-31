import { CommonProps } from "../../common/props"
import { AppDropDownValue } from "./Types/types";
import { BiDownArrow } from 'react-icons/bi'
import "./AppDropDown.scss";

interface AppDropDownProps {
  onChange?: () => Object,
  values: Array<AppDropDownValue>
  inputClassName?: string,
  valueClassName?: string,
  dropClassName?: string,
  arrowClassName?: string,
  firstValue?: AppDropDownValue
}

type Props = CommonProps & AppDropDownProps; 

export const AppDropDown = (props: Props) => {
  return (
    <div className="dropDown">
      <input className={props.inputClassName || "dropDown__result"} type="text" readOnly value={props?.firstValue?.label || 'test'}/>
      <BiDownArrow className={ props.arrowClassName || "dropDown__arrow" }/>
      <div className={props.dropClassName || "dropDown__values"}>
        {props.values.map((x =>
          <div className={props.valueClassName || "dropDown__value"}>
            {x.label}
          </div>
        ))}
      </div>
    </div>
  )
} 