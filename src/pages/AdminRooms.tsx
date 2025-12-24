"use client"

import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Form, Input, InputNumber, Layout, message, Modal, Select, Space, Table, Tag } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createRoom, deleteRoom, fetchRooms, updateRoom } from "@/redux/slices/roomSlice"
import type { RootState } from "@/redux/store"
import { toVND } from "lib/utils"

const { Content } = Layout


interface Partner {
  partnerId: number
  name: string
  contactInfo: string
}
interface Accommodation {
  accommodationId: number
  partner: Partner
  name: string
  accommodationType: string
  description: string
  city: string
  address: string
}

interface Room {
  id: number
  accommodation: Accommodation
  name: string
  typeRoom: number
  price: number
  active: number
  description: string
  amenities: string
  policy: string,
  roomCategory: string,
}

export default function AdminRooms() {
  const dispatch = useDispatch()
  const { rooms, isLoading } = useSelector((state: RootState) => state.room)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRoom, setEditingRoom] = useState<Room | null>(null)
  const [form] = Form.useForm()

  useEffect(() => {
    dispatch(fetchRooms() as any)
  }, [dispatch])

  const handleAdd = () => {
    setEditingRoom(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (room: Room) => {
    setEditingRoom(room)
    form.setFieldsValue({
      ...room,
      amenities: room.amenities || "",
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
    console.log(values);
    return;
    if (editingRoom) {
      const result = await dispatch(updateRoom({ roomId: editingRoom.id, payload: values }) as any)
      if (result.payload) {
        message.success("Cập nhật phòng thành công")
        setIsModalVisible(false)
      }
    } else {
      const result = await dispatch(createRoom(values) as any)
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
      dataIndex: "roomCategory",
      key: "roomCategory",
      render: (roomCategory: string) => <Tag color="blue">{roomCategory}</Tag>,
    },
    {
      title: "Giá / đêm",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <span className="font-semibold text-indigo-600">{toVND(price)}</span>,
    },
    {
      title: "Sức chứa",
      dataIndex: "typeRoom",
      key: "typeRoom",
      align: "center" as const,
      render: (typeRoom: number) => <Tag color="blue">{typeRoom} Người</Tag>,
    },
    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      render: (active: number) => (
        <Tag color={active == 1 ? "green" : "red"}>
          {active == 1 ? "Sẵn sàng" : "Không sẵn sàng"}
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
            style={{ top: 20 }}
            width={650}
          >
            <Form form={form} layout="vertical" onFinish={onFinish} className="mt-4">
              <Form.Item name="name" label="Tên phòng" rules={[{ required: true, message: "Vui lòng nhập tên phòng" }]}>
                <Input placeholder="VD: Phòng 101" />
              </Form.Item>

              <Form.Item
                name="roomCategory"
                label="Loại phòng"
                rules={[{ required: true, message: "Vui lòng chọn loại phòng" }]}
              >
                <Select placeholder="Chọn loại phòng">
                  <Select.Option value="DLX">Phòng Deluxe</Select.Option>
                  <Select.Option value="SUT">Phòng suite</Select.Option>
                  <Select.Option value="PEN">Phòng Penthouse</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="price"
                label="Giá / đêm (VND)"
                rules={[{ required: true, message: "Vui lòng nhập giá" }]}
              >
                <InputNumber min={0} placeholder="VD: 100" />
              </Form.Item>

              <Form.Item
                name="typeRoom"
                label="Sức chứa (khách)"
                rules={[{ required: true, message: "Vui lòng nhập sức chứa" }]}
              >
                <InputNumber min={1} placeholder="VD: 2" />
              </Form.Item>

              <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}>
                <Input.TextArea rows={4} placeholder="Mô tả chi tiết về phòng" />
              </Form.Item>

              <Form.Item name="amenities" label="Tiện nghi (cách nhau bằng dấu phẩy)" tooltip="VD: WiFi, TV, Điều hòa">
                <Input.TextArea rows={2} placeholder="WiFi, TV, Điều hòa, Nóng lạnh" />
              </Form.Item>

              <Form.Item name="active" label="Trạng thái">
                <Select>
                  <Select.Option value={1}>Sẵn sàng</Select.Option>
                  <Select.Option value={0}>Không sẵn sàng</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </Content>
    </Layout>
  )
}
