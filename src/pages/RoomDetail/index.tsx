import { Button, Card, Col, DatePicker, Divider, Form, InputNumber, Layout, message, Row } from "antd"
import { MapPin, Wifi as WiFi } from "lucide-react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import styles from "./booking.module.css"

const { Content } = Layout

interface RoomDetails {
  id: number
  name: string
  type: string
  price: number
  rating: number
  reviews: number
  capacity: number
  image: string
  city: string
  address: string
  description: string
  amenities: string[]
  longDescription: string
  images: string[]
  cancellationPolicy: string
}

export default function BookingDetailPage() {
  const { roomId: roomIdParam } = useParams()
  const [nights, setNights] = useState(1)
  const [guests, setGuests] = useState(1)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const roomDetailsMap: Record<number, RoomDetails> = {
    1: {
      id: 1,
      name: "Phòng Deluxe Tiêu Chuẩn",
      type: "Deluxe",
      price: 189,
      rating: 4.8,
      reviews: 342,
      capacity: 2,
      image: "/luxury-hotel-room-deluxe-.jpg",
      city: "TP. Hồ Chí Minh",
      address: "123 Đường Sang Trọng, Quận 1, TP. Hồ Chí Minh",
      description: "Phòng Deluxe tiêu chuẩn với view thành phố tuyệt đẹp",
      amenities: ["WiFi miễn phí", "Điều hòa không khí", "Tivi Smart 55 inch", "Minibar", "Bàn làm việc"],
      longDescription:
        "Khám phá sự thoải mái tối đa trong Phòng Deluxe của chúng tôi. Với diện tích 35m², phòng được thiết kế hiện đại với đầy đủ tiện nghi cao cấp. Giường ngủ vô cùng mềm mại, phòng tắm với bồn tắm và vòi sen massage, không gian sống đích thực cho kỳ nghỉ của bạn.",
      images: ["/luxury-hotel-room-deluxe-.jpg", "/luxury-hotel-room-deluxe-.jpg", "/luxury-hotel-room-deluxe-.jpg"],
      cancellationPolicy: "Có thể hủy miễn phí trước 48 giờ. Sau 48 giờ, sẽ tính phí 50% giá phòng.",
    },
    3: {
      id: 3,
      name: "Phòng Suite Sang Trọng",
      type: "Suite",
      price: 289,
      rating: 4.9,
      reviews: 156,
      capacity: 3,
      image: "/luxury-hotel-suite-room-.jpg",
      city: "TP. Hồ Chí Minh",
      address: "123 Đường Sang Trọng, Quận 1, TP. Hồ Chí Minh",
      description: "Phòng Suite rộng rãi với phòng khách riêng biệt",
      amenities: ["WiFi miễn phí", "Phòng khách", "Bếp mini", "Máy giặt", "Tivi Smart"],
      longDescription:
        "Phòng Suite sang trọng của chúng tôi mang đến trải nghiệm sống đẳng cấp. Với diện tích 60m², gồm phòng ngủ tách biệt và phòng khách rộng rãi. Hoàn hảo cho gia đình hoặc nhóm bạn muốn tận hưởng sự thoải mái tối đa.",
      images: ["/luxury-hotel-suite-room-.jpg", "/luxury-hotel-suite-room-.jpg", "/luxury-hotel-suite-room-.jpg"],
      cancellationPolicy: "Có thể hủy miễn phí trước 72 giờ. Sau 72 giờ, sẽ tính phí 100% giá phòng.",
    },
    5: {
      id: 5,
      name: "Penthouse Hạng Nhất",
      type: "Penthouse",
      price: 589,
      rating: 5.0,
      reviews: 87,
      capacity: 6,
      image: "/luxury-penthouse-suite-.jpg",
      city: "TP. Hồ Chí Minh",
      address: "123 Đường Sang Trọng, Quận 1, TP. Hồ Chí Minh",
      description: "Penthouse hạng nhất với view 360 độ toàn thành phố",
      amenities: ["WiFi miễn phí", "View 360 độ", "Jacuzzi", "Bếp đầy đủ", "Phòng khách rộng lớn"],
      longDescription:
        "Trải nghiệm sống trên những đỉnh cao của sang trọng. Penthouse của chúng tôi có diện tích 120m² với view 360 độ toàn thành phố. Được thiết kế bởi những kiến trúc sư nổi tiếng, mang đến không gian sống không có gì so sánh.",
      images: ["/luxury-penthouse-suite-.jpg", "/luxury-penthouse-suite-.jpg", "/luxury-penthouse-suite-.jpg"],
      cancellationPolicy: "Có thể hủy miễn phí trước 7 ngày. Sau 7 ngày, sẽ tính phí 50% giá phòng.",
    },
  }

  if (!roomIdParam) {
    return <div>Phòng không tồn tại</div>
  }
  
  const roomId = Number.parseInt(roomIdParam || "1", 10)
  const room = roomDetailsMap[roomId] || roomDetailsMap[1]
  const totalPrice = room.price * nights

  const handleBooking = async () => {
    try {
      setLoading(true)
      await form.validateFields()
      message.success("Đặt phòng thành công! Vui lòng kiểm tra email xác nhận.")
      // In real app, send data to backend
    } catch (error) {
      message.error("Vui lòng điền đầy đủ thông tin")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout className={styles.layout}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <span style={{ fontSize: "24px", fontWeight: "bold", color: "#1a472a" }}>Luxury Hotels</span>
          </div>
          <nav className={styles.nav}>
            <Link to="/" style={{ color: "#333", textDecoration: "none" }}>
              Trang chủ
            </Link>
            <Link to="/bookings" style={{ color: "#333", textDecoration: "none" }}>
              Đặt phòng
            </Link>
            <Button type="primary" style={{ backgroundColor: "#b89968", borderColor: "#b89968" }}>
              Tài khoản
            </Button>
          </nav>
        </div>
      </header>

      <Content className={styles.content}>
        <div className={styles.container}>
          {/* Breadcrumb */}
          <div style={{ marginBottom: "24px", color: "#999", fontSize: "14px" }}>
            <Link to="/bookings" style={{ color: "#b89968", textDecoration: "none" }}>
              Danh sách phòng
            </Link>
            <span> / </span>
            <span>{room.name}</span>
          </div>

          {/* Main Content */}
          <Row gutter={[32, 32]}>
            {/* Left - Images & Details */}
            <Col xs={24} lg={14}>
              <div className={styles.imageGallery}>
                <img
                  src={room.image || "/placeholder.svg"}
                  alt={room.name}
                  style={{ width: "100%", borderRadius: "8px", marginBottom: "16px" }}
                />
                <Row gutter={[8, 8]}>
                  {room.images.map((img, idx) => (
                    <Col key={idx} xs={8} sm={6}>
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`${room.name} ${idx + 1}`}
                        style={{
                          width: "100%",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              </div>

              {/* Room Info */}
              <Card style={{ marginTop: "24px" }}>
                <h1 className={styles.roomTitle}>{room.name}</h1>

                <div className={styles.ratingBar} style={{ marginBottom: "16px" }}>
                  <span style={{ color: "#b89968", fontWeight: "bold", fontSize: "18px" }}>⭐ {room.rating}</span>
                  <span style={{ color: "#999", marginLeft: "12px" }}>({room.reviews} đánh giá)</span>
                </div>

                <div style={{ marginBottom: "24px", color: "#666", fontSize: "14px", lineHeight: "1.8" }}>
                  <div className={styles.detail}>
                    <MapPin size={18} style={{ color: "#b89968" }} />
                    <div>
                      <div style={{ fontWeight: "bold" }}>{room.city}</div>
                      <div style={{ color: "#999", fontSize: "12px" }}>{room.address}</div>
                    </div>
                  </div>
                </div>

                <Divider />

                <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px", color: "#1a472a" }}>
                  Mô tả phòng
                </h3>
                <p style={{ color: "#666", lineHeight: "1.8", marginBottom: "16px" }}>{room.longDescription}</p>

                <Divider />

                <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px", color: "#1a472a" }}>
                  Tiện nghi
                </h3>
                <Row gutter={[16, 16]}>
                  {room.amenities.map((amenity, idx) => (
                    <Col key={idx} xs={12} sm={8}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#666" }}>
                        <WiFi size={16} style={{ color: "#b89968" }} />
                        <span>{amenity}</span>
                      </div>
                    </Col>
                  ))}
                </Row>

                <Divider />

                <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px", color: "#1a472a" }}>
                  Chính sách hủy
                </h3>
                <p style={{ color: "#666", fontSize: "14px" }}>{room.cancellationPolicy}</p>
              </Card>
            </Col>

            {/* Right - Booking Form */}
            <Col xs={24} lg={10}>
              <Card className={styles.bookingCard} style={{ position: "sticky", top: "80px" }}>
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#b89968" }}>
                    ${room.price}
                    <span style={{ fontSize: "14px", color: "#999" }}> / đêm</span>
                  </div>
                </div>

                <Divider />

                <Form form={form} layout="vertical">
                  {/* Check-in Date */}
                  <Form.Item label="Ngày nhận phòng" required>
                    <DatePicker size="large" style={{ width: "100%" }} />
                  </Form.Item>

                  {/* Check-out Date */}
                  <Form.Item label="Ngày trả phòng" required>
                    <DatePicker size="large" style={{ width: "100%" }} />
                  </Form.Item>

                  {/* Nights */}
                  <Form.Item label="Số đêm">
                    <InputNumber
                      min={1}
                      max={30}
                      value={nights}
                      onChange={(value) => setNights(value || 1)}
                      size="large"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>

                  {/* Guests */}
                  <Form.Item label="Số khách">
                    <InputNumber
                      min={1}
                      max={room.capacity}
                      value={guests}
                      onChange={(value) => setGuests(value || 1)}
                      size="large"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>

                  <Divider />

                  {/* Price Breakdown */}
                  <div style={{ marginBottom: "16px" }}>
                    <div className={styles.priceRow}>
                      <span>Giá phòng ({nights} đêm)</span>
                      <span>${room.price * nights}</span>
                    </div>
                    <div className={styles.priceRow}>
                      <span>Thuế & phí</span>
                      <span>${Math.round(room.price * nights * 0.1)}</span>
                    </div>
                    <div className={styles.priceFinal}>
                      <span>Tổng cộng</span>
                      <span>${totalPrice + Math.round(room.price * nights * 0.1)}</span>
                    </div>
                  </div>

                  <Button
                    type="primary"
                    size="large"
                    block
                    loading={loading}
                    onClick={handleBooking}
                    style={{ backgroundColor: "#b89968", borderColor: "#b89968" }}
                  >
                    Đặt Phòng Ngay
                  </Button>

                  <div style={{ marginTop: "16px", color: "#999", fontSize: "12px", textAlign: "center" }}>
                    Bạn sẽ không bị tính phí cho đến khi xác nhận
                  </div>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  )
}
