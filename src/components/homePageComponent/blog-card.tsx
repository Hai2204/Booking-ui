"use client"

import { Card, Tag, Space, Button } from "antd"
import { Calendar, User, Eye } from "lucide-react"
import { useState } from "react"

interface BlogCardProps {
  id: number
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  author: string
}

export default function BlogCard({ title, excerpt, image, category, date, author }: BlogCardProps) {
  const [hovering, setHovering] = useState(false)

  return (
    <Card
      hoverable
      className="h-full overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105"
      cover={
        <div
          className="relative h-48 overflow-hidden bg-gray-200"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              hovering ? "scale-110" : "scale-100"
            }`}
          />
          <div className="absolute top-4 right-4">
            <Tag color="blue">{category}</Tag>
          </div>
        </div>
      }
    >
      <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-blue-600 transition-colors">{title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{excerpt}</p>

      <Space orientation="vertical" className="w-full text-xs text-gray-500 mb-4">
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          {date}
        </div>
        <div className="flex items-center gap-2">
          <User size={14} />
          {author}
        </div>
      </Space>

      <Button type="primary" block className="bg-blue-600 hover:bg-blue-700" icon={<Eye size={16} />}>
        Đọc thêm
      </Button>
    </Card>
  )
}
