import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";

const SuccessPage = () => {
  // Loading state to control the loader
  const [loading, setLoading] = useState(true);

  // Selecting the order details from Redux store
  const orderItems = useSelector((state) => state.cart.items); // Assuming the order items are in the Redux state

  useEffect(() => {
    // Simulate loading with a delay
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after data is loaded
    }, 1000); // Simulate a delay of 1 second

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  // Function to calculate the total amount safely
  const calculateTotalAmount = () => {
    if (Array.isArray(orderItems) && orderItems.length > 0) {
      return orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    }
    return 0;
  };

  return (
    <Box
      sx={{
        padding: "20px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
      ) : orderItems.length === 0 ? (
        <Typography variant="h4" gutterBottom>
          No order details available.
        </Typography>
      ) : (
        <>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "green", fontWeight: "bold" }}
          >
            Thank You for Your Order!
          </Typography>

          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>

          <Divider sx={{ width: "100%", marginBottom: 2 }} />

          {orderItems.map((item) => (
            <Card
              key={item.id}
              sx={{
                marginBottom: 2,
                padding: 2,
                width: "100%",
                maxWidth: "500px",
                borderRadius: "15px",
                boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                "&:hover": {
                  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                    marginRight: "20px",
                  }}
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "500" }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body1">
                    Price: ${item.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body1">Quantity: {item.quantity}</Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}

          <Divider sx={{ width: "100%", marginTop: 2, marginBottom: 2 }} />

          <Typography
            variant="h5"
            sx={{
              marginTop: "20px",
              fontWeight: "600",
              color: "#2e7d32",
              border: "1px solid #2e7d32",
              padding: "10px 20px",
              borderRadius: "10px",
            }}
          >
            Total Cost: ${calculateTotalAmount().toFixed(2)}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default SuccessPage;
