import { Col, Row } from "antd";
import styles from "./page.module.css";

export default function HeaderPage() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <span
            style={{ fontSize: "24px", fontWeight: "bold", color: "#1a472a" }}
          >
            Luxury Hotels
          </span>
        </div>
        <nav className={styles.nav}>
          <Link href="/" style={{ color: "#333", textDecoration: "none" }}>
            Trang chủ
          </Link>
          <Link
            href="/bookings"
            style={{
              color: "#b89968",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Đặt phòng
          </Link>
          <Button
            type="primary"
            style={{ backgroundColor: "#b89968", borderColor: "#b89968" }}
          >
            Tài khoản
          </Button>
        </nav>
      </div>
    </header>
  );
}
