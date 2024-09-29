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
  Divider,
  AppBar,
  Toolbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import styles from "./cart.module.css";
import discountIcon from "../../assets/icons/discount.png";
import arrowRight from "../../assets/icons/right-arrow.png";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
const CartPage = ({ toggleDrawer }) => {
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
    <>
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
        <Box sx={{ padding: "20px" }}>
          <AppBar position="static" color="default" sx={{ boxShadow: "none" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="back"
                onClick={() => toggleDrawer(false)()}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography
                variant="h5"
                sx={{ flexGrow: 1, textAlign: "center" }}
              >
                Your Cart
              </Typography>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="close"
                onClick={() => toggleDrawer(false)()}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Typography variant="h4" gutterBottom>
            Your Cart is Empty. Add something to your Cart.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ padding: "20px" }}>
          {/* Header with Back Arrow and Close Button */}
          <AppBar position="static" color="default" sx={{ boxShadow: "none" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="back"
                onClick={() => toggleDrawer(false)()}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography
                variant="h5"
                sx={{ flexGrow: 1, textAlign: "center" }}
              >
                Your Cart
              </Typography>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="close"
                onClick={() => toggleDrawer(false)()}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <Divider sx={{ marginBottom: "20px" }} />
          <div>
            <Typography variant="h6">Review cart</Typography>
            <Card sx={{ marginBottom: 2, padding: 2, borderRadius: "20px" }}>
              {cart.map((item, index) => (
                <div className={styles.cartProductDetailsContainer} key={index}>
                  {/* Product Image */}
                  <div className={styles.productImageContainer}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "80%", borderRadius: 8 }}
                    />
                  </div>

                  <div className={styles.nameQuantityTextContainer}>
                    <Typography variant="h5">{item.name}</Typography>
                    <Typography variant="h6">1 Kg</Typography>
                  </div>
                  <div>
                    <ButtonGroup
                      size="small"
                      aria-label="quantity control"
                      sx={{
                        background: "yellow",
                        borderRadius: "20px",
                        width: "100px",
                      }}
                    >
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
                  </div>
                  <Typography variant="body1" sx={{ marginLeft: "5px" }}>
                    ₹{item.price.toFixed(2)}
                  </Typography>
                  <IconButton
                    color="secondary"
                    onClick={() => handleRemove(item.id)}
                    sx={{ marginLeft: "20px" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
            </Card>
          </div>
          <Divider sx={{ marginBottom: "20px" }} />
          {/* Coupon and Offers Card */}
          <Card sx={{ marginBottom: 2, padding: 2, borderRadius: "20px" }}>
            <div className={styles.couponContainer}>
              <img src={discountIcon} alt="discountIcon" />
              <div>
                <Typography variant="h5">View coupons & Offers</Typography>
                <Typography variant="h6">
                  Add ₹20 more to save ₹250 on this order
                </Typography>
              </div>
              <img src={arrowRight} alt="rightArrow" />
            </div>
          </Card>

          {/* Bill Details */}
          <Card
            sx={{ marginBottom: 2, padding: 2, borderRadius: "20px" }}
            className={styles.billDetailsContainer}
          >
            <Typography variant="h3" sx={{ marginBottom: "10px" }}>
              Bill details
            </Typography>
            <div>
              <Typography variant="h5">Item total</Typography>
              <Typography variant="h4">
                ₹{calculateTotalAmount().toFixed(2)}
              </Typography>
            </div>
            <Divider />
            <div>
              <Typography variant="h5" sx={{ color: "green" }}>
                Savings
              </Typography>
              <Typography variant="h4" sx={{ color: "green" }}>
                -₹92
              </Typography>
            </div>
            <div>
              <Typography variant="h5" sx={{ color: "green" }}>
                Coupon used
              </Typography>
              <Typography variant="h4" sx={{ color: "green" }}>
                -₹250
              </Typography>
            </div>
            <Divider />
            <div>
              <Typography variant="h5">PAID ONLINE</Typography>
              <Typography variant="h4">₹821</Typography>
            </div>
          </Card>

          {/* Cancellation Policy */}
          <Card
            sx={{ marginBottom: 2, padding: 2, borderRadius: "20px" }}
            className={styles.policyContainer}
          >
            <Typography variant="h5">Cancellation policy</Typography>
            <Typography variant="h6">
              Orders cannot be cancelled and are non-refundable once packed for
              delivery.
            </Typography>
            <Typography variant="h6">
              Review your order before making a payment to avoid cancellation.
            </Typography>
          </Card>

          {/* Action Buttons */}
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
                background: "yellow",
                border: "none",
                color: "black",
                padding: "5px 10px",
                transition: "all 0.3s ease", // Smooth transition for hover effects
                "&:hover": {
                  backgroundColor: "yellow",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Subtle shadow effect
                  transform: "scale(1.05)", // Slight scale up effect
                },
              }}
            >
              Place Order
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};
CartPage.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};

// Export default the updated component
export default CartPage;
