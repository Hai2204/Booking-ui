"use client"

import { Button, Space } from "antd"
import { useEffect, useRef, useState } from "react"
import { ChevronRight, Search } from "lucide-react"

export default function HeroSection() {
  const [opacity, setOpacity] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setOpacity(1)
  }, [])

  return (
    <div
      ref={heroRef}
      className="relative h-screen md:h-[600px] bg-gradient-to-r from-blue-600 to-indigo-600 overflow-hidden flex items-center justify-center"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            </linearGradient>
          </defs>
          <path d="M0,300 Q300,250 600,300 T1200,300 L1200,600 L0,600 Z" fill="url(#grad1)" />
        </svg>
      </div>

      {/* Content */}
      <div
        className="relative z-10 text-center text-white px-4 max-w-2xl mx-auto"
        style={{ opacity, transition: "opacity 0.8s ease-in" }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Trải nghiệm sang trọng</h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100">Khách sạn 5 sao với dịch vụ hàng đầu thế giới</p>

        <Space wrap className="justify-center">
          <Button
            type="primary"
            size="large"
            className="bg-white text-blue-600 border-0 px-8 h-12 font-semibold hover:bg-gray-100"
          >
            Đặt phòng ngay
          </Button>
          <Button
            type="default"
            size="large"
            className="bg-transparent text-white border-white px-8 h-12 font-semibold hover:bg-white hover:text-blue-600"
            icon={<Search size={20} />}
          >
            Tìm hiểu thêm
          </Button>
        </Space>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="text-white text-center">
          <p className="text-sm mb-2">Cuộn xuống</p>
          <ChevronRight size={20} className="animate-bounce" />
        </div>
      </div>
    </div>
  )
}
