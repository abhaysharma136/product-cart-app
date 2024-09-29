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
          <Typography gutterBottom variant="h2" component="div">
            Where Fresh is a Lifestyle
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
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

      <div className={styles.firstRightContainer}></div>

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
