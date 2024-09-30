import { Typography } from "@mui/material";
import styles from "./first.module.css";
import avacadoIcon from "../../assets/icons/fruit.png";
import clockIcon from "../../assets/icons/circular-alarm-clock-tool.png";
import truck from "../../assets/icons/shipping-truck32.png";
export default function FirstComponent() {
  return (
    <div className={styles.topContainer}>
      <div className={styles.firstLeftContainer}>
        <div className={styles.innerLeftDiv}>
          <Typography gutterBottom variant="h2">
            Where Fresh is a Lifestyle
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            className={styles.leftInnerDivSubtext}
          >
            Join us, elevate meals, support local farmers, and reduce food
            waste.
          </Typography>
          <div>
            <button className={styles.shopNowButton}>Shop Now</button>
            <button className={styles.chooseFreshButton}>
              Choose fresh now!
            </button>
          </div>
        </div>
      </div>

      <div className={styles.firstRightContainer}>
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/047/830/714/small_2x/a-vibrant-assortment-of-fresh-vegetables-including-peppers-onions-lettuce-broccoli-tomatoes-corn-and-garlic-arranged-on-a-white-background-png.png"
          alt="vegetableImage"
          className={styles.firstRightImageContainer}
        />
      </div>

      <div className={styles.bottomDiv}>
        <div className={styles.bottomDivIconDiv}>
          <Typography className={styles.bottomDivText}>
            More then 500 products
          </Typography>
          <div className={styles.imageContainer}>
            <img src={avacadoIcon} alt="fruit" className={styles.imageTag} />
          </div>
        </div>
        <div className={styles.bottomDivIconDiv}>
          <Typography className={styles.bottomDivText}>
            Priority Deleveries
          </Typography>
          <div className={styles.imageContainer}>
            <img src={clockIcon} alt="clock" className={styles.imageTag} />
          </div>
        </div>
        <div className={styles.bottomDivIconDiv}>
          <Typography className={styles.bottomDivText}>
            Easy Refunds/Returns
          </Typography>
          <div className={styles.bottomDivIconDiv}>
            <img src={truck} alt="truck" className={styles.imageTag2} />
          </div>
        </div>
      </div>
    </div>
  );
}
