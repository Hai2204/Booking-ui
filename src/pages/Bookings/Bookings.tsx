"use client"

import { useState, useMemo } from "react"
import { Layout, Row, Col, Card, Button, Input, Select, Space, Badge, Pagination } from "antd"
import { Search, MapPin, Users, Star } from "lucide-react"
import Link from "next/link"
import styles from "./bookings.module.css";
import FooterPage from "@/components/Footer";

const { Content } = Layout

interface Room {
    id: number
    name: string
    type: string
    price: number
    rating: number
    reviews: number
    capacity: number
    image: string
    city: string
    amenities: string[]
}

export default function BookingsPage() {
    const [searchText, setSearchText] = useState("")
    const [filterType, setFilterType] = useState("all")
    const [sortBy, setSortBy] = useState("popular")
    const [currentPage, setCurrentPage] = useState(1)

    const rooms: Room[] = [
        {
            id: 1,
            name: "Phòng Deluxe Tiêu Chuẩn",
            type: "Deluxe",
            price: 189,
            rating: 4.8,
            reviews: 342,
            capacity: 2,
            image: "/luxury-restaurant-dining.jpg",
            city: "TP. Hồ Chí Minh",
            amenities: ["WiFi", "Điều hòa", "Tivi Smart"],
        },
        {
            id: 2,
            name: "Phòng Deluxe Premium",
            type: "Deluxe",
            price: 229,
            rating: 4.9,
            reviews: 289,
            capacity: 2,
            image: "/luxury-spa-relaxation.jpg",
            city: "TP. Hồ Chí Minh",
            amenities: ["WiFi", "Bàn làm việc", "Minibar"],
        },
        {
            id: 3,
            name: "Phòng Suite Sang Trọng",
            type: "Suite",
            price: 289,
            rating: 4.9,
            reviews: 156,
            capacity: 3,
            image: "/luxury-suite-room.jpg",
            city: "TP. Hồ Chí Minh",
            amenities: ["WiFi", "Phòng khách", "Bếp mini"],
        },
        {
            id: 4,
            name: "Phòng Suite Royal",
            type: "Suite",
            price: 349,
            rating: 5.0,
            reviews: 123,
            capacity: 4,
            image: "/family-room-hotel.jpg",
            city: "TP. Hồ Chí Minh",
            amenities: ["WiFi", "Phòng khách riêng", "Bếp đầy đủ"],
        },
        {
            id: 5,
            name: "Penthouse Hạng Nhất",
            type: "Penthouse",
            price: 589,
            rating: 5.0,
            reviews: 87,
            capacity: 6,
            image: "/deluxe-hotel-room.jpg",
            city: "TP. Hồ Chí Minh",
            amenities: ["WiFi", "View 360", "Jacuzzi"],
        },
        {
            id: 6,
            name: "Penthouse Vip",
            type: "Penthouse",
            price: 699,
            rating: 5.0,
            reviews: 64,
            capacity: 8,
            image: "/luxury-spa-relaxation.jpg",
            city: "TP. Hồ Chí Minh",
            amenities: ["WiFi", "View biển", "Private pool"],
        },
    ]

    const filteredRooms = useMemo(() => {
        const result = rooms.filter((room) => {
            const matchesSearch =
                room.name.toLowerCase().includes(searchText.toLowerCase()) ||
                room.city.toLowerCase().includes(searchText.toLowerCase())

            const matchesType = filterType === "all" || room.type === filterType

            return matchesSearch && matchesType
        })

        // Sort rooms
        if (sortBy === "price-low") {
            result.sort((a, b) => a.price - b.price)
        } else if (sortBy === "price-high") {
            result.sort((a, b) => b.price - a.price)
        } else if (sortBy === "rating") {
            result.sort((a, b) => b.rating - a.rating)
        }

        return result
    }, [searchText, filterType, sortBy])

    const pageSize = 9
    const startIdx = (currentPage - 1) * pageSize
    const paginatedRooms = filteredRooms.slice(startIdx, startIdx + pageSize)

    return (
        <Layout className={styles.layout}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <div className={styles.logo}>
                        <span style={{ fontSize: "24px", fontWeight: "bold", color: "#1a472a" }}>Luxury Hotels</span>
                    </div>
                    <nav className={styles.nav}>
                        <Link href="/" style={{ color: "#333", textDecoration: "none" }}>
                            Trang chủ
                        </Link>
                        <Link href="/bookings" style={{ color: "#b89968", textDecoration: "none", fontWeight: "bold" }}>
                            Đặt phòng
                        </Link>
                        <Button type="primary" style={{ backgroundColor: "#b89968", borderColor: "#b89968" }}>
                            Tài khoản
                        </Button>
                    </nav>
                </div>
            </header>

            <Content className={styles.content}>
                {/* Search & Filter Section */}
                <section className={styles.filterSection}>
                    <div className={styles.container}>
                        <h1 className={styles.pageTitle}>Tìm Phòng Phù Hợp</h1>

                        <div className={styles.filterContainer}>
                            <Row gutter={[16, 16]}>
                                {/* Search */}
                                <Col xs={24} sm={24} lg={8}>
                                    <Input
                                        placeholder="Tìm theo tên phòng hoặc thành phố..."
                                        prefix={<Search size={16} />}
                                        size="large"
                                        value={searchText}
                                        onChange={(e) => {
                                            setSearchText(e.target.value)
                                            setCurrentPage(1)
                                        }}
                                        style={{ borderColor: "#d9d9d9" }}
                                    />
                                </Col>

                                {/* Filter by Type */}
                                <Col xs={24} sm={12} lg={8}>
                                    <Select
                                        value={filterType}
                                        onChange={(value) => {
                                            setFilterType(value)
                                            setCurrentPage(1)
                                        }}
                                        size="large"
                                        style={{ width: "100%" }}
                                        options={[
                                            { label: "Tất cả loại phòng", value: "all" },
                                            { label: "Deluxe", value: "Deluxe" },
                                            { label: "Suite", value: "Suite" },
                                            { label: "Penthouse", value: "Penthouse" },
                                        ]}
                                    />
                                </Col>

                                {/* Sort */}
                                <Col xs={24} sm={12} lg={8}>
                                    <Select
                                        value={sortBy}
                                        onChange={(value) => setSortBy(value)}
                                        size="large"
                                        style={{ width: "100%" }}
                                        options={[
                                            { label: "Phổ biến nhất", value: "popular" },
                                            { label: "Giá: Thấp đến Cao", value: "price-low" },
                                            { label: "Giá: Cao đến Thấp", value: "price-high" },
                                            { label: "Đánh giá cao nhất", value: "rating" },
                                        ]}
                                    />
                                </Col>
                            </Row>
                        </div>

                        <div style={{ marginTop: "16px", color: "#ffffffff", fontSize: "14px" }}>
                            Tìm thấy {filteredRooms.length} phòng
                        </div>
                    </div>
                </section>

                {/* Rooms Grid */}
                <section className={styles.roomsGrid}>
                    <div className={styles.container}>
                        <Row gutter={[24, 24]}>
                            {paginatedRooms.map((room) => (
                                <Col key={room.id} xs={24} sm={12} lg={8}>
                                    <Card
                                        className={styles.roomCard}
                                        hoverable
                                        cover={
                                            <div className={styles.imageWrapper}>
                                                <img
                                                    src={room.image || "/placeholder.svg"}
                                                    alt={room.name}
                                                    style={{ width: "100%", height: "250px", objectFit: "cover" }}
                                                />
                                                <Badge
                                                    count={`$${room.price}/đêm`}
                                                    style={{
                                                        backgroundColor: "#b89968",
                                                        position: "absolute",
                                                        top: "95px",
                                                        right: "12px",
                                                        fontSize: "14px",
                                                        padding: "4px 12px",
                                                        borderRadius: "4px",
                                                    }}
                                                />
                                            </div>
                                        }
                                    >
                                        <div className={styles.roomInfo}>
                                            <h3 className={styles.roomName}>{room.name}</h3>

                                            <div className={styles.ratingSection}>
                                                <span style={{ color: "#b89968", fontWeight: "bold" }}>
                                                    <Star size={14} style={{ display: "inline", marginRight: "4px" }} />
                                                    {room.rating}
                                                </span>
                                                <span style={{ color: "#999", fontSize: "12px", marginLeft: "8px" }}>
                                                    ({room.reviews} đánh giá)
                                                </span>
                                            </div>

                                            <Space orientation="vertical" size="small" style={{ width: "100%", marginTop: "12px" }}>
                                                <div className={styles.detail}>
                                                    <Users size={14} />
                                                    <span>Tối đa {room.capacity} khách</span>
                                                </div>
                                                <div className={styles.detail}>
                                                    <MapPin size={14} />
                                                    <span>{room.city}</span>
                                                </div>
                                            </Space>

                                            <div style={{ marginTop: "12px" }}>
                                                <div style={{ fontSize: "12px", color: "#999", marginBottom: "8px" }}>Tiện nghi:</div>
                                                <Space size="small" wrap>
                                                    {room.amenities.map((amenity, idx) => (
                                                        <Badge key={idx} count={amenity} style={{ backgroundColor: "#f0f0f0", color: "#666" }} />
                                                    ))}
                                                </Space>
                                            </div>

                                            <Link href={`/booking/${room.id}`} style={{ textDecoration: "none" }}>
                                                <Button
                                                    type="primary"
                                                    size="large"
                                                    block
                                                    style={{ marginTop: "16px", backgroundColor: "#b89968", borderColor: "#b89968" }}
                                                >
                                                    Xem Chi Tiết & Đặt
                                                </Button>
                                            </Link>
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        {/* Pagination */}
                        <div style={{ marginTop: "32px", textAlign: "center" }}>
                            <Pagination
                                current={currentPage}
                                pageSize={pageSize}
                                total={filteredRooms.length}
                                onChange={(page) => {
                                    setCurrentPage(page)
                                    window.scrollTo({ top: 0, behavior: "smooth" })
                                }}
                                style={{ color: "#333" }}
                            />
                        </div>
                    </div>
                </section>
            </Content>
            <FooterPage />
        </Layout>
    )
}
