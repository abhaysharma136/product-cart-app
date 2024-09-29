import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Drawer,
  Box,
  InputBase,
  Typography,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationArrow from "../../assets/icons/location-arrow.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import CartPage from "../../pages/cart page/index.jsx";
import styles from "./navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer state

  // Access totalItems from Redux store
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  // Function to open and close the drawer
  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <AppBar position="static" className={styles.navBar}>
      <Toolbar className={styles.toolbar}>
        {/* Logo */}
        <div className={styles.logoContainer} onClick={() => navigate("/")}>
          <Typography className={styles.logo} variant="h4">
            Origin
          </Typography>
        </div>
        
        {/* Location - hidden on smaller devices */}
        <div className={styles.locationContainer}>
          <div className={styles.locationIconDiv}>
            <img src={LocationArrow} alt="locationIcon" width={20} />
            <Typography variant="h5">Sodepur</Typography>
          </div>
          <Typography>Sodepur, Appareddipalya, Indiran..</Typography>
        </div>

        {/* Search Bar */}
        <div className={styles.searchBar}>
          <InputBase
            placeholder="Search products"
            className={styles.searchInput}
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton className={styles.searchIcon}>
            <SearchIcon />
          </IconButton>
        </div>

        {/* Account and Cart icons with divider */}
        <div className={styles.iconContainer}>
          <IconButton edge="end" color="inherit" aria-label="account">
            <AccountCircleIcon />
          </IconButton>
          <div className={styles.iconDivider}></div> {/* Horizontal Line */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="cart"
            onClick={toggleDrawer(true)}
          >
            <Badge badgeContent={totalItems} color="error">
              <ShoppingBagIcon />
            </Badge>
          </IconButton>
        </div>

        {/* Drawer for the Cart */}
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
        >
          <Box sx={{ width: { xs: "100vw", sm: "500px" } }} role="presentation">
            <CartPage toggleDrawer={toggleDrawer} />
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
