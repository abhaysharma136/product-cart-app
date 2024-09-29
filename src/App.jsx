import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import ProductListing from "./pages/product list";
import ProductDetails from "./pages/product details";
import { useState } from "react";
import CartPage from "./pages/cart page";
import SuccessPage from "./pages/success page";
import AnnouncementBar from "./components/announcementbar";
import ProductCarousel from "./components/product Scroller";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingItemIndex = cart.findIndex(
      (item) => item.name === product.name
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const updateCartQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) return;
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((item, i) => i !== index);
    setCart(updatedCart);
  };

  const placeOrder = () => {
    const totalAmount = cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

    navigate("/success", { state: { orderItems: cart, totalAmount } });

    setCart([]);
  };

  const navigate = useNavigate();
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/car" element={<ProductCarousel />} />
        <Route
          path="/product/:productId"
          element={<ProductDetails product={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              updateCartQuantity={updateCartQuantity}
              removeFromCart={removeFromCart}
              placeOrder={placeOrder}
            />
          }
        />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </>
  );
}

export default App;
