"use client"

import { Form, Input, Button, Card, message } from "antd"
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { useNavigate, Link } from "react-router-dom"
import { authService } from "../services/authService"
import { useState } from "react"

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      const response = await authService.forgotPassword(values.email)
      if (response.success) {
        message.success("Vui lòng kiểm tra email để đặt lại mật khẩu")
        form.resetFields()
        setTimeout(() => navigate("/login"), 2000)
      } else {
        message.error(response.message)
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || "Có lỗi xảy ra")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quên mật khẩu</h1>
          <p className="text-gray-600 text-sm">Nhập email để nhận link đặt lại mật khẩu</p>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="your@email.com"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              className="h-10 rounded-lg font-semibold"
            >
              Gửi link đặt lại
            </Button>
          </Form.Item>

          <div className="text-center">
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center justify-center gap-1"
            >
              <ArrowLeftOutlined />
              Quay lại đăng nhập
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  )
}
