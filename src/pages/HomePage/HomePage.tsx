"use client"

import { Avatar, Button, Card, Col, Divider, Layout, Row, Space, Tabs, Typography } from "antd"
import { ArrowUp, Award, Heart, MessageCircle, Star, Users } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import styles from "./page.module.css"
import { useDispatch, useSelector } from "react-redux"
import { fetchRooms } from "@/redux/slices/roomSlice"
import type { RootState } from "@/redux/store"
import { toVND } from "lib/utils"

const { Text } = Typography;

const { Content } = Layout

interface BlogPost {
  id: number
  title: string
  excerpt: string
  category: string
  date: string
  author: string
  image: string
  views: number
  likes: number
}
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

export default function Home() {
  const [scrollTop, setScrollTop] = useState(false)
  const [key, setKey] = useState("DLX")
  const containerRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLElement | null>(null)
  const dispatch = useDispatch()
  const { rooms } = useSelector((state: RootState) => state.room)

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Trải nghiệm sang trọng tại hộ ơi bị lãng quên",
      excerpt: "Khám phá những khoảnh khắc đặc biệt trong các phòng hạng sang của chúng tôi",
      category: "Phòng",
      date: "15 Tháng 12, 2024",
      author: "Nguyễn Thanh",
      image: "/luxury-event-conference.jpg",
      views: 1250,
      likes: 234,
    },
    {
      id: 2,
      title: "Nhà hàng 5 sao với ẩm thực thế giới",
      excerpt: "Thưởng thức các món ăn tinh tế từ các đầu bếp nổi tiếng quốc tế",
      category: "Ẩm thực",
      date: "12 Tháng 12, 2024",
      author: "Trần Hùng",
      image: "/luxury-event-conference.jpg",
      views: 980,
      likes: 189,
    },
    {
      id: 3,
      title: "Wellness spa - Nơi thư giãn tuyệt vời",
      excerpt: "Giải tỏa căng thẳng và tái tạo năng lượng tại spa cao cấp của chúng tôi",
      category: "Wellness",
      date: "10 Tháng 12, 2024",
      author: "Lê Minh",
      image: "/luxury-event-conference.jpg",
      views: 1540,
      likes: 312,
    },
    {
      id: 4,
      title: "Sự kiện và hội nghị tại khách sạn",
      excerpt: "Tổ chức các sự kiện thành công với những tiện nghi hàng đầu",
      category: "Sự kiện",
      date: "8 Tháng 12, 2024",
      author: "Phạm Linh",
      image: "/luxury-event-conference.jpg",
      views: 876,
      likes: 156,
    },
    {
      id: 5,
      title: "Hành trình khám phá thành phố cùng chúng tôi",
      excerpt: "Những tour du lịch độc đáo được hướng dẫn bởi các chuyên gia địa phương",
      category: "Du lịch",
      date: "5 Tháng 12, 2024",
      author: "Vũ Hạ",
      image: "/luxury-event-conference.jpg",
      views: 2100,
      likes: 445,
    },
    {
      id: 6,
      title: "Bồi dưỡng kỹ năng tại trung tâm học liệu",
      excerpt: "Các khóa đào tạo chuyên nghiệp cho nhân viên và khách hàng",
      category: "Đào tạo",
      date: "1 Tháng 12, 2024",
      author: "Đỗ Anh",
      image: "/luxury-event-conference.jpg",
      views: 654,
      likes: 98,
    },
  ]

  const amenities = [
    { icon: "🏊", name: "Hồ bơi vô cực", desc: "Với view biển tuyệt đẹp" },
    { icon: "🍽️", name: "Nhà hàng gourmet", desc: "Ẩm thực thế giới 5 sao" },
    { icon: "💆", name: "Spa cao cấp", desc: "Dịch vụ thư giãn toàn diện" },
    { icon: "🏋️", name: "Phòng gym hiện đại", desc: "Trang thiết bị mới nhất" },
    { icon: "📚", name: "Business center", desc: "Công nghệ tiên tiến" },
    { icon: "🎭", name: "Entertainment", desc: "Giải trí đa dạng" },
  ]


  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleAnchorClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    const headerHeight = headerRef.current?.offsetHeight || 0
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  useEffect(() => {
    dispatch(fetchRooms({ category: key, limit: 2 }) as any)
  }, [dispatch, key])

  return (
    <Layout className={styles.layout} ref={containerRef}>
      {/* Header */}
      <header ref={headerRef} className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <span style={{ fontSize: "24px", fontWeight: "bold", color: "#1a472a" }}>Luxury Hotels</span>
          </div>
          <nav className={styles.nav}>
            <a href="#blog" onClick={(e) => handleAnchorClick(e, "blog")}>Blog</a>
            <a href="#amenities" onClick={(e) => handleAnchorClick(e, "amenities")}>Tiện nghi</a>
            <a href="#rooms" onClick={(e) => handleAnchorClick(e, "rooms")}>Phòng</a>
          </nav>
        </div>
      </header>

      <Content>
        {/* Hero Section */}
        <section className={styles.hero} data-animate>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Khám phá sang trọng</h1>
            <p className={styles.heroSubtitle}>Trải nghiệm sự tinh tế và thư thái tại khách sạn 5 sao hàng đầu</p>
            <Space size="large">
              <Button type="primary" size="large" style={{ backgroundColor: "#b89968", borderColor: "#b89968" }}>
                Khám phá ngay
              </Button>
              <Button size="large" style={{ borderColor: "#333" }}>
                Xem phòng
              </Button>
            </Space>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.statsSection} data-animate>
          <Row gutter={[32, 32]} justify="center">
            <Col xs={8} sm={6}>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>
                  <Award size={32} color="#b89968" />
                </div>
                <div className={styles.statValue}>25+</div>
                <div className={styles.statLabel}>Năm kinh nghiệm</div>
              </div>
            </Col>
            <Col xs={8} sm={6}>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>
                  <Users size={32} color="#b89968" />
                </div>
                <div className={styles.statValue}>150</div>
                <div className={styles.statLabel}>Phòng hạng sang</div>
              </div>
            </Col>
            <Col xs={8} sm={6}>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>
                  <Star size={32} color="#b89968" />
                </div>
                <div className={styles.statValue}>98%</div>
                <div className={styles.statLabel}>Khách hài lòng</div>
              </div>
            </Col>
          </Row>
        </section>

        {/* Blog Section */}
        <section className={styles.blogSection} id="blog" data-animate>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Tin tức & Xu hướng</h2>
            <p className={styles.sectionDesc}>Cập nhật thông tin mới nhất về các dịch vụ và trải nghiệm tuyệt vời</p>
          </div>
          <Row gutter={[24, 24]}>
            {blogPosts.map((post) => (
              <Col key={post.id} xs={24} sm={12} lg={8}>
                <Card
                  cover={
                    <div className={styles.cardCover}>
                      <a href={`/blog/${post.id}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          style={{ width: "100%", height: "250px", objectFit: "cover" }}
                          title={post.title}
                        />
                      </a>
                      <div className={styles.categoryBadge}>{post.category}</div>
                    </div>
                  }
                  hoverable
                >
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{post.title}</h3>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>

                    <Divider style={{ margin: "12px 0" }} />

                    <div className={styles.cardMeta}>
                      <Avatar size={32} style={{ backgroundColor: "#b89968" }}>
                        {post.author.charAt(0)}
                      </Avatar>
                      <div className={styles.metaInfo}>
                        <div className={styles.author}>{post.author}</div>
                        <div className={styles.date}>{post.date}</div>
                      </div>
                    </div>

                    <div className={styles.cardFooter}>
                      <Space size="small">
                        <Heart size={16} color="#999" />
                        <span style={{ color: "#999", fontSize: "12px" }}>{post.likes}</span>
                      </Space>
                      <Space size="small">
                        <MessageCircle size={16} color="#999" />
                        <span style={{ color: "#999", fontSize: "12px" }}>{post.views}</span>
                      </Space>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Text underline={true}>
            <a className="link" href="/blogs" style={{ cursor: "pointer" }}>
              Xem Thêm
            </a>
          </Text>
        </section>

        {/* Amenities Section */}
        <section className={styles.amenitiesSection} id="amenities" data-animate>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Tiện nghi cao cấp</h2>
            <p className={styles.sectionDesc}>Tận hưởng dịch vụ và tiện ích đẳng cấp thế giới</p>
          </div>

          <Row gutter={[24, 24]}>
            {amenities.map((amenity, idx) => (
              <Col key={idx} xs={24} sm={12} lg={8}>
                <Card className={styles.amenityCard} hoverable>
                  <div className={styles.amenityIcon}>{amenity.icon}</div>
                  <h4 className={styles.amenityName}>{amenity.name}</h4>
                  <p className={styles.amenityDesc}>{amenity.desc}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Rooms Section */}
        <section className={styles.roomsSection} id="rooms" data-animate>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Phòng của chúng tôi</h2>
            <p className={styles.sectionDesc}>Lựa chọn phòng phù hợp với nhu cầu của bạn</p>
          </div>
          <Tabs
            defaultActiveKey="DLX"
            onChange={(key) => setKey(key)}
            items={[
              {
                key: "DLX",
                label: "Phòng Deluxe",
                children: (
                  <Row gutter={[24, 24]}>
                    {rooms.map((i: Room) => (
                      <Col key={i.id} xs={24} sm={12}>
                        <Card className={styles.roomCard}>
                          <a href={`/booking/${i.id}`}>
                            <img
                              src={'/luxury-suite-hotel.jpg'}
                              alt="Deluxe Room"
                              style={{ width: "100%", borderRadius: "8px", marginBottom: "16px" }}
                            />
                          </a>
                          <h4 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}>
                            {i.name}
                          </h4>
                          <p style={{ color: "#666", marginBottom: "12px" }}>
                            {i.accommodation.description}
                          </p>
                          <div style={{ fontSize: "18px", fontWeight: "bold", color: "#b89968", marginTop: "12px" }}>
                            {toVND(i.price)} / đêm
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ),
              },
              {
                key: "SUT",
                label: "Phòng Suite",
                children: (
                  <Row gutter={[24, 24]}>
                    {rooms.map((i: Room) => (
                      <Col key={i.id} xs={24} sm={12}>
                        <Card className={styles.roomCard}>
                          <a href={`/booking/${i.id}`}>
                            <img
                              src={'/luxury-suite-room.jpg'}
                              alt="Deluxe Room"
                              style={{ width: "100%", borderRadius: "8px", marginBottom: "16px" }}
                            />
                          </a>
                          <h4 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}>
                            {i.name}
                          </h4>
                          <p style={{ color: "#666", marginBottom: "12px" }}>
                            {i.accommodation.description}
                          </p>
                          <div style={{ fontSize: "18px", fontWeight: "bold", color: "#b89968", marginTop: "12px" }}>
                            {toVND(i.price)} / đêm
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ),
              },
              {
                key: "PEN",
                label: "Phòng Penthouse",
                children: (
                  <Row gutter={[24, 24]}>
                    {rooms.map((i: Room) => (
                      <Col key={i.id} xs={24} sm={12}>
                        <Card className={styles.roomCard}>
                          <a href={`/booking/${i.id}`}>
                            <img
                              src={'/family-room-hotel.jpg'}
                              alt="Deluxe Room"
                              style={{ width: "100%", borderRadius: "8px", marginBottom: "16px" }}
                            />
                          </a>
                          <h4 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}>
                            {i.name}
                          </h4>
                          <p style={{ color: "#666", marginBottom: "12px" }}>
                            {i.accommodation.description}
                          </p>
                          <div style={{ fontSize: "18px", fontWeight: "bold", color: "#b89968", marginTop: "12px" }}>
                            {toVND(i.price)} / đêm
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ),
              },
            ]}
          />
          <Text underline={true}>
            <a className="link" href="/bookings" style={{ cursor: "pointer" }}>
              Xem Thêm
            </a>
          </Text>

        </section>

        {/* Footer */}
        <footer className={styles.footer} data-animate>
          <Row gutter={[32, 32]}>
            <Col xs={24} sm={12} lg={6}>
              <h4 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px", color: "#ffffffff" }}>
                Về chúng tôi
              </h4>
              <p style={{ color: "#ffffffff", fontSize: "14px", lineHeight: "1.6" }}>
                Khách sạn 5 sao hàng đầu với dịch vụ hoàn hảo và tiện nghi cao cấp.
              </p>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <h4 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px", color: "#ffffffff" }}>Liên hệ</h4>
              <div style={{ color: "#ffffffff", fontSize: "14px", lineHeight: "2" }}>
                <div>📍 123 Đường Sang Trọng, TP HCM</div>
                <div>📞 +84 (0)28 1234 5678</div>
                <div>📧 info@luxuryhotel.vn</div>
              </div>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <h4 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px", color: "#ffffffff" }}>Dịch vụ</h4>
              <div style={{ color: "#ffffffff", fontSize: "14px", lineHeight: "2" }}>
                <div>
                  <a href="#" style={{ color: "#ffffffff", textDecoration: "none" }}>
                    Đặt phòng
                  </a>
                </div>
                <div>
                  <a href="#" style={{ color: "#ffffffff", textDecoration: "none" }}>
                    Nhà hàng
                  </a>
                </div>
                <div>
                  <a href="#" style={{ color: "#ffffffff", textDecoration: "none" }}>
                    Spa
                  </a>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <h4 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px", color: "#ffffffff" }}>Theo dõi</h4>
              <div style={{ color: "#ffffffff", fontSize: "14px", lineHeight: "2" }}>
                <div>
                  <a href="#" style={{ color: "#ffffffff", textDecoration: "none" }}>
                    Facebook
                  </a>
                </div>
                <div>
                  <a href="#" style={{ color: "#ffffffff", textDecoration: "none" }}>
                    Instagram
                  </a>
                </div>
                <div>
                  <a href="#" style={{ color: "#ffffffff", textDecoration: "none" }}>
                    Twitter
                  </a>
                </div>
              </div>
            </Col>
          </Row>
          <Divider style={{ margin: "24px 0" }} />
          <div style={{ textAlign: "center", color: "#ffffffff", fontSize: "12px" }}>
            © 2025 Luxury Hotels. Tất cả quyền được bảo lưu.
          </div>
        </footer>
      </Content>

      {/* Back to Top Button */}
      {scrollTop && (
        <Button
          type="primary"
          shape="circle"
          size="large"
          onClick={scrollToTop}
          className={styles.backToTop}
          style={{ backgroundColor: "#b89968", borderColor: "#b89968" }}
          icon={<ArrowUp size={20} />}
        />
      )}
    </Layout>
  )
}
