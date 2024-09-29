import { useRef } from "react";
import "./ProductCarousel.css"; // Import the CSS for styling
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";
const ProductCarousel = ({ products, handleClick }) => {
  const carouselRef = useRef(null);
  let isDragging = false;
  let startX;
  let scrollLeft;

  // Function to handle left scroll using button
  const scrollLeftFunc = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= 200; // Change value to set the scroll distance
    }
  };

  // Function to handle right scroll using button
  const scrollRightFunc = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += 200; // Change value to set the scroll distance
    }
  };

  // Function to handle dragging
  const startDrag = (e) => {
    isDragging = true;
    startX = e.pageX || e.touches[0].pageX; // For touch devices
    scrollLeft = carouselRef.current.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragging) return;
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - startX) * 1.5; // Adjust drag sensitivity
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const endDrag = () => {
    isDragging = false;
  };

  return (
    <div className="carousel-container">
      <button className="scroll-button left" onClick={scrollLeftFunc}>
        <ArrowBackIosIcon />
      </button>

      <div
        className="carousel"
        ref={carouselRef}
        onMouseDown={startDrag}
        onMouseMove={dragging}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={startDrag}
        onTouchMove={dragging}
        onTouchEnd={endDrag}
      >
        {products.map((product, index) => (
          <div key={index} className="carouselDataTopContainer">
            <div className="carousel-item">
              <img
                src={product.image}
                alt={product.name}
                className="carousel-image"
              />
            </div>
            <p>{product.name}</p>
            <h6>{product.description}</h6>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p className="carouselProductWeight">500g</p>
                <p className="carouselProductPrice">Rs{product?.price}</p>
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleClick(index)}
                className="addToCartButton"
                endIcon={<AddIcon />}
              >
                Add
              </Button>
            </div>
          </div>
        ))}
      </div>

      <button className="scroll-button right" onClick={scrollRightFunc}>
        <ArrowForwardIosIcon />
      </button>
    </div>
  );
};
ProductCarousel.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default ProductCarousel;
