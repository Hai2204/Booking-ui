"use client"

import { Table, Button, Popconfirm, message, Select, Empty } from "antd"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "@/redux/store"
import { updateBooking, deleteBooking } from "@/redux/slices/bookingSlice"
import { DeleteOutlined } from "@ant-design/icons"

export default function BookingManagementPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { bookings } = useSelector((state: RootState) => state.booking)

  const handleStatusChange = (id: string, newStatus: string) => {
    const booking = bookings.find((b) => b.id === id)
    if (booking) {
      dispatch(
        updateBooking({
          ...booking,
          status: newStatus as "pending" | "confirmed" | "cancelled",
        }),
      )
      message.success("Cập nhật trạng thái thành công!")
    }
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
      title: "Mã khách hàng",
      dataIndex: "userId",
      key: "userId",
      render: (text: string) => text.substring(0, 8),
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
      render: (status: string, record: any) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record.id, value)}
          style={{ width: 120 }}
          options={[
            { label: "Pending", value: "pending" },
            { label: "Confirmed", value: "confirmed" },
            { label: "Cancelled", value: "cancelled" },
          ]}
        />
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Popconfirm
          title="Xóa đặt phòng"
          description="Bạn có chắc chắn muốn xóa đặt phòng này?"
          onConfirm={() => handleDelete(record.id)}
          okText="Có"
          cancelText="Không"
        >
          <Button danger icon={<DeleteOutlined />} size="small" />
        </Popconfirm>
      ),
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quản lý Đặt phòng</h1>
      {bookings.length === 0 ? (
        <Empty description="Không có đặt phòng nào" />
      ) : (
        <Table dataSource={bookings} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} />
      )}
    </div>
  )
}
