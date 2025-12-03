"use client"

import { useState } from "react"
import { Form, Input, Button, Card, message, Steps, Result } from "antd"
import { MailOutlined, LockOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [form] = Form.useForm()
  const [resetForm] = Form.useForm()
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRequestReset = async (values: any) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setEmail(values.email)
      setStep(1)
      message.success("Liên kết đặt lại mật khẩu đã được gửi đến email của bạn!")
    } catch (error) {
      message.error("Không thể gửi liên kết đặt lại!")
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (values: any) => {
    if (values.password !== values.confirmPassword) {
      message.error("Mật khẩu không khớp!")
      return
    }

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStep(2)
      message.success("Mật khẩu đã được đặt lại thành công!")
      setTimeout(() => router.push("/login"), 3000)
    } catch (error) {
      message.error("Không thể đặt lại mật khẩu!")
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    { title: "Xác nhận Email", description: "Nhập email của bạn" },
    { title: "Đặt lại Mật khẩu", description: "Tạo mật khẩu mới" },
    { title: "Hoàn thành", description: "Mật khẩu đã được đặt lại" },
  ]

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <Link href="/login" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeftOutlined className="mr-2" />
          Quay lại
        </Link>

        <Steps current={step} items={steps} className="mb-8" />

        {step === 0 && (
          <Form form={form} name="forgot-password" onFinish={handleRequestReset} layout="vertical">
            <h2 className="text-xl font-bold mb-4">Quên Mật khẩu</h2>
            <p className="text-gray-600 mb-4">Nhập email của bạn để nhận liên kết đặt lại mật khẩu</p>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block loading={loading}>
                Gửi Liên kết Đặt lại
              </Button>
            </Form.Item>
          </Form>
        )}

        {step === 1 && (
          <Form form={resetForm} name="reset-password" onFinish={handleResetPassword} layout="vertical">
            <h2 className="text-xl font-bold mb-4">Đặt lại Mật khẩu</h2>
            <p className="text-gray-600 mb-4">Tạo mật khẩu mới cho tài khoản của bạn</p>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu mới" size="large" />
            </Form.Item>

            <Form.Item name="confirmPassword" rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu!" }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu" size="large" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block loading={loading}>
                Đặt lại Mật khẩu
              </Button>
            </Form.Item>
          </Form>
        )}

        {step === 2 && (
          <Result
            status="success"
            title="Mật khẩu đã được đặt lại thành công!"
            subTitle="Bạn sẽ được chuyển hướng đến trang đăng nhập..."
          />
        )}
      </Card>
    </div>
  )
}
