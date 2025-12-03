"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useRouter, useSearchParams } from "next/navigation"
import { Form, Input, Button, Card, message, Tabs } from "antd"
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons"
import { setUser, setToken } from "@/redux/slices/authSlice"
import Link from "next/link"
import type { TabsProps } from "antd"

export default function LoginPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoadingState] = useState(false)
  const [form] = Form.useForm()
  const [registerForm] = Form.useForm()

  const handleLogin = async (values: any) => {
    setLoadingState(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser = {
        id: "1",
        email: values.email,
        name: values.email.split("@")[0],
        role: "customer" as const,
      }

      dispatch(setUser(mockUser))
      dispatch(setToken("mock-token"))
      message.success("Đăng nhập thành công!")
      router.push("/dashboard")
    } catch (error) {
      message.error("Đăng nhập thất bại!")
    } finally {
      setLoadingState(false)
    }
  }

  const handleRegister = async (values: any) => {
    if (values.password !== values.confirmPassword) {
      message.error("Mật khẩu không khớp!")
      return
    }

    setLoadingState(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser = {
        id: Math.random().toString(),
        email: values.email,
        name: values.name,
        role: "customer" as const,
      }

      dispatch(setUser(mockUser))
      dispatch(setToken("mock-token"))
      message.success("Đăng ký thành công!")
      router.push("/dashboard")
    } catch (error) {
      message.error("Đăng ký thất bại!")
    } finally {
      setLoadingState(false)
    }
  }

  const loginItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Đăng nhập",
      children: (
        <Form form={form} name="login" onFinish={handleLogin} layout="vertical" autoComplete="off">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={loading}>
              Đăng nhập
            </Button>
          </Form.Item>

          <div className="text-center">
            <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800">
              Quên mật khẩu?
            </Link>
          </div>
        </Form>
      ),
    },
    {
      key: "2",
      label: "Đăng ký",
      children: (
        <Form form={registerForm} name="register" onFinish={handleRegister} layout="vertical" autoComplete="off">
          <Form.Item name="name" rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}>
            <Input prefix={<UserOutlined />} placeholder="Họ tên" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
          </Form.Item>

          <Form.Item name="confirmPassword" rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu!" }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={loading}>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ]

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">BookingApp</h1>
          <p className="text-gray-600 mt-2">Đặt phòng trực tuyến</p>
        </div>
        <Tabs items={loginItems} />
      </Card>
    </div>
  )
}
