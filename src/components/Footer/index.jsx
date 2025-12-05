import { Col, Row } from "antd";
import styles from "./page.module.css";


export default function FooterPage() {
  return (
    <footer className={styles.footer}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} lg={6}>
            <h4 style={{ color: "#b89968" }}>Về chúng tôi</h4>
            <p style={{ color: "#fff" }}>
              Khách sạn 5 sao hàng đầu với dịch vụ hoàn hảo và tiện nghi cao
              cấp.
            </p>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <h4 style={{ color: "#b89968" }}>Liên hệ</h4>
            <div style={{ color: "#fff" }}>
              <div>📞 +84 123 456 789</div>
              <div>📧 info@luxuryhotel.vn</div>
            </div>
          </Col>
        </Row>
      </div>
    </footer>
  );
}
