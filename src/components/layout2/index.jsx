import { Typography } from "@mui/material";
import styles from "./layout2.module.css";
import freshIcon from "../../assets/icons/healthy-food.png";
import zeroWasteicon from "../../assets/icons/zero-waste.png";
import truckIcon from "../../assets/icons/delivery-truck.png";
import globalIcon from "../../assets/icons/global-economy.png";

export default function Layout2() {
  return (
    <div className={styles.topContainer}>
      <div className={styles.elementContainer}>
        <img src={freshIcon} alt="fresh" />
        <Typography gutterBottom variant="h6" component="div" maxWidth="150px">
          As Fresh as the golden days
        </Typography>
      </div>
      <div className={styles.elementContainer}>
        <img src={zeroWasteicon} alt="zero waste" />
        <Typography gutterBottom variant="h6" component="div" maxWidth="120px">
          Zero Waste Management
        </Typography>
      </div>
      <div className={styles.elementContainer}>
        <img src={truckIcon} alt="supply chain" />
        <Typography gutterBottom variant="h6" component="div" maxWidth="120px">
          Transparent Supply Chain
        </Typography>
      </div>
      <div className={styles.elementContainer}>
        <img src={globalIcon} alt="global sourcing" />
        <Typography gutterBottom variant="h6" component="div" maxWidth="120px">
          Sourced Globally
        </Typography>
      </div>
    </div>
  );
}
