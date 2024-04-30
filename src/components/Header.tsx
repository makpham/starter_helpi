import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import { MenuBar } from "../components/Menu";
import img from "../imgs/newdog.webp";


const Header = () => {
  const location = useLocation();
  const menuItems = [
    { label: "Home", route: "/" },
    { label: "Detailed Question", route: "/detailed-questions" },
    { label: "Basic Question", route: "/basic-questions" },
  ];

  const filteredMenuItems = menuItems.filter(item => item.route !== location.pathname);

  if (location.pathname === '/') {
    return (
      <header className="header">
        <img src={img} alt="logo" />
        <h1>Starter Helpi</h1>
      </header>
    );
  }

  return (
    <header>
      <div className="logo-container">
        <Link to="/"><img src={img} className="logo" alt="404"/></Link>
        <h1 className="site-name">Starter Helpi</h1>
      </div>
      <MenuBar items={filteredMenuItems} />
    </header>
  );
}

export default Header;