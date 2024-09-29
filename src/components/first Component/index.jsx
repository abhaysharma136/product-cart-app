import { Typography } from "@mui/material";
import styles from "./first.module.css";
import avacadoIcon from "../../assets/icons/fruit.png";
import clockIcon from "../../assets/icons/circular-alarm-clock-tool.png";
import truck from "../../assets/icons/pretzel-truck.png";
export default function FirstComponent() {
  return (
    <div className={styles.topContainer}>
      {/* Left Section */}
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

      {/* Right Section */}
      <div className={styles.firstRightContainer}></div>

      {/* Bottom Section */}
      <div className={styles.bottomDiv}>
        <div className={styles.bottomDivIconDiv}>
          <Typography>More then 500 products</Typography>
          <div>
            <img src={avacadoIcon} alt="fruit" width={20} />
          </div>
        </div>
        <div className={styles.bottomDivIconDiv}>
          <Typography>Priority Deleveries</Typography>
          <div>
            <img src={clockIcon} alt="clock" width={20} />
          </div>
        </div>
        <div className={styles.bottomDivIconDiv}>
          <Typography>Easy Refunds/Returns</Typography>
          <div>
            <img src={truck} alt="truck" width={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
