import { MouseEventHandler, useState } from "react";
import { CommonProps } from "../../common/props";
import './AppTabs.scss';

interface AppTabsProps extends CommonProps {
  values: string[],
  selected?: number,
  onChange: (value: string) => void
}

export const AppTabs = ({...props}: AppTabsProps) => {
  let [selected, setSelected] = useState(props.selected ?? 0);
  const selectTab = (value: number): undefined => {
    const selectedValue = props.values.filter((x, index) => index === value)[0];
    setSelected(value);
    props.onChange(selectedValue);
    return;
  }
  return (
    <div className="tabs">
      {
        props.values.map(
          (value, index) => <div key={index} className={"tabs__value" + (selected === index ? ' tabs__value_selected': '')}
          onClick={() => selectTab(index)}>{value}<div className={selected === index ? "tabs__selection-line" : ''} /></div>)
      }
    </div>
  )
}