// Main.js
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.link_form}>
          <h1>Dashboard</h1>
        </Link>

        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className={styles.center_body}>
        <h4>Emplyee Management System</h4>
      </div>

      <aside className={styles.sidebar_container}>
        <div className={styles.sidebar}>
          <ul>
            <li className={styles.list}>
              <Link to="/dashboard" className={styles.link_form}>
                Dashboard
              </Link>
            </li>
            <li className={styles.list}>
              <Link to="/createEmployee" className={styles.link_form}>
                Manage Employees
              </Link>
            </li>
            <li className={styles.list}>
              <Link to="/dashboard" className={styles.link_form}>
                Category
              </Link>
            </li>
            <li className={styles.list}>
              <Link to="/dashboard" className={styles.link_form}>
                Profile
              </Link>
            </li>
            <li className={styles.list}>
              <Link to="/dashboard" className={styles.link_form}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Main;
