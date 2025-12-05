import {
  Layout,
  Row,
  Col,
  Card,
  Button,
  Input,
  Tooltip,
  Flex,
  Dropdown,
} from "antd";
import { useNavigate } from "react-router-dom";
import styles from "../HomePage/page.module.css";
import {
  DownOutlined,
  InfoCircleOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

const items = [
  {
    label: "1st menu item",
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "2nd menu item",
    key: "2",
    icon: <UserOutlined />,
  },
  {
    label: "3rd menu item",
    key: "3",
    icon: <UserOutlined />,
    danger: true,
  },
  {
    label: "4rd menu item",
    key: "4",
    icon: <UserOutlined />,
    danger: true,
    disabled: true,
  },
];
const handleButtonClick = (e) => {
  console.log("click left button", e);
};

const handleMenuClick = e => {
  console.log('click', e);
};

const menuProps = {
  items,
  onClick: handleMenuClick,
};

export default function Bookings() {
  const navigate = useNavigate();

  return (
    <Layout className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>Luxury Hotels</div>
          <nav className={styles.nav}>
            <a href="#bookings">Đặt phòng</a>
            <a href="#my">My Bookings</a>
            <Button
              type="primary"
              style={{ backgroundColor: "#b89968", borderColor: "#b89968" }}
              onClick={() => navigate("/")}
            >
              Quay lại
            </Button>
          </nav>
        </div>
      </header>

      <Content style={{ padding: "80px 24px" }}>
        <section id="bookings" className={styles.roomsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Danh sách phòng</h2>
            <p className={styles.sectionDesc}>Danh sách các phòng hiện có</p>
          </div>
          <Row className={styles.roomFilter}>
            <Col span={12}>
              <Input
                placeholder="Enter name"
                prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                suffix={
                  <Tooltip title="Extra information">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
              />
            </Col>
            <Col span={12}>
              <Dropdown menu={menuProps}>
                <Button
                  onClick={handleButtonClick}
                  icon={<DownOutlined />}
                  iconPlacement="end"
                >
                  Filter
                </Button>
              </Dropdown>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            {[1, 2, 3].map((i) => (
              <Col key={i} xs={24} sm={12} lg={8}>
                <Card className={styles.roomCard} hoverable>
                  <h3>Booking #{i}</h3>
                  <p>Phòng Deluxe - 2 khách</p>
                  <div style={{ marginTop: 12 }}>
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "#b89968",
                        borderColor: "#b89968",
                      }}
                    >
                      Chi tiết
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      </Content>

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
    </Layout>
  );
}
