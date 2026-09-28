import React from "react";
import { useSelector } from "react-redux";
import "./Navbar.css";

function Navbar({ onNavigate }) {
  const cart = useSelector((state) => state.cart.items);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleNavigation = (event, page) => {
    event.preventDefault();
    onNavigate(page);
  };

  return (
    <header className="navbar">
      <button className="navbar-brand" onClick={(event) => handleNavigation(event, "home")}>
        <span className="navbar-leaf">🌿</span>
        <span><strong>Paradise Nursery</strong><small>Where Green Meets Serenity</small></span>
      </button>
      <nav className="navbar-links" aria-label="Main navigation">
        <a href="#home" onClick={(event) => handleNavigation(event, "home")}>Home</a>
        <a href="#plants" onClick={(event) => handleNavigation(event, "plants")}>Plants</a>
        <a href="#cart" onClick={(event) => handleNavigation(event, "cart")}>
          <span>Cart</span><span className="cart-badge">🛒 {totalItems}</span>
        </a>
      </nav>
    </header>
  );
}
export default Navbar;
