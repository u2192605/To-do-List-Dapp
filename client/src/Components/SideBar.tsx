// import './Common.css'
import styles from "./styles/SideBar.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Search } from "./Search";

export const SideBar = () => {
  return (
    <div className={styles.sideBar}>
      <nav className={styles.navMenu}>
        <Link to={"categories"} className={styles.navigationLink}>
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </Link>
        <Link to={""} className={styles.navigationLink}>
          <FontAwesomeIcon icon={faUser} />
          <span>Profile</span>
        </Link>
        <Link to={""} className={styles.navigationLink}>
          <FontAwesomeIcon icon={faGear} />
          <span>Setting</span>
        </Link>
      </nav>
    </div>
  );
};
