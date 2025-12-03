"use client"

import { Card, Row, Col, Statistic } from "antd"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { ShoppingOutlined, HomeOutlined, UserOutlined, DollarOutlined } from "@ant-design/icons"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function AdminDashboard() {
  const { bookings } = useSelector((state: RootState) => state.booking)
  const { rooms } = useSelector((state: RootState) => state.room)

  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0)
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled").length
  const pendingBookings = bookings.filter((b) => b.status === "pending").length

  const bookingStatusData = [
    { name: "Đã xác nhận", value: confirmedBookings },
    { name: "Chờ xác nhận", value: pendingBookings },
    { name: "Đã hủy", value: cancelledBookings },
  ]

  const revenueByMonth = Array.from({ length: 12 }, (_, i) => ({
    month: `Tháng ${i + 1}`,
    revenue: Math.floor((Math.random() * totalRevenue) / 3),
  }))

  const bookingsOverTime = Array.from({ length: 7 }, (_, i) => ({
    day: `Ngày ${i + 1}`,
    bookings: Math.floor(Math.random() * 10),
  }))

  const COLORS = ["#52c41a", "#faad14", "#f5222d"]

  const roomOccupancy = rooms.map((room) => ({
    name: room.name,
    occupied: Math.floor(Math.random() * 30),
    available: Math.floor(Math.random() * 30),
  }))

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Quản trị</h1>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng phòng"
              value={rooms.length}
              prefix={<HomeOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Đặt phòng đã xác nhận"
              value={confirmedBookings}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng đặt phòng"
              value={bookings.length}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={totalRevenue}
              prefix={<DollarOutlined />}
              suffix="đ"
              valueStyle={{ color: "#f5222d" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Trạng thái Đặt phòng">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bookingStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {bookingStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Doanh thu theo tháng">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${value.toLocaleString()}đ`} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#1890ff" name="Doanh thu" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} lg={12}>
          <Card title="Đặt phòng theo ngày">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingsOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#52c41a" name="Số lượng đặt phòng" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Tình trạng sử dụng phòng">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roomOccupancy} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="occupied" fill="#faad14" name="Đã đặt" />
                <Bar dataKey="available" fill="#52c41a" name="Còn trống" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
