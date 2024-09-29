import { Box, Grid, Typography, Select, MenuItem } from "@mui/material";
import { useState } from "react";
export default function AnnouncementBar() {
  const [age, setAge] = useState(10);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#2eb62e",
        display: "flex",
        padding: "5px 0",
        color: "white",
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={5}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Download the App and get 20% Off on 1st Order
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-end" },
          }}
        >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
            sx={{
              borderRadius: "30px",
              color: "white",
              height: "40px",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 1)",
              },
            }}
          >
            <MenuItem value={10}>karamangala, 560068</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </Box>
  );
}
