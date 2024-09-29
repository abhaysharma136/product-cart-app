import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateQuantity } from "../../redux/cartSlice";
import { Button, Typography, CircularProgress, Grid } from "@mui/material";
import products from "../../products";
import { useEffect, useState } from "react";
import styles from "./productDetails.module.css";
import AddIcon from "@mui/icons-material/Add";

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
    <div className={styles.mainContiner}>
      <div>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item xs={12} md={4}>
            <div className={styles.productImageContainer}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "60%", borderRadius: 25 }}
                className={styles.productImage}
              />
            </div>
          </Grid>

          <Grid item xs={12} md={5}>
            <div className={styles.rightDetailsContainer}>
              <Typography variant="h5" gutterBottom>
                {product.name}
              </Typography>
              <Typography ariant="h5" gutterBottom>
                Geeru gundu badenekaayi
              </Typography>
              <div className={styles.priceContainer}>
                <div className={styles.priceValueContainer}>
                  <Typography variant="h6" fontSize="14px">
                    1 KG
                  </Typography>
                  <Typography variant="h6" fontSize="14px">
                    ₹ {product.price}
                  </Typography>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCheckout}
                  className={styles.AddToCartButton}
                  endIcon={<AddIcon />}
                  sx={{
                    marginTop: "10px",
                    borderRadius: 10,
                    border: "none",
                    color: "black",
                    padding: "10px 15px",
                    transition: "all 0.3s ease", // Smooth transition for hover effects
                    "&:hover": {
                      backgroundColor: "#333", // Darker shade of black for hover
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Subtle shadow effect
                      transform: "scale(1.05)", // Slight scale up effect
                    },
                  }}
                >
                  Add
                </Button>
              </div>
              <div className={styles.descriptionContianer}>
                <h3 style={{ marginTop: "0", marginBottom: "5px" }}>About</h3>
                <Typography variant="body1" color="textSecondary" paragraph>
                  {product.description}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <div style={{ width: "75%" }} className={styles.storingDetailsContainer}>
        <Grid sx={{ display: "flex" }}>
          <Grid style={{ background: "grey" }} xs={12} md={5}>
            <h3>Storing informartion</h3>
            <div>
              <div>10 Days</div>
              <div>Room temp. 19-2</div>
            </div>
            <div>
              <div>3 Weeks</div>
              <div>Refrigrate 16-19 C</div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ProductDetails;
