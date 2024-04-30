import React, { useState, useEffect } from "react";
import items from "./products.json";
import "bootstrap/dist/css/bootstrap.css";

const ShoppingApp = () => {
  // State for showing cart view, browse view, or confirmation view
  const [view, setView] = useState("browse");

  // State for storing items in the cart
  const [cart, setCart] = useState([]);

  // State for storing the total price of items in the cart
  const [cartTotal, setCartTotal] = useState(0);

  // State for handling search input
  const [searchQuery, setSearchQuery] = useState("");

  // Function to add item to cart
  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  //data for the form
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    cardNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  // Function to remove item from cart
  const removeFromCart = (el) => {
    let itemFound = false;
    const updatedCart = cart.filter((cartItem) => {
      if (cartItem.id === el.id && !itemFound) {
        itemFound = true;
        return false;
      }
      return true;
    });
    if (itemFound) {
      setCart(updatedCart);
    }
  };

  // Function to toggle between views
  const goToCart = () => {
    setView("cart");
  };

  const goToConfirmation = () => {
    setView("confirmation");
  };

  const goToBrowse = () => {
    if (view === "confirmation") {
      setCart([]);
      setFormData([]);
    }
    setView("browse");
  };

  // Calculate total cart value
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    setCartTotal(total);
  }, [cart]);

  //counts how many of this id in the cart
  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const listItems = filteredItems.map((el) => (
    // PRODUCT
    <div class="row border-top border-bottom" key={el.id}>
      <div class="row main align-items-center">
        <div class="col-2">
          <img class="img-fluid" src={el.image} />
        </div>
        <div class="col">
          <div class="row text-muted">{el.title}</div>
          <div class="row">{el.category}</div>
        </div>
        <div class="col">
          <button
            type="button"
            variant="light"
            onClick={() => removeFromCart(el)}
          >
            {" "}
            -{" "}
          </button>{" "}
          <button type="button" variant="light" onClick={() => addToCart(el)}>
            {" "}
            +{" "}
          </button>
        </div>
        <div class="col">
          ${el.price} <span class="close">&#10005;</span>
          {howManyofThis(el.id)}
        </div>
      </div>
    </div>
  ));

  //keeps the data from the form and displays it
  //submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    setView("confirmation");
  };

  const handleBlur = (event) => {
    // Update the state only when leaving the input field
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  //change handler
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    event.preventDefault();
  };

  // JSX for cart view
  const cartView = (
    <div className="container">
      <h2>Shopping Cart</h2>
      <button className="btn btn-primary" onClick={goToBrowse}>
        Back to Browse
      </button>
      {cart.map((item) => (
        <div className="row" key={item.id}>
          <div className="col-md-4">
            <img
              className="img-fluid"
              src={item.image}
              alt={item.title}
              style={{ maxWidth: "150px" }}
            />
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col">{item.title}</div>
              <div className="col">${item.price}</div>
              <div className="col">
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <p>Total: ${cartTotal}</p>
      <div className="checkout-form">
        <h3>Checkout</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">
              Credit Card Number
            </label>
            <input
              type="text"
              className="form-control"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              pattern="^[0-9]{15,16}$"
              title="Please enter a 15-16 digit number"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Shipping Address
            </label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="zip-code" className="form-label">
              Zip Code
            </label>
            <input
              type="text"
              className="form-control"
              id="zip-code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              onBlur={handleBlur}
              pattern="[0-9]{5}"
              title="Please enter a five digit number"
              required
            />
          </div>

          <button type="submit" className="btn btn-success">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );

  // JSX for confirmation view
  const confirmationView = (
    <div className="container">
      <h2>Confirmation</h2>

      <p>Thank you {formData.fullName} Your order has been confirmed!</p>
      <h3>Review Information</h3>
      <h4>Total Cost: ${cartTotal}</h4>
      <p>
        Items Purchased{" "}
        {cart.map((item) => (
          <div className="row" key={item.id}>
            <div className="col-md-4">
              <img
                className="img-fluid"
                src={item.image}
                alt={item.title}
                style={{ maxWidth: "150px" }}
              />
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col">{item.title}</div>
                <div className="col">${item.price}</div>
                <div className="col"></div>
              </div>
            </div>
          </div>
        ))}
      </p>
      <h4>Information</h4>
      <p>Name: {formData.fullName}</p>
      <p>Email: {formData.email}</p>
      <p>Credit Card: ****************</p>
      <p>Shipping Address: {formData.address}</p>
      <p>City: {formData.city}</p>
      <p>State: {formData.state}</p>
      <p>Zip Code: {formData.zipCode}</p>
      <button className="btn btn-primary" onClick={goToBrowse}>
        Start a new order
      </button>
    </div>
  );

  // JSX for browse view
  const browseView = (
    <div>
      STORE SE/ComS319
      <div class="card">
        <div class="row">
          {/* HERE, IT IS THE SHOPING CART */}
          <div class="col-md-8 cart">
            <div class="title">
              <div class="row">
                <div class="col">
                  <h4>
                    <b>319 Shopping Cart</b>
                  </h4>
                  {/* Search bar */}
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <div class="col align-self-center text-right text-muted">
                  <div class="float-end">
                    <p class="mb-0 me-5 d-flex align-items-center">
                      <span class="small text-muted me-2">Order total:</span>
                      <span class="lead fw-normal">${cartTotal}</span>
                    </p>
                  </div>
                  Products selected {cart.length}
                </div>
                <div>
                  <button className="btn btn-primary" onClick={goToCart}>
                    Cart
                  </button>
                </div>
              </div>
            </div>
            <div>{listItems}</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Determine which view to render based on the 'view' state
  let currentView;
  if (view === "browse") {
    currentView = browseView;
  } else if (view === "cart") {
    currentView = cartView;
  } else if (view === "confirmation") {
    currentView = confirmationView;
  }

  return (
    <div>
      hi
      {currentView}
    </div>
  );
};

export default ShoppingApp;
