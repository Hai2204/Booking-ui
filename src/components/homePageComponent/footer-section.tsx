"use client"

import { Row, Col, Space, Divider, Button } from "antd"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function FooterSection() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <Row gutter={[40, 40]} className="mb-8">
          <Col xs={24} md={6}>
            <h4 className="text-lg font-bold mb-4">Về chúng tôi</h4>
            <p className="text-gray-300 text-sm">
              Khách sạn 5 sao hàng đầu với 25 năm kinh nghiệm phục vụ khách hàng tại toàn thế giới.
            </p>
          </Col>

          <Col xs={24} md={6}>
            <h4 className="text-lg font-bold mb-4">Liên kết nhanh</h4>
            <Space direction="vertical" className="w-full text-sm text-gray-300">
              <a href="#" className="hover:text-white transition-colors">
                Phòng
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Dịch vụ
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Sự kiện
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Blog
              </a>
            </Space>
          </Col>

          <Col xs={24} md={6}>
            <h4 className="text-lg font-bold mb-4">Liên hệ</h4>
            <Space direction="vertical" className="w-full text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+84 123 456 789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@hotelname.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1" />
                <span>Số 123 Đường ABC, Thành phố XYZ</span>
              </div>
            </Space>
          </Col>

          <Col xs={24} md={6}>
            <h4 className="text-lg font-bold mb-4">Theo dõi</h4>
            <Space wrap className="mb-4">
              <Button
                type="text"
                shape="circle"
                size="large"
                className="text-white hover:bg-blue-600"
                icon={<Facebook size={20} />}
              />
              <Button
                type="text"
                shape="circle"
                size="large"
                className="text-white hover:bg-blue-600"
                icon={<Twitter size={20} />}
              />
              <Button
                type="text"
                shape="circle"
                size="large"
                className="text-white hover:bg-blue-600"
                icon={<Instagram size={20} />}
              />
              <Button
                type="text"
                shape="circle"
                size="large"
                className="text-white hover:bg-blue-600"
                icon={<Linkedin size={20} />}
              />
            </Space>
          </Col>
        </Row>

        <Divider style={{ borderColor: "#444" }} />

        <Row justify="space-between" align="middle" className="text-gray-400 text-sm">
          <Col>© 2025 Luxury Hotel. All rights reserved.</Col>
          <Col>
            <Space>
              <a href="#" className="hover:text-white transition-colors">
                Chính sách bảo mật
              </a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">
                Điều khoản sử dụng
              </a>
            </Space>
          </Col>
        </Row>
      </div>
    </footer>
  )
}
