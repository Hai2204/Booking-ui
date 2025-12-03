"use client"

import { Row, Col, Card, Button, Badge, Space, Rate } from "antd"
import { useEffect, useRef, useState } from "react"

export default function RoomShowcase() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const rooms = [
    {
      id: 1,
      name: "Phòng Tiêu chuẩn",
      price: "1,500,000",
      image: "/standard-hotel-room.jpg",
      features: ["WiFi miễn phí", "Điều hòa", "Minibar"],
      rating: 4,
    },
    {
      id: 2,
      name: "Phòng Deluxe",
      price: "2,500,000",
      image: "/deluxe-hotel-room.jpg",
      features: ["WiFi miễn phí", "Điều hòa", "Spa"],
      rating: 4.5,
    },
    {
      id: 3,
      name: "Phòng Suite",
      price: "5,000,000",
      image: "/luxury-suite-room.jpg",
      features: ["WiFi miễn phí", "Điều hòa", "Hồ bơi riêng"],
      rating: 5,
    },
  ]

  return (
    <section
      ref={sectionRef}
      className={`py-20 px-4 md:px-8 lg:px-16 bg-gray-50 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Các loại phòng</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Lựa chọn đa dạng các phòng phù hợp với nhu cầu và ngân sách của bạn
          </p>
        </div>

        <Row gutter={[24, 24]}>
          {rooms.map((room) => (
            <Col key={room.id} xs={24} md={8}>
              <Card hoverable className="h-full overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
                <div className="relative mb-4 overflow-hidden rounded-lg h-48">
                  <img
                    src={room.image || "/placeholder.svg"}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <Badge count="HOT" style={{ backgroundColor: "#ff4d4f" }} className="absolute top-4 right-4" />
                </div>

                <h3 className="text-xl font-bold mb-2">{room.name}</h3>

                <Rate disabled defaultValue={room.rating} className="mb-4" />

                <div className="mb-4">
                  <span className="text-2xl font-bold text-blue-600">{room.price}đ</span>
                  <span className="text-gray-500 text-sm">/đêm</span>
                </div>

                <Space wrap className="mb-4 w-full">
                  {room.features.map((feature, idx) => (
                    <span key={idx} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </Space>

                <Button type="primary" block className="bg-blue-600 h-10 font-semibold">
                  Đặt ngay
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}
