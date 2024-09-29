import styles from "./mobileApp.module.css";
import appImage from "../../assets/icons/mobile-vector.png";
import { Typography } from "@mui/material";
export default function MobileAppContainer() {
  return (
    <div className={styles.topContainer}>
      <div>
        <img src={appImage} alt="app" width={300} />
      </div>
      <div className={styles.downloadAppRightContainer}>
        <Typography gutterBottom variant="h5" component="div" maxWidth="220px">
          Download the APP and get FLAT 20% Off on 1st Order
        </Typography>
        <button className={styles.downloadAppButton}>Download Origin</button>
      </div>
    </div>
  );
}
