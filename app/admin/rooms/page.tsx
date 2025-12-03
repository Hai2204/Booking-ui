"use client"

import { useState, useEffect } from "react"
import { Table, Button, Space, Popconfirm, message, Modal, Form, Input, InputNumber, Checkbox, Tag } from "antd"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "@/redux/store"
import { addRoom, updateRoom, deleteRoom, setRooms } from "@/redux/slices/roomSlice"
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"

const amenitiesList = ["WiFi", "TV", "Phòng tắm", "Ban công", "Minibar", "Jacuzzi", "Bếp nhỏ"]

export default function RoomManagementPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { rooms } = useSelector((state: RootState) => state.room)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRoom, setEditingRoom] = useState(null)
  const [form] = Form.useForm()
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Initialize with mock data if empty
    if (rooms.length === 0) {
      const mockRooms = [
        {
          id: "1",
          name: "Phòng Đơn",
          description: "Phòng đơn thoải mái",
          price: 500000,
          capacity: 1,
          image: "/placeholder.svg",
          amenities: ["WiFi", "TV", "Phòng tắm"],
          available: true,
        },
        {
          id: "2",
          name: "Phòng Đôi",
          description: "Phòng đôi rộng rãi",
          price: 750000,
          capacity: 2,
          image: "/placeholder.svg",
          amenities: ["WiFi", "TV", "Phòng tắm", "Ban công"],
          available: true,
        },
      ]
      dispatch(setRooms(mockRooms))
    }
  }, [dispatch, rooms.length])

  const handleAddClick = () => {
    setEditingRoom(null)
    setSelectedAmenities([])
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEditClick = (record: any) => {
    setEditingRoom(record)
    setSelectedAmenities(record.amenities)
    form.setFieldsValue(record)
    setIsModalVisible(true)
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)

      await new Promise((resolve) => setTimeout(resolve, 500))

      if (editingRoom) {
        dispatch(
          updateRoom({
            ...editingRoom,
            ...values,
            amenities: selectedAmenities,
          }),
        )
        message.success("Cập nhật phòng thành công!")
      } else {
        dispatch(
          addRoom({
            id: Math.random().toString(),
            ...values,
            amenities: selectedAmenities,
            image: "/placeholder.svg",
          }),
        )
        message.success("Thêm phòng thành công!")
      }

      setIsModalVisible(false)
    } catch (error) {
      message.error("Vui lòng kiểm tra lại thông tin!")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (id: string) => {
    dispatch(deleteRoom(id))
    message.success("Xóa phòng thành công!")
  }

  const columns = [
    {
      title: "Tên phòng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Giá/đêm",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()}đ`,
    },
    {
      title: "Sức chứa",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Tiện nghi",
      dataIndex: "amenities",
      key: "amenities",
      render: (amenities: string[]) => (
        <>
          {amenities.map((amenity) => (
            <Tag key={amenity} color="blue">
              {amenity}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Space>
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEditClick(record)} size="small">
            Sửa
          </Button>
          <Popconfirm
            title="Xóa phòng"
            description="Bạn có chắc chắn muốn xóa phòng này?"
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Quản lý Phòng</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClick}>
          Thêm Phòng
        </Button>
      </div>

      <Table dataSource={rooms} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} />

      <Modal
        title={editingRoom ? "Chỉnh sửa Phòng" : "Thêm Phòng mới"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleModalOk}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên phòng" rules={[{ required: true, message: "Vui lòng nhập tên phòng!" }]}>
            <Input placeholder="Tên phòng" />
          </Form.Item>

          <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}>
            <Input.TextArea placeholder="Mô tả phòng" rows={3} />
          </Form.Item>

          <Form.Item name="price" label="Giá/đêm (đ)" rules={[{ required: true, message: "Vui lòng nhập giá!" }]}>
            <InputNumber style={{ width: "100%" }} placeholder="Nhập giá" />
          </Form.Item>

          <Form.Item
            name="capacity"
            label="Sức chứa (người)"
            rules={[{ required: true, message: "Vui lòng nhập sức chứa!" }]}
          >
            <InputNumber style={{ width: "100%" }} placeholder="Nhập sức chứa" min={1} />
          </Form.Item>

          <Form.Item label="Tiện nghi">
            <Checkbox.Group
              options={amenitiesList}
              value={selectedAmenities}
              onChange={(values) => setSelectedAmenities(values as string[])}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
