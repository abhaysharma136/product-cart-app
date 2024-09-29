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
import FirstComponent from "../../components/first Component";
import Layout2 from "../../components/layout2";
import MobileAppContainer from "../../components/mobile app";

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
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        // Display the loader when loading is true
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        // Display the products when loading is false
        <Grid container spacing={3}>
          <FirstComponent />
          <Layout2 />
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ maxWidth: 345, borderRadius: 5 }}>
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
                    sx={{
                      borderRadius: 10,
                      background: "black",
                      border: "none",
                      color: "white",
                      padding: "10px 15px",
                      transition: "all 0.3s ease", // Smooth transition for hover effects
                      "&:hover": {
                        backgroundColor: "#333", // Darker shade of black for hover
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Subtle shadow effect
                        transform: "scale(1.05)", // Slight scale up effect
                      },
                    }}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <MobileAppContainer />
    </div>
  );
};

export default ProductListing;
