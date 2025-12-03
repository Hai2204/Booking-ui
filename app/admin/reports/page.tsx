"use client"

import { Card, Row, Col, Button, Table, Space, Statistic, Tag, DatePicker, Select, message } from "antd"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { DownloadOutlined, PrinterOutlined } from "@ant-design/icons"
import { useState } from "react"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"

export default function ReportsPage() {
  const { bookings } = useSelector((state: RootState) => state.booking)
  const { rooms } = useSelector((state: RootState) => state.room)
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null])
  const [reportType, setReportType] = useState("all")

  const getFilteredBookings = () => {
    let filtered = bookings
    if (dateRange[0] && dateRange[1]) {
      filtered = filtered.filter((b) => {
        const bookingDate = dayjs(b.createdAt)
        return bookingDate.isBetween(dateRange[0], dateRange[1], null, "[]")
      })
    }
    if (reportType !== "all") {
      filtered = filtered.filter((b) => b.status === reportType)
    }
    return filtered
  }

  const filteredBookings = getFilteredBookings()
  const totalRevenue = filteredBookings.reduce((sum, b) => sum + b.totalPrice, 0)
  const confirmedCount = filteredBookings.filter((b) => b.status === "confirmed").length
  const cancelledCount = filteredBookings.filter((b) => b.status === "cancelled").length

  const handleExportCSV = () => {
    const csv = [
      ["ID", "Phòng", "Ngày nhận", "Ngày trả", "Giá", "Trạng thái"],
      ...filteredBookings.map((b) => [
        b.id.substring(0, 8),
        b.roomId,
        b.checkInDate,
        b.checkOutDate,
        b.totalPrice,
        b.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `report-${dayjs().format("YYYY-MM-DD")}.csv`
    a.click()
    message.success("Xuất báo cáo thành công!")
  }

  const handlePrint = () => {
    window.print()
    message.success("Bắt đầu in báo cáo!")
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => text.substring(0, 8),
    },
    {
      title: "Phòng",
      dataIndex: "roomId",
      key: "roomId",
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
      title: "Giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => `${price.toLocaleString()}đ`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colors: { [key: string]: string } = {
          pending: "orange",
          confirmed: "green",
          cancelled: "red",
        }
        return <Tag color={colors[status]}>{status}</Tag>
      },
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Báo cáo</h1>

      <Card className="mb-6">
        <Row gutter={[16, 16]} className="mb-4">
          <Col xs={24} sm={12} lg={6}>
            <DatePicker.RangePicker
              value={dateRange}
              onChange={(dates) => setDateRange([dates?.[0] || null, dates?.[1] || null])}
              style={{ width: "100%" }}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Select
              value={reportType}
              onChange={setReportType}
              style={{ width: "100%" }}
              options={[
                { label: "Tất cả", value: "all" },
                { label: "Đã xác nhận", value: "confirmed" },
                { label: "Đã hủy", value: "cancelled" },
                { label: "Chờ xác nhận", value: "pending" },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} lg={12}>
            <Space>
              <Button icon={<DownloadOutlined />} onClick={handleExportCSV}>
                Xuất CSV
              </Button>
              <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                In
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Tổng đặt phòng" value={filteredBookings.length} valueStyle={{ color: "#1890ff" }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Đã xác nhận" value={confirmedCount} valueStyle={{ color: "#52c41a" }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Đã hủy" value={cancelledCount} valueStyle={{ color: "#f5222d" }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Tổng doanh thu" value={totalRevenue} suffix="đ" valueStyle={{ color: "#faad14" }} />
          </Card>
        </Col>
      </Row>

      <Card>
        <Table dataSource={filteredBookings} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  )
}
