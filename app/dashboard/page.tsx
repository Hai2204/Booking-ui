"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, Row, Col, Tag, Button, Empty, DatePicker, message, Modal, Form } from "antd"
import type { AppDispatch, RootState } from "@/redux/store"
import { setRooms } from "@/redux/slices/roomSlice"
import { addBooking } from "@/redux/slices/bookingSlice"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"

interface RoomCard {
  id: string
  name: string
  description: string
  price: number
  capacity: number
  image: string
  amenities: string[]
  available: boolean
}

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { rooms } = useSelector((state: RootState) => state.room)
  const { user } = useSelector((state: RootState) => state.auth)
  const [selectedRoom, setSelectedRoom] = useState<RoomCard | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null)
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load mock rooms data
    const mockRooms: RoomCard[] = [
      {
        id: "1",
        name: "Phòng Đơn",
        description: "Phòng đơn thoải mái và sạch sẽ",
        price: 500000,
        capacity: 1,
        image: "./public/single-room-hotel.jpg",
        amenities: ["WiFi", "TV", "Phòng tắm"],
        available: true,
      },
      {
        id: "2",
        name: "Phòng Đôi",
        description: "Phòng đôi rộng rãi với giường King Size",
        price: 750000,
        capacity: 2,
        image: "./public/double-room-hotel.jpg",
        amenities: ["WiFi", "TV", "Phòng tắm", "Ban công"],
        available: true,
      },
      {
        id: "3",
        name: "Phòng Gia đình",
        description: "Phòng gia đình với không gian rộng",
        price: 1000000,
        capacity: 4,
        image: "./public/family-room-hotel.jpg",
        amenities: ["WiFi", "TV", "Phòng tắm", "Ban công", "Bếp nhỏ"],
        available: true,
      },
      {
        id: "4",
        name: "Phòng Suite",
        description: "Phòng Suite cao cấp với đầy đủ tiện nghi",
        price: 1500000,
        capacity: 2,
        image: "./public/luxury-suite-hotel.jpg",
        amenities: ["WiFi", "TV", "Phòng tắm", "Ban công", "Minibar", "Jacuzzi"],
        available: true,
      },
    ]
    dispatch(setRooms(mockRooms))
  }, [dispatch])

  const handleBookingClick = (room: RoomCard) => {
    setSelectedRoom(room)
    setIsModalVisible(true)
    form.resetFields()
  }

  const handleBooking = async (values: any) => {
    if (!checkInDate || !checkOutDate) {
      message.error("Vui lòng chọn ngày nhận và ngày trả phòng!")
      return
    }

    if (checkOutDate.isBefore(checkInDate)) {
      message.error("Ngày trả phòng phải sau ngày nhận phòng!")
      return
    }

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const nights = checkOutDate.diff(checkInDate, "day")
      const totalPrice = (selectedRoom?.price ?? 0) * nights

      const booking = {
        id: Math.random().toString(),
        roomId: selectedRoom?.id ?? "",
        userId: user?.id ?? "",
        checkInDate: checkInDate.format("YYYY-MM-DD"),
        checkOutDate: checkOutDate.format("YYYY-MM-DD"),
        totalPrice,
        status: "confirmed" as const,
        createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      }

      dispatch(addBooking(booking))
      message.success(`Đặt phòng thành công! Tổng giá: ${totalPrice.toLocaleString()} đ`)
      setIsModalVisible(false)
      setCheckInDate(null)
      setCheckOutDate(null)
    } catch (error) {
      message.error("Đặt phòng thất bại!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Danh sách Phòng</h1>

      {rooms.length === 0 ? (
        <Empty description="Không có phòng nào" />
      ) : (
        <Row gutter={[16, 16]}>
          {rooms.map((room :any) => (
            <Col key={room.id} xs={24} sm={12} lg={6}>
              <Card
                hoverable
                cover={<img alt={room.name} src={room.image || "/placeholder.svg"} className="h-40 object-cover" />}
              >
                <h3 className="text-lg font-bold mb-2">{room.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{room.description}</p>
                <div className="mb-3">
                  <Tag color="blue">Sức chứa: {room.capacity} người</Tag>
                </div>
                <div className="mb-3">
                  {room.amenities.map((amenity) => (
                    <Tag key={amenity} color="cyan" className="mb-1">
                      {amenity}
                    </Tag>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600">{room.price.toLocaleString()}đ/đêm</span>
                  <Button type="primary" onClick={() => handleBookingClick(room)} disabled={!room.available}>
                    Đặt phòng
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal
        title={`Đặt phòng - ${selectedRoom?.name}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical" onFinish={handleBooking}>
          <Form.Item label="Ngày nhận phòng" required>
            <DatePicker
              value={checkInDate}
              onChange={setCheckInDate}
              disabledDate={(current) => current && current < dayjs().startOf("day")}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Ngày trả phòng" required>
            <DatePicker
              value={checkOutDate}
              onChange={setCheckOutDate}
              disabledDate={(current) => !checkInDate || (current && current <= checkInDate)}
              style={{ width: "100%" }}
            />
          </Form.Item>

          {checkInDate && checkOutDate && (
            <div className="bg-blue-50 p-3 rounded mb-4">
              <p className="text-sm">
                Số đêm: <strong>{checkOutDate.diff(checkInDate, "day")}</strong>
              </p>
              <p className="text-sm">
                Giá/đêm: <strong>{selectedRoom?.price.toLocaleString()}đ</strong>
              </p>
              <p className="text-sm font-bold text-blue-600">
                Tổng giá:{" "}
                <strong>
                  {((selectedRoom?.price ?? 0) * checkOutDate.diff(checkInDate, "day")).toLocaleString()}đ
                </strong>
              </p>
            </div>
          )}
        </Form>
      </Modal>
    </div>
  )
}
