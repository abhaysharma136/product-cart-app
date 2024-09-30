import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateQuantity } from "../../redux/cartSlice";
import { Button, Typography, CircularProgress } from "@mui/material";
import products from "../../products";
import { useEffect, useState } from "react";
import styles from "./productDetails.module.css";
import AddIcon from "@mui/icons-material/Add";
import badge1 from "../../assets/icons/badge1.png";
import badge2 from "../../assets/icons/badge2.png";
const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const product = products.find((prod) => prod.id == productId);

  const cart = useSelector((state) => state.cart.items);
  const existingItem = cart.find((item) => item.id === productId);

  const handleCheckout = () => {
    if (existingItem) {
      dispatch(
        updateQuantity({ id: productId, quantity: existingItem.quantity + 1 })
      );
    } else {
      dispatch(addItem({ ...product, quantity: 1 }));
    }
  };

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <div>
        <div className={styles.innerMainContainer}>
          <div className={styles.productImageContainer}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
          </div>
          <div className={styles.productDetailsContainer}>
            <h6 className={styles.breadcrumb}>Home / vegetables / onions</h6>
            <h3 className={styles.productName}>{product.name}</h3>
            <h4 className={styles.productSubtitle}>Geeru gundu badenekaayi</h4>
            <div className={styles.priceContainer}>
              <div className={styles.priceValueContainer}>
                <div className={styles.buttonPriceContainer}>
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
                  className={styles.addToCartButton}
                  endIcon={<AddIcon />}
                >
                  Add
                </Button>
              </div>
            </div>
            <div className={styles.descriptionContainer}>
              <h3>About</h3>
              <Typography
                variant="body1"
                color="textSecondary"
                paragraph
                sx={{ fontFamily: "cursive" }}
              >
                {product.description}
              </Typography>
            </div>
          </div>
        </div>
        <div className={styles.storingInfoContainer}>
          <div className={styles.storingInfoDetails}>
            <h3>Storing Information</h3>
            <div className={styles.storingInfoItem}>
              <div className={styles.storingInfoCard}>
                <div className={styles.additionalImageContainer}>
                  <img
                    src={badge1}
                    alt="badge1"
                    width={30}
                    className={styles.additionalImage}
                  />
                </div>
                <div>
                  <div>10 Days</div>
                  <div>Room temp. 19-2</div>
                </div>
              </div>
              <div className={styles.storingInfoCard}>
                <div className={styles.additionalImageContainer}>
                  <img
                    src={badge2}
                    alt="badge2"
                    width={30}
                    className={styles.additionalImage}
                  />
                </div>
                <div>
                  <div>3 Weeks</div>
                  <div>Refrigerate 16-19 C</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
