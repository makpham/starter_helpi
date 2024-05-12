import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import { MenuBar } from "../components/Menu";
import img from "../imgs/logo.png";

const Header = () => {
  const location = useLocation();
  const menuItems = [
    { label: "Home", route: "/" },
    { label: "Detailed Question", route: "/detailed-questions" },
    { label: "Basic Question", route: "/basic-questions" },
  ];

  const filteredMenuItems = menuItems.filter(item => item.route !== location.pathname);

  return (
    <header className="header">
      <br />
      <div className="header-content">
        <Link to="/"><img src={img} className="logo" alt="Career Navigator logo"/></Link>
        <h1 className="site-name">Career Navigator</h1>
      </div>
      <br />
      {location.pathname !== '/' && <MenuBar items={filteredMenuItems} />}
    </header>
  );
}

export default Header;