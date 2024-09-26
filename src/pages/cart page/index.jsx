import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, clearCart } from "../../redux/cartSlice";
import {
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  TextField,
  CircularProgress,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Loading state to control the loader
  const [loading, setLoading] = useState(true);

  // Selecting cart items and total amount from Redux store
  const cart = useSelector((state) => state.cart.items);

  useEffect(() => {
    // Simulate loading with a delay
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after data is loaded
    }, 1000); // Simulate a delay of 1 second

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  const handleRemove = (id) => {
    dispatch(removeItem({ id }));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlePlaceOrder = () => {
    navigate("/success");
  };

  // Calculate total amount safely
  const calculateTotalAmount = () => {
    if (Array.isArray(cart) && cart.length > 0) {
      return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }
    return 0;
  };

  return (
    <div style={{ padding: "20px" }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
          <CircularProgress />
        </Box>
      ) : cart.length === 0 ? (
        <>
          <Typography variant="h4" gutterBottom>
            Your Cart is Empty. Add something to your Cart.
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Your Cart
          </Typography>

          {cart.map((item) => (
            <Card key={item.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <img src={item.image} alt={item.name} width="100" height="100" />
                <Typography variant="body1">Price: ${item.price.toFixed(2)}</Typography>
                <TextField
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  inputProps={{ min: 1 }}
                  sx={{ width: "60px", marginRight: "10px" }}
                />
                <IconButton color="secondary" onClick={() => handleRemove(item.id)}>
                  Remove
                </IconButton>
              </CardContent>
            </Card>
          ))}

          <Typography variant="h5">Total: ${calculateTotalAmount().toFixed(2)}</Typography>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleClearCart}
            sx={{ marginRight: "10px" }}
          >
            Clear Cart
          </Button>

          <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </>
      )}
    </div>
  );
};

export default CartPage;
