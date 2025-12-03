"use client"

import { Row, Col, Card } from "antd"
import { Wifi, UtensilsCrossed, Dumbbell, Waves, ShoppingCart, Briefcase } from "lucide-react"

export default function AmenitiesSection() {
  const amenities = [
    {
      icon: <Wifi size={32} className="text-blue-600" />,
      title: "WiFi miễn phí",
      description: "Kết nối internet tốc độ cao trên toàn bộ khách sạn",
    },
    {
      icon: <UtensilsCrossed size={32} className="text-blue-600" />,
      title: "Nhà hàng cao cấp",
      description: "Các món ăn quốc tế được chuẩn bị bởi đầu bếp nổi tiếng",
    },
    {
      icon: <Dumbbell size={32} className="text-blue-600" />,
      title: "Phòng tập thể dục",
      description: "Trang thiết bị hiện đại với huấn luyện viên chuyên nghiệp",
    },
    {
      icon: <Waves size={32} className="text-blue-600" />,
      title: "Hồ bơi và SPA",
      description: "Thư giãn tuyệt vời với dịch vụ spa chuyên nghiệp",
    },
    {
      icon: <ShoppingCart size={32} className="text-blue-600" />,
      title: "Trung tâm mua sắm",
      description: "Các thương hiệu nổi tiếng tại trung tâm thương mại",
    },
    {
      icon: <Briefcase size={32} className="text-blue-600" />,
      title: "Phòng họp và sự kiện",
      description: "Tổ chức hội nghị và sự kiện quy mô lớn",
    },
  ]

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Tiện nghi và dịch vụ</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Trải nghiệm đầy đủ các tiện nghi hạng sang với dịch vụ tuyệt vời
          </p>
        </div>

        <Row gutter={[32, 32]}>
          {amenities.map((amenity, idx) => (
            <Col key={idx} xs={24} sm={12} lg={8}>
              <Card
                className="text-center hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] border-0 bg-gray-50"
                bordered={false}
              >
                <div className="mb-4 flex justify-center">{amenity.icon}</div>
                <h3 className="text-lg font-bold mb-2">{amenity.title}</h3>
                <p className="text-gray-600 text-sm">{amenity.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}
