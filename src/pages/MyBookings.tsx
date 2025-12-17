"use client"

import { Layout, Table, Button, Modal, message, Spin, Empty, Space, Tag } from "antd"
import { DeleteOutlined, EyeOutlined, CalendarOutlined } from "@ant-design/icons"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../redux/store.ts"
import { fetchUserBookings, cancelBooking } from "../redux/slices/bookingSlice"
import Navbar from "../components/Navbar.tsx"

const { Content } = Layout

export default function MyBookings() {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const { userBookings, isLoading } = useSelector((state: RootState) => state.booking)

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserBookings(user.id) as any)
    }
  }, [dispatch, user?.id])

  const handleCancel = (bookingId: string) => {
    Modal.confirm({
      title: "Xác nhận hủy đặt phòng",
      content: "Bạn có chắc chắn muốn hủy đặt phòng này? Hành động này không thể hoàn tác.",
      okText: "Hủy đặt phòng",
      okType: "danger",
      cancelText: "Không",
      onOk: async () => {
        const result = await dispatch(cancelBooking(bookingId) as any)
        if (result.payload) {
          message.success("Hủy đặt phòng thành công")
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
      width: 100,
      render: (text: string) => <span className="font-mono text-xs">{text}</span>,
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
      render: (status: string) => <Tag color={getStatusColor(status)}>{getStatusLabel(status)}</Tag>,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              Modal.info({
                title: "Chi tiết đặt phòng",
                content: (
                  <div className="space-y-2">
                    <p>
                      <strong>ID:</strong> {record.id}
                    </p>
                    <p>
                      <strong>Phòng:</strong> {record.roomId}
                    </p>
                    <p>
                      <strong>Nhận phòng:</strong> {record.checkInDate}
                    </p>
                    <p>
                      <strong>Trả phòng:</strong> {record.checkOutDate}
                    </p>
                    <p>
                      <strong>Số đêm:</strong> {record.numberOfNights}
                    </p>
                    <p>
                      <strong>Tổng tiền:</strong> ${record.totalPrice}
                    </p>
                  </div>
                ),
              })
            }}
          >
            Xem
          </Button>
          <Button
            type="text"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleCancel(record.id)}
            disabled={record.status === "cancelled"}
          >
            Hủy
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Navbar />
      <Content className="p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <CalendarOutlined className="text-2xl text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Đặt phòng của tôi</h1>
          </div>

          {isLoading ? (
            <div className="flex justify-center p-12">
              <Spin size="large" tip="Đang tải đặt phòng..." />
            </div>
          ) : userBookings.length === 0 ? (
            <Empty description="Bạn chưa có đặt phòng nào" style={{ marginTop: "50px" }} />
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Table
                dataSource={userBookings}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                scroll={{ x: 1200 }}
              />
            </div>
          )}
        </div>
      </Content>
    </Layout>
  )
}
