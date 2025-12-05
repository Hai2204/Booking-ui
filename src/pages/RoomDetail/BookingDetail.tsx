"use client"

import { CalendarOutlined, CreditCardOutlined, UserSwitchOutlined } from "@ant-design/icons"
import { Button, Card, Col, DatePicker, Divider, Form, Input, Layout, message, Row, Spin, Steps, Tag } from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { createBooking } from "../../redux/slices/bookingSlice"
import type { RootState } from "../../redux/store"
import { paymentService } from "../../services/paymentService"
import { roomService } from "../../services/roomService"

const { Content } = Layout

export default function BookingDetail() {
  const { roomId } = useParams<{ roomId: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading: bookingLoading } = useSelector((state: RootState) => state.booking)
  const [room, setRoom] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [numberOfNights, setNumberOfNights] = useState(1)
  const [currentStep, setCurrentStep] = useState(0)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await roomService.getRoomById(roomId)
        if (response.success) {
          setRoom(response.data)
        } else {
          message.error("Không tìm thấy phòng")
        }
      } catch (error) {
        message.error("Lỗi khi tải thông tin phòng")
      } finally {
        setLoading(false)
      }
    }
    fetchRoom()
  }, [roomId])

  const handleDatesChange = (dates: any) => {
    if (dates && dates[0] && dates[1]) {
      const nights = dates[1].diff(dates[0], "days")
      setNumberOfNights(Math.max(nights, 1))
    }
  }

  const onFinish = async (values: any) => {
    setCurrentStep(1)

    const result = await dispatch(
      createBooking({
        roomId: roomId!,
        checkInDate: values.dates[0].format("YYYY-MM-DD"),
        checkOutDate: values.dates[1].format("YYYY-MM-DD"),
        numberOfGuests: values.numberOfGuests,
      }) as any,
    )

    if (result.payload) {
      setCurrentStep(2)

      try {
        setPaymentLoading(true)
        const paymentResult = await paymentService.processPayment({
          bookingId: result.payload.id,
          amount: totalPrice,
          paymentMethod: "credit_card",
        })

        if (paymentResult.success) {
          message.success("Đặt phòng và thanh toán thành công!")
          setTimeout(() => navigate("/my-bookings"), 2000)
        } else {
          message.error("Thanh toán thất bại")
          setCurrentStep(1)
        }
      } catch (error) {
        message.error("Lỗi xử lý thanh toán")
        setCurrentStep(1)
      } finally {
        setPaymentLoading(false)
      }
    } else {
      message.error(result.payload || "Đặt phòng thất bại")
      setCurrentStep(0)
    }
  }

  if (loading)
    return (
      <Layout className="min-h-screen">
        <Navbar />
        <Content className="flex items-center justify-center">
          <Spin size="large" tip="Đang tải..." />
        </Content>
      </Layout>
    )

  if (!room)
    return (
      <Layout className="min-h-screen">
        <Navbar />
        <Content className="p-6 text-center">
          <h1>Phòng không tìm thấy</h1>
        </Content>
      </Layout>
    )

  const totalPrice = room.price * numberOfNights

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Navbar />
      <Content className="p-4 md:p-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Đặt phòng</h1>
            <Steps current={currentStep} style={{ marginTop: 16 }}>
              <Steps.Step title="Chọn ngày" description="Chọn ngày nhận/trả" />
              <Steps.Step title="Xác nhận" description="Xác nhận thông tin" />
              <Steps.Step title="Thành công" description="Đặt phòng thành công" />
            </Steps>
          </div>

          <Row gutter={24}>
            <Col xs={24} lg={12}>
              <Card className="shadow-md border-0 h-full">
                <img
                  src={room.image || "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
                  alt={room.name}
                  className="w-full h-72 object-cover rounded-lg mb-4"
                />

                <h2 className="text-3xl font-bold mb-4 text-gray-800">{room.name}</h2>
                <p className="text-gray-600 mb-6">{room.description}</p>

                <Divider />

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loại phòng:</span>
                    <span className="font-semibold">{room.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sức chứa:</span>
                    <span className="font-semibold">{room.capacity} khách</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giá / đêm:</span>
                    <span className="font-semibold text-lg text-indigo-600">${room.price}</span>
                  </div>
                  {room.status && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trạng thái:</span>
                      <Tag color={room.status === "available" ? "green" : "red"}>
                        {room.status === "available" ? "Có sẵn" : "Đã đặt"}
                      </Tag>
                    </div>
                  )}
                </div>

                <Divider />

                <h3 className="font-semibold text-gray-800 mb-3">Tiện nghi:</h3>
                <div className="flex gap-2 flex-wrap">
                  {room.amenities?.map((amenity) => (
                    <Tag key={amenity} color="blue">
                      {amenity}
                    </Tag>
                  ))}
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card className="shadow-md border-0">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Thông tin đặt phòng</h3>

                <Form form={form} layout="vertical" onFinish={onFinish}>
                  <Form.Item
                    name="dates"
                    label={
                      <span className="flex items-center gap-2">
                        <CalendarOutlined />
                        Ngày nhận - Trả phòng
                      </span>
                    }
                    rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
                  >
                    <DatePicker.RangePicker
                      onChange={handleDatesChange}
                      disabledDate={(current) => current && current < dayjs().startOf("day")}
                      style={{ width: "100%" }}
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="numberOfGuests"
                    label={
                      <span className="flex items-center gap-2">
                        <UserSwitchOutlined />
                        Số lượng khách
                      </span>
                    }
                    rules={[
                      { required: true, message: "Vui lòng nhập số khách" },
                      {
                        validator: (_, value) => {
                          if (!value) return Promise.resolve()
                          if (value > room.capacity) {
                            return Promise.reject(new Error(`Tối đa ${room.capacity} khách`))
                          }
                          return Promise.resolve()
                        },
                      },
                    ]}
                  >
                    <Input type="number" min="1" max={room.capacity} size="large" placeholder="Nhập số khách" />
                  </Form.Item>

                  <Divider />

                  <Card className="bg-indigo-50 border-indigo-200 mb-6 rounded-lg">
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-700">
                        <span>Số đêm:</span>
                        <span className="font-semibold">{numberOfNights}</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Giá / đêm:</span>
                        <span className="font-semibold">${room.price}</span>
                      </div>
                      <Divider style={{ margin: "12px 0" }} />
                      <div className="flex justify-between text-lg">
                        <span className="font-bold">Tổng cộng:</span>
                        <span className="font-bold text-indigo-600">${totalPrice}</span>
                      </div>
                    </div>
                  </Card>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      size="large"
                      loading={bookingLoading || paymentLoading}
                      disabled={room.status !== "available"}
                      icon={<CreditCardOutlined />}
                      className="h-12 text-base rounded-lg font-semibold"
                    >
                      {bookingLoading || paymentLoading ? "Đang xử lý..." : "Đặt phòng & Thanh toán"}
                    </Button>
                  </Form.Item>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Bằng cách nhấp vào nút trên, bạn đồng ý với điều khoản dịch vụ
                  </p>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  )
}
