"use client"

import { Table, Button, Tag, Space, Popconfirm, message, Empty } from "antd"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "@/redux/store"
import { updateBooking, deleteBooking } from "@/redux/slices/bookingSlice"
import { DeleteOutlined } from "@ant-design/icons"

export default function MyBookingsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { myBookings } = useSelector((state: RootState) => state.booking)

  const handleCancel = (id: string) => {
    dispatch(
      updateBooking({
        ...myBookings.find((b) => b.id === id)!,
        status: "cancelled",
      }),
    )
    message.success("Hủy đặt phòng thành công!")
  }

  const handleDelete = (id: string) => {
    dispatch(deleteBooking(id))
    message.success("Xóa đặt phòng thành công!")
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => text.substring(0, 8),
    },
    {
      title: "Mã phòng",
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
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Space>
          {record.status === "confirmed" && (
            <Popconfirm
              title="Hủy đặt phòng"
              description="Bạn có chắc chắn muốn hủy đặt phòng này?"
              onConfirm={() => handleCancel(record.id)}
              okText="Có"
              cancelText="Không"
            >
              <Button danger size="small">
                Hủy
              </Button>
            </Popconfirm>
          )}
          <Popconfirm
            title="Xóa đặt phòng"
            description="Bạn có chắc chắn muốn xóa đặt phòng này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Đặt phòng của tôi</h1>
      {myBookings.length === 0 ? (
        <Empty description="Bạn chưa có đặt phòng nào" />
      ) : (
        <Table dataSource={myBookings} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} />
      )}
    </div>
  )
}
