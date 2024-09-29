import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, clearCart } from "../../redux/cartSlice";
import {
  Button,
  Typography,
  Card,
  IconButton,
  CircularProgress,
  Box,
  ButtonGroup,
  Grid,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Loading state to control the loader
  const [loading, setLoading] = useState(true);

  // Selecting cart items from the Redux store
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
    const orderDetails = {
      items: cart,
      total: calculateTotalAmount(),
    };

    // Clear the cart after storing order details
    dispatch(clearCart());

    // Navigate to the success page with the order details
    navigate("/success", { state: { orderDetails } });
  };

  // Calculate total amount safely
  const calculateTotalAmount = () => {
    if (Array.isArray(cart) && cart.length > 0) {
      return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }
    return 0;
  };

  return (
    <Box sx={{ padding: "20px" }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : cart.length === 0 ? (
        <Typography variant="h4" gutterBottom>
          Your Cart is Empty. Add something to your Cart.
        </Typography>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Your Cart
          </Typography>

          <Divider sx={{ marginBottom: "20px" }} />

          {cart.map((item) => (
            <Card key={item.id} sx={{ marginBottom: 2, padding: 2 }}>
              <Grid container spacing={2} alignItems="center">
                {/* Product Image */}
                <Grid item xs={12} sm={3}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                </Grid>

                {/* Product Details */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body1">
                    Price: ${item.price.toFixed(2)}
                  </Typography>
                </Grid>

                {/* Quantity Controls */}
                <Grid item xs={12} sm={3} textAlign="center">
                  <ButtonGroup size="small" aria-label="quantity control">
                    <IconButton
                      aria-label="decrease quantity"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity === 1}
                    >
                      <RemoveIcon />
                    </IconButton>

                    <Box
                      sx={{
                        display: "inline-flex",
                        width: "50px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body1">{item.quantity}</Typography>
                    </Box>

                    <IconButton
                      aria-label="increase quantity"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </ButtonGroup>

                  {/* Remove Button */}
                  <IconButton
                    color="secondary"
                    onClick={() => handleRemove(item.id)}
                    sx={{ marginLeft: "20px" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Card>
          ))}

          <Divider sx={{ marginY: "20px" }} />

          <Typography variant="h5" align="right" gutterBottom>
            Total: ${calculateTotalAmount().toFixed(2)}
          </Typography>

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClearCart}
              sx={{
                marginRight: "10px",
                borderRadius: 10,
                background: "white",
                border: "none",
                color: "black",
                padding: "5px 10px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  color: "#333",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", 
                  transform: "scale(1.05)",
                },
              }}
            >
              Clear Cart
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handlePlaceOrder}
              sx={{
                borderRadius: 10,
                background: "black",
                border: "none",
                color: "white",
                padding: "5px 10px",
                transition: "all 0.3s ease", // Smooth transition for hover effects
                "&:hover": {
                  backgroundColor: "#333", // Darker shade of black for hover
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Subtle shadow effect
                  transform: "scale(1.05)", // Slight scale up effect
                },
              }}
            >
              Place Order
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartPage;
