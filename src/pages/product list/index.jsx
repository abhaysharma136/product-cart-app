import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, Typography, CircularProgress, Box } from "@mui/material";
import products from "../../products";
import styles from "./productList.module.css";
import FirstComponent from "../../components/first Component";
import Layout2 from "../../components/layout2";
import MobileAppContainer from "../../components/mobile app";
import ProductCarousel from "../../components/product Scroller";

const ProductListing = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleViewDetails = (index) => {
    navigate(`/product/${index}`);
  };

  return (
    <div
      style={{
        padding: "20px 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      {loading ? (
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
        <>
          <Grid container spacing={3}>
            <FirstComponent />
            <Layout2 />
          </Grid>

          <Card
            sx={{
              width: "90%",
              margin: "15px 0",
              padding: "15px",
              borderRadius: "20px",
            }}
          >
            <div className={styles.productDisplayCardInnerDiv}>
              <Typography variant="h4">Popular Produce</Typography>
              <div className={styles.productDisplayToggleContainer}>
                <div className={styles.toggle1}>Get it today</div>
                <div className={styles.toggle2}>Get it tomorrow</div>
              </div>
            </div>
            <ProductCarousel
              products={products}
              handleClick={handleViewDetails}
            />
          </Card>

          <MobileAppContainer />
        </>
      )}
    </div>
  );
};

export default ProductListing;
