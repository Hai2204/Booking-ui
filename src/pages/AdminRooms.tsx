"use client"

import { Layout, Table, Button, Modal, Form, Input, InputNumber, Select, message, Space, Tag } from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import { fetchRooms, createRoom, updateRoom, deleteRoom } from "../redux/slices/roomSlice"
import Navbar from "../components/Navbar.tsx"

const { Content } = Layout

export default function AdminRooms() {
  const dispatch = useDispatch()
  const { rooms, isLoading } = useSelector((state: RootState) => state.room)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRoom, setEditingRoom] = useState<any>(null)
  const [form] = Form.useForm()

  useEffect(() => {
    dispatch(fetchRooms() as any)
  }, [dispatch])

  const handleAdd = () => {
    setEditingRoom(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (room: any) => {
    setEditingRoom(room)
    form.setFieldsValue({
      ...room,
      amenities: room.amenities?.join(",") || "",
    })
    setIsModalVisible(true)
  }

  const handleDelete = (roomId: string) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa phòng này? Hành động này không thể hoàn tác.",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Không",
      onOk: async () => {
        const result = await dispatch(deleteRoom(roomId) as any)
        if (result.payload) {
          message.success("Xóa phòng thành công")
        }
      },
    })
  }

  const onFinish = async (values: any) => {
    const amenities = values.amenities ? values.amenities.split(",").map((a: string) => a.trim()) : []

    const roomData = {
      ...values,
      amenities,
    }

    if (editingRoom) {
      const result = await dispatch(updateRoom({ roomId: editingRoom.id, payload: roomData }) as any)
      if (result.payload) {
        message.success("Cập nhật phòng thành công")
        setIsModalVisible(false)
      }
    } else {
      const result = await dispatch(createRoom(roomData) as any)
      if (result.payload) {
        message.success("Thêm phòng thành công")
        setIsModalVisible(false)
        form.resetFields()
      }
    }
  }

  const columns = [
    {
      title: "Tên phòng",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span className="font-semibold">{text}</span>,
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type: string) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "Giá / đêm",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <span className="font-semibold text-indigo-600">${price}</span>,
    },
    {
      title: "Sức chứa",
      dataIndex: "capacity",
      key: "capacity",
      align: "center" as const,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "available" ? "green" : "red"}>
          {status === "available" ? "Sẵn sàng" : "Không sẵn sàng"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Navbar />
      <Content className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Quản lý phòng</h1>
              <p className="text-gray-600 text-sm mt-1">Tổng cộng: {rooms.length} phòng</p>
            </div>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className="rounded-lg h-10">
              Thêm phòng mới
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Table
              dataSource={rooms}
              columns={columns}
              rowKey="id"
              loading={isLoading}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1000 }}
            />
          </div>

          <Modal
            title={editingRoom ? "Cập nhật phòng" : "Thêm phòng mới"}
            open={isModalVisible}
            onOk={() => form.submit()}
            onCancel={() => setIsModalVisible(false)}
            width={600}
          >
            <Form form={form} layout="vertical" onFinish={onFinish} className="mt-4">
              <Form.Item name="name" label="Tên phòng" rules={[{ required: true, message: "Vui lòng nhập tên phòng" }]}>
                <Input placeholder="VD: Phòng 101" />
              </Form.Item>

              <Form.Item
                name="type"
                label="Loại phòng"
                rules={[{ required: true, message: "Vui lòng chọn loại phòng" }]}
              >
                <Select placeholder="Chọn loại phòng">
                  <Select.Option value="single">Phòng đơn</Select.Option>
                  <Select.Option value="double">Phòng đôi</Select.Option>
                  <Select.Option value="suite">Phòng suite</Select.Option>
                  <Select.Option value="deluxe">Phòng deluxe</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="price"
                label="Giá / đêm (USD)"
                rules={[{ required: true, message: "Vui lòng nhập giá" }]}
              >
                <InputNumber min={0} placeholder="VD: 100" />
              </Form.Item>

              <Form.Item
                name="capacity"
                label="Sức chứa (khách)"
                rules={[{ required: true, message: "Vui lòng nhập sức chứa" }]}
              >
                <InputNumber min={1} placeholder="VD: 2" />
              </Form.Item>

              <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}>
                <Input.TextArea rows={3} placeholder="Mô tả chi tiết về phòng" />
              </Form.Item>

              <Form.Item name="amenities" label="Tiện nghi (cách nhau bằng dấu phẩy)" tooltip="VD: WiFi, TV, Điều hòa">
                <Input.TextArea rows={2} placeholder="WiFi, TV, Điều hòa, Nóng lạnh" />
              </Form.Item>

              <Form.Item name="image" label="URL hình ảnh">
                <Input placeholder="https://example.com/image.jpg" />
              </Form.Item>

              <Form.Item name="status" label="Trạng thái" initialValue="available">
                <Select>
                  <Select.Option value="available">Sẵn sàng</Select.Option>
                  <Select.Option value="booked">Đã đặt</Select.Option>
                  <Select.Option value="maintenance">Bảo trì</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </Content>
    </Layout>
  )
}
