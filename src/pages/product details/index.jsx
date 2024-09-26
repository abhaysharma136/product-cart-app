import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateQuantity } from "../../redux/cartSlice";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
} from "@mui/material";
import products from "../../products";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Add loading state

  // Simulate fetching the product
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after data is "fetched"
    }, 1000); // Simulate a 1-second delay

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  // Find the product from the products array
  const product = products.find((prod) => prod.id == productId);

  // Get the current cart items from the Redux store
  const cart = useSelector((state) => state.cart.items);
  const existingItem = cart.find((item) => item.id === productId);

  const handleCheckout = () => {
    if (existingItem) {
      // If the item is already in the cart, update the quantity
      dispatch(
        updateQuantity({ id: productId, quantity: existingItem.quantity + 1 })
      );
    } else {
      // If the item is not in the cart, add it
      dispatch(addItem({ ...product, quantity: 1 }));
    }
    navigate("/cart");
  };

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <CircularProgress /> {/* Show loader while loading */}
      </div>
    );
  }

  return (
    <Card style={{ margin: "20px" }} sx={{ borderRadius: 5, padding: 2 }}>
      <Grid container spacing={2}>
        {/* Product Image on the Left */}
        <Grid item xs={12} md={5}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", borderRadius: 15 }}
          />
        </Grid>

        {/* Product Details on the Right */}
        <Grid item xs={12} md={7}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              {product.description}
            </Typography>
            <Typography variant="h6" color="primary">
              ${product.price}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              sx={{
                borderRadius: 4,
                background: "yellow",
                border: "none",
                color: "black",
                padding: "5px 10px",
              }}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProductDetails;
