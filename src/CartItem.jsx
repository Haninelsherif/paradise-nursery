import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import Navbar from "./Navbar";
import "./CartItem.css";

const parseCost = (cost) => Number(String(cost).replace("$", ""));

const CartItem = ({ onNavigate }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + item.quantity * parseCost(item.cost), 0);

  const calculateTotalCost = (item) => item.quantity * parseCost(item.cost);

  const handleIncrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const handleDecrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));

  const handleRemove = (item) => dispatch(removeItem(item.name));
  const handleCheckout = () => window.alert("Checkout is coming soon!");

  return (
    <div className="cart-page">
      <Navbar onNavigate={onNavigate} />
      <main className="cart-container">
        <section className="cart-header">
          <div>
            <p className="section-eyebrow">YOUR CART</p>
            <h1>Shopping Cart</h1>
            <p>{totalItems === 0 ? "Your cart is waiting for its first plant." : totalItems + " plant" + (totalItems === 1 ? "" : "s") + " selected"}</p>
          </div>
          <div className="cart-total-card"><span>Total</span><strong>{"$" + calculateTotalAmount()}</strong></div>
        </section>

        {cart.length === 0 ? (
          <section className="empty-cart">
            <div className="empty-cart-icon">🌿</div>
            <h2>Your cart is empty</h2>
            <p>Add a few plants from our collection to get started.</p>
            <button className="continue-shopping-button" onClick={() => onNavigate("plants")}>Continue Shopping</button>
          </section>
        ) : (
          <>
            <section className="cart-items">
              {cart.map((item) => (
                <article className="cart-item" key={item.name}>
                  <img className="cart-item-image" src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <p className="cart-item-label">PLANT</p>
                    <h2 className="cart-item-name">{item.name}</h2>
                    <p className="cart-item-cost">Unit price: {item.cost}</p>
                    <div className="cart-item-controls">
                      <div className="quantity-control">
                        <button className="cart-item-button" onClick={() => handleDecrement(item)} aria-label={"Decrease " + item.name + " quantity"}>−</button>
                        <span className="cart-item-quantity-value">{item.quantity}</span>
                        <button className="cart-item-button" onClick={() => handleIncrement(item)} aria-label={"Increase " + item.name + " quantity"}>+</button>
                      </div>
                      <div className="cart-item-total"><span>Item total</span><strong>{"$" + calculateTotalCost(item)}</strong></div>
                      <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <section className="cart-summary">
              <div><span>Total plants</span><strong>{totalItems}</strong></div>
              <div><span>Total cost</span><strong>{"$" + calculateTotalAmount()}</strong></div>
            </section>

            <div className="cart-actions">
              <button className="continue-shopping-button" onClick={() => onNavigate("plants")}>Continue Shopping</button>
              <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default CartItem;
