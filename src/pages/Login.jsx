"use client"

import { Form, Input, Button, Card, Tabs, message } from "antd"
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login, register } from "../redux/slices/authSlice"
import { useEffect } from "react"

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading, isAuthenticated, error } = useSelector((state) => state.auth)
  const [loginForm] = Form.useForm()
  const [registerForm] = Form.useForm()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  const onFinishLogin = async (values) => {
    const result = await dispatch(login(values));
    if (!!result?.payload && !!result?.payload?.id) {
      message.success("Đăng nhập thành công")
      navigate("/dashboard")
    } else {
      message.error(result.payload || "Đăng nhập thất bại")
    }
  }

  const onFinishRegister = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error("Mật khẩu không khớp")
      return
    }
    const { confirmPassword, ...registerData } = values
    const result = await dispatch(register(registerData))
    if (result.payload) {
      message.success("Đăng ký thành công")
      navigate("/dashboard")
    } else {
      message.error(result.payload || "Đăng ký thất bại")
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        // background: "linear-gradient(to bottom right, #f0f5ff, rgba(255,255,255,0.8), #e6f7ff)",
        backgroundImage: "url(https://i0.wp.com/picjumbo.com/wp-content/uploads/calming-nature-wallpaper-free-image.jpeg?w=600&quality=80)",
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat', 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "480px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          border: "none",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              background: "linear-gradient(to right, #1890ff, #1890ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "8px",
            }}
          >
            Booking
          </div>
          <p style={{ color: "#666" }}>Hệ thống đặt phòng trực tuyến</p>
        </div>

        {error && (
          <div
            style={{
              background: "#fff2f0",
              border: "1px solid #ffccc7",
              color: "#cf1322",
              padding: "12px",
              borderRadius: "4px",
              marginBottom: "16px",
              fontSize: "12px",
            }}
          >
            {error}
          </div>
        )}

        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Đăng nhập" key="1">
            <Form
              form={loginForm}
              layout="vertical"
              onFinish={onFinishLogin}
              onSubmit={(e) => e.preventDefault()}
              style={{ marginTop: "16px" }}
            >
              <Form.Item
                name="username"
                label="Tên đăng nhập"
                rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: "#999" }} />}
                  placeholder="username"
                  size="large"
                  style={{ borderRadius: "4px" }}
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "#999" }} />}
                  placeholder="••••••••"
                  size="large"
                  style={{ borderRadius: "4px" }}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit"
                  block
                  size="large"
                  loading={isLoading}
                  style={{ height: "40px", borderRadius: "4px", fontWeight: "600" }}
                >
                  Đăng nhập
                </Button>
              </Form.Item>

              <div style={{ textAlign: "center" }}>
                <Link to="/forgot-password" style={{ color: "#1890ff", textDecoration: "none", fontSize: "12px" }}>
                  Quên mật khẩu?
                </Link>
              </div>
            </Form>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Đăng ký" key="2">
            <Form
              form={registerForm}
              layout="vertical"
              onFinish={onFinishRegister}
              onSubmit={(e) => e.preventDefault()}
              style={{ marginTop: "16px" }}
            >
              <Form.Item name="fullName" label="Họ và tên" rules={[{ required: true, message: "Vui lòng nhập tên" }]}>
                <Input
                  prefix={<UserOutlined style={{ color: "#999" }} />}
                  placeholder="Nguyễn Văn A"
                  size="large"
                  style={{ borderRadius: "4px" }}
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input
                  prefix={<MailOutlined style={{ color: "#999" }} />}
                  placeholder="your@email.com"
                  size="large"
                  style={{ borderRadius: "4px" }}
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  { required: true, message: "Vui lòng nhập SĐT" },
                  { pattern: /^[0-9]{10,11}$/, message: "SĐT phải 10-11 chữ số" },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined style={{ color: "#999" }} />}
                  placeholder="0123456789"
                  size="large"
                  style={{ borderRadius: "4px" }}
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu" },
                  { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "#999" }} />}
                  placeholder="••••••••"
                  size="large"
                  style={{ borderRadius: "4px" }}
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Xác nhận mật khẩu"
                rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu" }]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "#999" }} />}
                  placeholder="••••••••"
                  size="large"
                  style={{ borderRadius: "4px" }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={isLoading}
                  style={{ height: "40px", borderRadius: "4px", fontWeight: "600" }}
                >
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  )
}
