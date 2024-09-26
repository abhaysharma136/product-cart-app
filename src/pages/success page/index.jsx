import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
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
    <div style={{ padding: "20px", textAlign: "center" }}>
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
          <Typography variant="h4" gutterBottom>
            Thank you for your order!
          </Typography>

          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>

          {orderItems.map((item) => (
            <Card key={item.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <img
                  src={item.image}
                  alt={item.name}
                  width="100"
                  height="100"
                />
                <Typography variant="body1">
                  Price: ${item.price.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="body1">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          ))}

          <Typography variant="h5" sx={{ marginTop: "20px" }}>
            Total Cost: ${calculateTotalAmount().toFixed(2)}
          </Typography>
        </>
      )}
    </div>
  );
};

export default SuccessPage;
