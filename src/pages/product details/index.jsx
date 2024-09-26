import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateQuantity } from "../../redux/cartSlice";
import { Button, Typography, Card, CardContent } from "@mui/material";
import products from "../../products";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const dispatch = useDispatch();

  // Find the product from the products array
  const product = products.find((prod) => prod.id == productId);

  // Get the current cart items from the Redux store
  const cart = useSelector((state) => state.cart.items);
  const existingItem = cart.find((item) => item.id === productId);

  const handleCheckout = () => {
    if (existingItem) {
      // If the item is already in the cart, update the quantity
      dispatch(
        updateQuantity({ id: productId, quantity: existingItem.quantity + 1 })
      );
    } else {
      // If the item is not in the cart, add it
      dispatch(addItem({ ...product, quantity: 1 }));
    }
    navigate("/cart");
  };

  return (
    <Card style={{ margin: "20px" }}>
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <img src={product.image} alt={product.name} width="100%" />
        <Typography variant="body1">${product.price}</Typography>
        <Typography variant="body2">{product.description}</Typography>
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
