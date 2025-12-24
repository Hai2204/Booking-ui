"use client"

import { BarChartOutlined, DownloadOutlined, PrinterOutlined } from "@ant-design/icons"
import { Button, Card, Col, DatePicker, Layout, message, Row, Select, Space, Statistic, Table } from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { fetchAllBookings } from "../redux/slices/bookingSlice"
import { fetchRooms } from "@/redux/slices/roomSlice"
import type { RootState } from "@/redux/store"

const { Content } = Layout
const COLORS = ["#1890ff", "#52c41a", "#faad14", "#f5222d", "#722ed1"]

export default function AdminReports() {
  const dispatch = useDispatch()
  const { bookings, isLoading } = useSelector((state: RootState) => state.booking)
  const { rooms } = useSelector((state: RootState) => state.room)
  const [filteredBookings, setFilteredBookings] = useState([])
  const [dateRange, setDateRange] = useState<any>(null)
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    dispatch(fetchAllBookings() as any)
    dispatch(fetchRooms() as any)
  }, [dispatch])

  useEffect(() => {
    let filtered = bookings
    if (dateRange) {
      const [start, end] = dateRange
      filtered = filtered.filter((b) => {
        const date = dayjs(b.createdAt)
        return date.isAfter(start) && date.isBefore(end)
      })
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((b) => b.status === statusFilter)
    }
    setFilteredBookings(filtered)
  }, [bookings, dateRange, statusFilter])

  // Generate chart data
  const statusData = [
    { name: "Xác nhận", value: bookings.filter((b) => b.status === "confirmed").length },
    { name: "Chờ xử lý", value: bookings.filter((b) => b.status === "pending").length },
    { name: "Hủy", value: bookings.filter((b) => b.status === "cancelled").length },
  ]

  const roomTypeData = rooms.reduce((acc: any, room) => {
    const existing = acc.find((r: any) => r.name === room.type)
    if (existing) {
      existing.value += 1
    } else {
      acc.push({ name: room.type, value: 1 })
    }
    return acc
  }, [])

  // Generate monthly revenue data (demo)
  const monthlyRevenue = [
    { month: "Tháng 1", revenue: Math.floor(Math.random() * 50000) + 10000 },
    { month: "Tháng 2", revenue: Math.floor(Math.random() * 50000) + 15000 },
    { month: "Tháng 3", revenue: Math.floor(Math.random() * 50000) + 20000 },
    { month: "Tháng 4", revenue: Math.floor(Math.random() * 50000) + 18000 },
    { month: "Tháng 5", revenue: Math.floor(Math.random() * 50000) + 25000 },
    { month: "Tháng 6", revenue: Math.floor(Math.random() * 50000) + 30000 },
  ]

  const totalRevenue = filteredBookings.reduce((sum, b) => sum + b.totalPrice, 0)
  const averageBooking = filteredBookings.length > 0 ? (totalRevenue / filteredBookings.length).toFixed(2) : "0"
  const confirmedCount = filteredBookings.filter((b) => b.status === "confirmed").length

  const handleExportCSV = () => {
    const csv = [
      ["ID", "Phòng", "Khách hàng", "Ngày nhận", "Ngày trả", "Số đêm", "Tổng tiền", "Trạng thái"],
      ...filteredBookings.map((b) => [
        b.id,
        b.roomId,
        b.userId,
        b.checkInDate,
        b.checkOutDate,
        b.numberOfNights,
        b.totalPrice,
        b.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `booking-report-${dayjs().format("YYYY-MM-DD")}.csv`
    link.click()
    message.success("Xuất báo cáo CSV thành công")
  }

  const handlePrint = () => {
    window.print()
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 120,
      render: (text: string) => <span className="font-mono text-xs">{text}</span>,
    },
    {
      title: "Phòng",
      dataIndex: "roomId",
      key: "roomId",
    },
    {
      title: "Khách",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Ngày nhận",
      dataIndex: "checkInDate",
      key: "checkInDate",
    },
    {
      title: "Ngày trả",
      dataIndex: "checkOutDate",
      key: "checkOutDate",
    },
    {
      title: "Số đêm",
      dataIndex: "numberOfNights",
      key: "numberOfNights",
      align: "center" as const,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => <span className="font-semibold text-indigo-600">${price}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
  ]

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Content className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <BarChartOutlined /> Báo cáo & Thống kê
            </h1>
            <p className="text-gray-600">Phân tích doanh thu, đặt phòng và hiệu suất</p>
          </div>

          {/* Filter Section */}
          <Card className="mb-6 shadow-md border-0 rounded-lg">
            <Space wrap>
              <DatePicker.RangePicker onChange={setDateRange} placeholder={["Từ ngày", "Đến ngày"]} />
              <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 150 }}>
                <Select.Option value="all">Tất cả trạng thái</Select.Option>
                <Select.Option value="confirmed">Xác nhận</Select.Option>
                <Select.Option value="pending">Chờ xử lý</Select.Option>
                <Select.Option value="cancelled">Hủy</Select.Option>
              </Select>
              <Button icon={<DownloadOutlined />} onClick={handleExportCSV} className="rounded-lg">
                Xuất CSV
              </Button>
              <Button icon={<PrinterOutlined />} onClick={handlePrint} className="rounded-lg">
                In báo cáo
              </Button>
            </Space>
          </Card>

          {/* Summary Stats */}
          <Row gutter={[24, 24]} className="mb-8">
            <Col xs={24} sm={12} lg={6}>
              <Card className="shadow-md border-0 rounded-lg" hoverable>
                <Statistic title="Tổng đặt phòng" value={filteredBookings.length} styles={{ content: { color: "#1890ff" } }} />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="shadow-md border-0 rounded-lg" hoverable>
                <Statistic title="Xác nhận" value={confirmedCount} styles={{ content: { color: "#52c41a" } }} />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="shadow-md border-0 rounded-lg" hoverable>
                <Statistic title="Tổng doanh thu" value={totalRevenue} prefix="$" styles={{ content: { color: "#faad14" } }} />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="shadow-md border-0 rounded-lg" hoverable>
                <Statistic
                  title="Trung bình / đặt"
                  value={averageBooking}
                  prefix="$"
                  styles={{ content: { color: "#f5222d" } }}
                />
              </Card>
            </Col>
          </Row>

          {/* Charts Section */}
          <Row gutter={[24, 24]} className="mb-8">
            <Col xs={24} lg={12}>
              <Card className="shadow-md border-0 rounded-lg">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Trạng thái đặt phòng</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card className="shadow-md border-0 rounded-lg">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Loại phòng</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={roomTypeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#1890ff" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          <Row gutter={[24, 24]} className="mb-8">
            <Col xs={24}>
              <Card className="shadow-md border-0 rounded-lg">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Doanh thu theo tháng</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#1890ff"
                      strokeWidth={3}
                      dot={{ fill: "#1890ff", r: 5 }}
                      activeDot={{ r: 7 }}
                      name="Doanh thu"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          {/* Detail Table */}
          <Card className="shadow-md border-0 rounded-lg">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Chi tiết đặt phòng</h3>
            <Table
              dataSource={filteredBookings}
              columns={columns}
              rowKey="id"
              loading={isLoading}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1200 }}
            />
          </Card>
        </div>
      </Content>
    </Layout>
  )
}
