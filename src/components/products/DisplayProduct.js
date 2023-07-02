import React, { useEffect, useState } from "react";
import Navbar from "../../common/Navbar";
import { ProductData } from "../../models/ProductData";
import { Link } from "react-router-dom";
import "./DisplayProduct.css";

export default function DisplayProduct({ setOrder, displayProduct, order }) {
  const [quantity, setQuantity] = useState(1);

  function decrementCart() {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  }

  function incrementCart() {
    if (quantity < 15) {
      setQuantity((prevCount) => prevCount + 1);
    }
  }

  function onFormSubmit(e) {
    e.preventDefault();
    const subtotal = displayProduct.price * quantity;
    console.log(quantity)
    const item = new ProductData(displayProduct.productName, displayProduct.price, quantity, subtotal, displayProduct.productImageUrl, displayProduct.id);
    setOrder(orderList => [...orderList, item])
    console.log(order)
    console.log(item);
  }
  useEffect(() => {
    initialLoad();
  }, []);

  async function initialLoad() {
    try {
      if (displayProduct) {
        console.log(displayProduct);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="row">
        
        <div className="col mt-5">
          <img
            src={displayProduct.productImageUrl}
            alt={displayProduct.productName}
            width="392"
            height="340"
          ></img>
        </div>
        
        <div className="col ms-5">
          <div className="mt-5 mb-3">
            {" "}
            <Link className="account-path" to="/">
              Home
            </Link>{" "}
            / {displayProduct.category} / {displayProduct.productName}{" "}
          </div>{" "}
          <h2 className="mb-3">{displayProduct.productName}</h2>
          <h4 className="mb-3 display-price">Price: R{displayProduct.price}</h4>
          <div className="mb-3 display-description">
            {displayProduct.description}
          </div>
          <div>Is Organic? {displayProduct.status}</div>
          <div className="mb-5">Type? {displayProduct.category}</div>
          
          <div className="input-group quantity-holder mb-3">
            <button
              className="edit-quantity-btn btn btn-primary"
              onClick={decrementCart}
            >
              -
            </button>
            <div className="form-control text-center">{quantity}</div>
            <button
              className="edit-quantity-btn btn btn-primary"
              onClick={incrementCart}
            >
              +
            </button>
          </div>
          <button
            className="btn btn-primary submit-cart-btn"
            type="submit"
            onClick={onFormSubmit}
          >
            Add to Cart
          </button>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}
