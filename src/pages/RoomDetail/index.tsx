import { roomService } from "@/services/roomService"
import { ArrowLeftOutlined, LeftOutlined, RightOutlined, RotateLeftOutlined, RotateRightOutlined, SwapOutlined, UndoOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons"
import { Button, Card, Col, DatePicker, Divider, Form, Image, InputNumber, Layout, message, Row, Space } from "antd"
import { MapPin, Wifi as WiFi } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import styles from "./booking.module.css"
import { toVND } from "lib/utils"

const { Content } = Layout

interface Partner {
    partnerId: number
    name: string
    contactInfo: string
}
interface Accommodation {
    accommodationId: number
    partner: Partner
    name: string
    accommodationType: string
    description: string
    city: string
    address: string
}

interface Room {
    id: number
    accommodation: Accommodation
    name: string
    typeRoom: number
    price: number
    active: number
    description: string
    amenities: string
    policy: string
}

export default function BookingDetailPage() {
    const { roomId: roomIdParam } = useParams()
    const navigate = useNavigate()
    const [nights, setNights] = useState(1)
    const [guests, setGuests] = useState(1)
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const [room, setRoom] = useState<Room>()
    const [current, setCurrent] = useState(0);
    const images = ["/double-room-hotel.jpg", "/family-room-hotel.jpg", "/luxury-suite-hotel.jpg", "/luxury-spa-relaxation.jpg"];

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await roomService.getRoomById(parseInt(roomIdParam as string))
                if (response.success) {
                    setRoom(response.data)
                } else {
                    message.error("Không tìm thấy phòng")
                }
            } catch (error) {
                message.error("Lỗi khi tải thông tin phòng")
            } finally {
                setLoading(false)
            }
        }
        fetchRoom()
    }, [roomIdParam])

    if (!room) {
        return <div>Phòng không tồn tại</div>
    }

    const totalPrice = room?.price || 0 * nights

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
                            <a
                                onClick={() => navigate(-1)}
                                style={{ color: '#fff', textDecoration: "none" }}
                            >
                                <ArrowLeftOutlined /> Quay lại
                            </a>

                        </Button>


                    </nav>
                </div>
            </header>

            <Content className={styles.content}>
                <div className={styles.container}>
                    {/* Breadcrumb */}
                    <div style={{ marginBottom: "24px", color: "#999", fontSize: "14px" }}>
                        <a
                            onClick={() => navigate(-1)}
                            style={{ color: "#b89968", textDecoration: "none", cursor: "pointer" }}
                        >
                            Danh sách phòng
                        </a>
                        <span> / </span>
                        <span>{room?.name}</span>
                    </div>

                    {/* Main Content */}
                    <Row gutter={[32, 32]}>
                        {/* Left - Images & Details */}
                        <Col xs={24} lg={14}>
                            <div className={styles.imageGallery}>
                                <Image.PreviewGroup
                                    preview={{
                                        actionsRender: (
                                            _,
                                            {
                                                transform: { scale },
                                                actions: {
                                                    onActive,
                                                    onFlipY,
                                                    onFlipX,
                                                    onRotateLeft,
                                                    onRotateRight,
                                                    onZoomOut,
                                                    onZoomIn,
                                                    onReset,
                                                    
                                                },
                                            },
                                        ) => (
                                            <Space size={36} className="toolbar-wrapper">
                                                <LeftOutlined disabled={current === 0} onClick={() => onActive?.(-1)} />
                                                <RightOutlined
                                                    disabled={current === images.length - 1}
                                                    onClick={() => onActive?.(1)}
                                                />
                                                <SwapOutlined rotate={90} onClick={onFlipY} />
                                                <SwapOutlined onClick={onFlipX} />
                                                <RotateLeftOutlined onClick={onRotateLeft} />
                                                <RotateRightOutlined onClick={onRotateRight} />
                                                <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                                                <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                                                <UndoOutlined onClick={onReset} />
                                            </Space>
                                        ),
                                        onChange: (index) => {
                                            setCurrent(index);
                                        },
                                    }}
                                >
                                    <Image
                                        alt={room.name}
                                        className="image-no-hover-cover"
                                        src={"/double-room-hotel.jpg"}
                                        style={{ width: "100%", borderRadius: "4px"}}
                                    />

                                    <Row gutter={[12, 12]} style={{ marginTop: "16px"  }}>
                                        {images.map((item, index) => (
                                            <Col key={index} xs={8} sm={6}>
                                                <Image alt={`image-${index}`} key={item} style={{
                                                    width: "150px",
                                                    height: "80px",
                                                    objectFit: "cover",
                                                    borderRadius: "4px",
                                                    cursor: "pointer",
                                                }}
                                                    src={item || "/placeholder.svg"} />
                                            </Col>
                                        ))}
                                    </Row>
                                </Image.PreviewGroup>
                            </div>

                            {/* Room Info */}
                            <Card style={{ marginTop: "24px" }}>
                                <h1 className={styles.roomTitle}>{room.name}</h1>

                                <div className={styles.ratingBar} style={{ marginBottom: "16px" }}>
                                    <span style={{ color: "#b89968", fontWeight: "bold", fontSize: "18px" }}>⭐ 4.8 </span>
                                    <span style={{ color: "#999", marginLeft: "12px" }}>({385} đánh giá)</span>
                                </div>

                                <div style={{ marginBottom: "24px", color: "#666", fontSize: "14px", lineHeight: "1.8" }}>
                                    <div className={styles.detail}>
                                        <MapPin size={18} style={{ color: "#b89968" }} />
                                        <div>
                                            <div style={{ fontWeight: "bold" }}>{room.accommodation.city}</div>
                                            <div style={{ color: "#999", fontSize: "12px" }}>{room.accommodation.address}</div>
                                        </div>
                                    </div>
                                </div>

                                <Divider />

                                <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px", color: "#1a472a" }}>
                                    Mô tả phòng
                                </h3>
                                <p style={{ color: "#666", lineHeight: "1.8", marginBottom: "16px" }}>{room.description}</p>

                                <Divider />

                                <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px", color: "#1a472a" }}>
                                    Tiện nghi
                                </h3>
                                <Row gutter={[16, 16]}>
                                    {room.amenities.split(",").map((amenity, idx) => (
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
                                <p style={{ color: "#666", fontSize: "14px" }}>{room.policy}</p>
                            </Card>
                        </Col>

                        {/* Right - Booking Form */}
                        <Col xs={24} lg={10}>
                            <Card className={styles.bookingCard} style={{ position: "sticky", top: "80px" }}>
                                <div style={{ marginBottom: "16px" }}>
                                    <div style={{ fontSize: "24px", fontWeight: "bold", color: "#b89968" }}>
                                        {toVND(room.price)}
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
                                            max={4}
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
                                            <span>{toVND(room.price * nights)}</span>
                                        </div>
                                        <div className={styles.priceRow}>
                                            <span>Thuế & phí</span>
                                            <span>{toVND(Math.round(room.price * nights * 0.1))}</span>
                                        </div>
                                        <div className={styles.priceFinal}>
                                            <span>Tổng cộng</span>
                                            <span>{toVND(totalPrice + Math.round(room.price * nights * 0.1))}</span>
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
