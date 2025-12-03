"use client"

import { Layout, Row, Col, Card, Statistic, Button } from "antd"
import { TeamOutlined, ShoppingOutlined, DollarOutlined, CalendarOutlined, SettingOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import { fetchRooms } from "../redux/slices/roomSlice"
import { fetchAllBookings } from "../redux/slices/bookingSlice"
import Navbar from "../components/Navbar"

const { Content } = Layout

export default function Admin() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { rooms } = useSelector((state: RootState) => state.room)
  const { bookings } = useSelector((state: RootState) => state.booking)

  useEffect(() => {
    dispatch(fetchRooms() as any)
    dispatch(fetchAllBookings() as any)
  }, [dispatch])

  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0)
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length
  const availableRooms = rooms.filter((r) => r.status === "available").length

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Navbar />
      <Content className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Quản lý phòng, đặt phòng, và xem thống kê</p>
          </div>

          <Row gutter={[24, 24]} className="mb-8">
            <Col xs={24} sm={12} lg={6}>
              <Card className="shadow-md border-0 rounded-lg" hoverable>
                <Statistic
                  title="Tổng phòng"
                  value={rooms.length}
                  prefix={<ShoppingOutlined className="text-blue-500" />}
                  valueStyle={{ color: "#1890ff", fontSize: "24px" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="shadow-md border-0 rounded-lg" hoverable>
                <Statistic
                  title="Phòng sẵn sàng"
                  value={availableRooms}
                  prefix={<TeamOutlined className="text-green-500" />}
                  valueStyle={{ color: "#52c41a", fontSize: "24px" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="shadow-md border-0 rounded-lg" hoverable>
                <Statistic
                  title="Tổng đặt phòng"
                  value={bookings.length}
                  prefix={<CalendarOutlined className="text-orange-500" />}
                  valueStyle={{ color: "#faad14", fontSize: "24px" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="shadow-md border-0 rounded-lg" hoverable>
                <Statistic
                  title="Tổng doanh thu"
                  value={totalRevenue}
                  prefix={<DollarOutlined className="text-red-500" />}
                  valueStyle={{ color: "#f5222d", fontSize: "24px" }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={8}>
              <Card className="shadow-md border-0 rounded-lg h-full" hoverable>
                <div className="text-center">
                  <ShoppingOutlined className="text-4xl text-blue-500 mb-4 block" />
                  <h2 className="text-xl font-bold mb-4 text-gray-800">Quản lý phòng</h2>
                  <p className="text-gray-600 mb-6 text-sm">Thêm, sửa, xóa phòng và quản lý thông tin chi tiết</p>
                  <Button type="primary" block onClick={() => navigate("/admin/rooms")} className="rounded-lg h-10">
                    Quản lý danh sách phòng
                  </Button>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card className="shadow-md border-0 rounded-lg h-full" hoverable>
                <div className="text-center">
                  <CalendarOutlined className="text-4xl text-green-500 mb-4 block" />
                  <h2 className="text-xl font-bold mb-4 text-gray-800">Quản lý đặt phòng</h2>
                  <p className="text-gray-600 mb-6 text-sm">Xem, cập nhật trạng thái, và xóa các đặt phòng</p>
                  <Button type="primary" block onClick={() => navigate("/admin/bookings")} className="rounded-lg h-10">
                    Quản lý đặt phòng
                  </Button>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card className="shadow-md border-0 rounded-lg h-full" hoverable>
                <div className="text-center">
                  <SettingOutlined className="text-4xl text-purple-500 mb-4 block" />
                  <h2 className="text-xl font-bold mb-4 text-gray-800">Báo cáo & Thống kê</h2>
                  <p className="text-gray-600 mb-6 text-sm">Xem biểu đồ, xuất báo cáo, và phân tích doanh thu</p>
                  <Button type="primary" block onClick={() => navigate("/admin/reports")} className="rounded-lg h-10">
                    Xem báo cáo
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  )
}
