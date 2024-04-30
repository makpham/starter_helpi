import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { MenuBar } from "../components/Menu";
import img from "../imgs/newdog.webp";

const Header = () => {
  const menuItems = [
    { label: "Home", route: "/" },
    { label: "Detailed Question", route: "/detailed-questions" },
    { label: "Basic Question", route: "/basic-questions" },
  ];

  return (
    <header className="header">
      <br />
      <div className="logo-container">
        <Link to="/"><img src={img} className="logo" alt="Career Navigator logo"/></Link>
        <h1 className="site-name">Career Navigator</h1>
      </div>
      <br />
      <MenuBar items={menuItems} />
    </header>
  );
}

export default Header;