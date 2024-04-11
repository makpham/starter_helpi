import { Link } from "react-router-dom";
import "./Menu.css";
interface MenuItem {
  label: string;
  route: string;
}
interface MenuBarProps {
  items: MenuItem[];
}

export function MenuBar(props: MenuBarProps) {
  return (
    <div className="menu-bar">
      {props.items.map((item: MenuItem, index: number) => (
        <li className="menu-item" key={index}>
          <a className="menu-link" href={item.route}>{item.label}</a>
        </li>
      ))}
    </div>
  );
}
