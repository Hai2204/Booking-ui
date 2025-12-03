"use client"

import { Card, Form, Input, Button, message, Divider, ArrowLeftOutlined } from "antd"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import Link from "next/link"
import { useState } from "react"

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleUpdateProfile = async (values: any) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      message.success("Cập nhật hồ sơ thành công!")
    } catch (error) {
      message.error("Cập nhật hồ sơ thất bại!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
        <ArrowLeftOutlined className="mr-2" />
        Quay lại
      </Link>

      <Card>
        <h1 className="text-2xl font-bold mb-6">Hồ sơ cá nhân</h1>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateProfile}
          initialValues={{
            name: user?.name,
            email: user?.email,
          }}
        >
          <Form.Item label="Họ tên" name="name" rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}>
            <Input placeholder="Họ tên" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Email" disabled />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="phone" rules={[{ message: "Số điện thoại không hợp lệ!" }]}>
            <Input placeholder="Số điện thoại" />
          </Form.Item>

          <Form.Item label="Địa chỉ" name="address">
            <Input placeholder="Địa chỉ" />
          </Form.Item>

          <Divider />

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" loading={loading}>
              Cập nhật Hồ sơ
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
