"use client"

import { Form, Input, Button, Card, message } from "antd"
import { LockOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "react-router-dom"
import { authService } from "../services/authService"
import { useState } from "react"

export default function ResetPassword() {
  const navigate = useNavigate()
  const { token } = useParams<{ token: string }>()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    if (values.password !== values.confirmPassword) {
      message.error("Mật khẩu không khớp")
      return
    }

    if (!token) {
      message.error("Link không hợp lệ")
      return
    }

    setLoading(true)
    try {
      const response = await authService.resetPassword(token, values.password)
      if (response.success) {
        message.success("Đặt lại mật khẩu thành công")
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Đặt lại mật khẩu</h1>
          <p className="text-gray-600 text-sm">Nhập mật khẩu mới của bạn</p>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="password"
            label="Mật khẩu mới"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu" },
              { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="••••••••"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="••••••••"
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
              Cập nhật mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
