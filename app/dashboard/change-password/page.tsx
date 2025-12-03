"use client"

import { Form, Input, Button, Card, message } from "antd"
import { LockOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"

export default function ChangePasswordPage() {
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleChangePassword = async (values: any) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Mật khẩu mới không khớp!")
      return
    }

    if (values.newPassword === values.currentPassword) {
      message.error("Mật khẩu mới không được trùng với mật khẩu hiện tại!")
      return
    }

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      message.success("Đổi mật khẩu thành công!")
      form.resetFields()
    } catch (error) {
      message.error("Đổi mật khẩu thất bại!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
        <ArrowLeftOutlined className="mr-2" />
        Quay lại
      </Link>

      <Card>
        <h1 className="text-2xl font-bold mb-6">Đổi Mật khẩu</h1>

        <Form form={form} name="change-password" layout="vertical" onFinish={handleChangePassword}>
          <Form.Item
            name="currentPassword"
            label="Mật khẩu hiện tại"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu hiện tại" size="large" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu mới" size="large" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={loading}>
              Đổi Mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
