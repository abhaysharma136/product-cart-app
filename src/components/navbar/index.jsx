import { AppBar, Toolbar, IconButton, Typography, Badge } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import styles from "./navbar.module.css";
import { useSelector } from "react-redux";
const Navbar = () => {
  const navigate = useNavigate();
  // Access totalItems from Redux store
  const totalItems = useSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));

  // Function to handle back button click
  const handleBackClick = () => {
    navigate('/'); // This will navigate to the previous page
  };

  return (
    <AppBar position="static" className={styles.navBar}>
      <Toolbar>
        {/* Back Button */}
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleBackClick}
          aria-label="back"
        >
          <ArrowBackIcon />
        </IconButton>

        {/* Title or Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Store
        </Typography>

        {/* Cart Icon with Badge */}
        <IconButton edge="end" color="inherit" aria-label="cart">
          <Link to="/cart">
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </Link>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
// Define PropTypes for the Navbar component
Navbar.propTypes = {
  cartItemCount: PropTypes.number.isRequired, // cartItemCount must be a number and required
};
export default Navbar;
