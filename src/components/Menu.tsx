import { Link } from 'react-router-dom';
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
          <Link className="menu-link" to={item.route}>{item.label}</Link>
        </li>
      ))}
    </div>
  );
}