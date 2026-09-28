import React, { useState } from "react";
import AboutUs from "./AboutUs";
import ProductList from "./ProductList";
import CartItem from "./CartItem";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const navigate = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (page === "plants") return <ProductList onNavigate={navigate} />;
  if (page === "cart") return <CartItem onNavigate={navigate} />;

  return (
    <main className="landing-page">
      <div className="background-image" aria-hidden="true" />
      <div className="landing-overlay">
        <div className="landing-content">
          <p className="eyebrow">PARADISE NURSERY</p>
          <h1>Welcome to Paradise Nursery</h1>
          <div className="divider" />
          <p className="tagline">Where Green Meets Serenity</p>
          <button className="get-started-button" onClick={() => navigate("plants")}>Get Started</button>
        </div>
        <div className="aboutus-container"><AboutUs /></div>
      </div>
    </main>
  );
}
export default App;
