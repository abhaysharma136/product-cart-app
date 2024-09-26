import { useEffect, useState } from "react";
import { Typography, Card, CardContent, Box, Divider, CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";

const SuccessPage = () => {
  const { state } = useLocation();
  const { orderDetails } = state || { orderDetails: null };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const calculateTotalAmount = () => {
    if (orderDetails && Array.isArray(orderDetails.items)) {
      return orderDetails.total;
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
      ) : !orderDetails ? (
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

          {orderDetails.items.map((item) => (
            <Card
              key={item.id}
              sx={{
                marginBottom: 2,
                padding: 2,
                width: "100%",
                maxWidth: "500px",
                borderRadius: "15px",
                boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
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
