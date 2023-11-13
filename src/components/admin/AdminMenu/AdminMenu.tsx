import { List, ListItem, ListItemText } from "@mui/material";
import { CommonProps } from "../../../common/props";
import { useState } from "react";
import './AdminMenu.scss';
import { useNavigate } from "react-router";

export const AdminMenu = (props: CommonProps) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    {
      text: 'Create article',
      route: 'create-article',
    },
    {
      text: 'Articles list',
      route: 'articles-list',
    },
    {
      text: 'Users list',
      disable: true,
    },
  ]);
  const [selected, setSelected] = useState(0);
  const chooseItem = (index: number) => {
    if (items[index].disable) return;
    setSelected(index);
    navigate(`${items[index].route}`)
  }
  return <div className={props.className}>
      <List className="list">
        {
          items.map((x, index) =>
            <ListItem className={`list__item `+ (selected === index ? 'list__item_selected': '')} disabled={x.disable} key={x.text} onClick={() => chooseItem(index)}>
              <ListItemText className="item__text">{x.text}</ListItemText>
            </ListItem>
          )
        }
        
      </List>
  </div>
}