"use client"

import { Layout, Table, Button, Modal, Select, message, Space, Input } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import { fetchAllBookings, updateBookingStatus, cancelBooking } from "../redux/slices/bookingSlice"
import Navbar from "../components/Navbar.tsx"

const { Content } = Layout

export default function AdminBookings() {
  const dispatch = useDispatch()
  const { bookings, isLoading } = useSelector((state: RootState) => state.booking)
  const [filteredBookings, setFilteredBookings] = useState([])
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    dispatch(fetchAllBookings() as any)
  }, [dispatch])

  useEffect(() => {
    let filtered = bookings
    if (statusFilter !== "all") {
      filtered = filtered.filter((b) => b.status === statusFilter)
    }
    if (searchText) {
      filtered = filtered.filter(
        (b) =>
          b.id.toLowerCase().includes(searchText.toLowerCase()) ||
          b.roomId.toLowerCase().includes(searchText.toLowerCase()),
      )
    }
    setFilteredBookings(filtered)
  }, [bookings, statusFilter, searchText])

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    Modal.confirm({
      title: "Cập nhật trạng thái",
      content: `Bạn có chắc chắn muốn cập nhật trạng thái thành "${newStatus}"?`,
      okText: "Cập nhật",
      cancelText: "Không",
      onOk: async () => {
        const result = await dispatch(updateBookingStatus({ bookingId, status: newStatus }) as any)
        if (result.payload) {
          message.success("Cập nhật trạng thái thành công")
        }
      },
    })
  }

  const handleDelete = (bookingId: string) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa đặt phòng này?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Không",
      onOk: async () => {
        const result = await dispatch(cancelBooking(bookingId) as any)
        if (result.payload) {
          message.success("Xóa đặt phòng thành công")
        }
      },
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "green"
      case "pending":
        return "orange"
      case "cancelled":
        return "red"
      default:
        return "blue"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Xác nhận"
      case "pending":
        return "Chờ xử lý"
      case "cancelled":
        return "Hủy"
      default:
        return status
    }
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 120,
      render: (text: string) => <span className="font-mono text-xs">{text.slice(0, 8)}</span>,
    },
    {
      title: "Phòng",
      dataIndex: "roomId",
      key: "roomId",
    },
    {
      title: "Khách hàng",
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
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => <span className="font-semibold text-indigo-600">${price}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any) => (
        <Select
          value={status}
          style={{ width: 110 }}
          onChange={(value) => handleStatusChange(record.id, value)}
          size="small"
        >
          <Select.Option value="pending">Chờ xử lý</Select.Option>
          <Select.Option value="confirmed">Xác nhận</Select.Option>
          <Select.Option value="cancelled">Hủy</Select.Option>
        </Select>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
          Xóa
        </Button>
      ),
    },
  ]

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Navbar />
      <Content className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Quản lý đặt phòng</h1>
            <Space wrap>
              <Input
                placeholder="Tìm kiếm theo ID hoặc phòng..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 250 }}
              />
              <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 150 }}>
                <Select.Option value="all">Tất cả</Select.Option>
                <Select.Option value="pending">Chờ xử lý</Select.Option>
                <Select.Option value="confirmed">Xác nhận</Select.Option>
                <Select.Option value="cancelled">Hủy</Select.Option>
              </Select>
            </Space>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Table
              dataSource={filteredBookings}
              columns={columns}
              rowKey="id"
              loading={isLoading}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1200 }}
            />
          </div>
        </div>
      </Content>
    </Layout>
  )
}
