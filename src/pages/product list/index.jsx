import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import products from "../../products"; // Import the products array
import styles from "./productList.module.css";

const ProductListing = () => {
  const navigate = useNavigate();
  
  // Loading state to control the loader
  const [loading, setLoading] = useState(true);

  // Simulate data fetching with a delay
  useEffect(() => {
    // Simulating API call or data fetching
    const timer = setTimeout(() => {
      setLoading(false); // Stop the loader after 2 seconds
    }, 2000); // You can adjust this delay based on actual API time

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  const handleViewDetails = (index) => {
    navigate(`/product/${index}`); // Navigate to the Product Details page
  };

  return (
    <div style={{ padding: "20px" }}>
      {loading ? (
        // Display the loader when loading is true
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
          <CircularProgress />
        </Box>
      ) : (
        // Display the products when loading is false
        <Grid container spacing={3}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions className={styles.buttonContainer}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleViewDetails(index)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ProductListing;
