"use client"

import { Button, Card, Checkbox, Col, Form, Input, Layout, message, Row, Space, Tabs } from "antd"
import { ArrowLeft, Lock, Mail, Phone, User } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login, register } from "../../redux/slices/authSlice"
import "./index.css"

const { Content } = Layout

export default function LoginPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoading, isAuthenticated } = useSelector((state: any) => state.auth)
    const [activeTab, setActiveTab] = useState("1")

    const [loginForm] = Form.useForm()
    const [registerForm] = Form.useForm()

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard")
        }
    }, [isAuthenticated, navigate])

    const onFinishLogin = async (values: any) => {
        const result = await dispatch(login(values) as any)
        if (!!result?.payload && !!result?.payload?.id) {
            message.success("Đăng nhập thành công")
            navigate("/dashboard")
        } else {
            message.error(result.payload || "Đăng nhập thất bại")
        }
    }

    const onFinishRegister = async (values: any) => {
        if (values.password !== values.confirmPassword) {
            message.error("Mật khẩu không khớp")
            return
        }
        const { confirmPassword, ...registerData } = values
        const result = await dispatch(register(registerData) as any)
        if (result?.payload) {
            message.success("Đăng ký thành công")
            navigate("/dashboard")
        } else {
            message.error(result?.payload || "Đăng ký thất bại")
        }
    }

    const tabItems = [
        {
            key: "1",
            label: "Đăng nhập",
            children: (
                <Form
                    form={loginForm}
                    layout="vertical"
                    onFinish={onFinishLogin}
                    style={{ marginTop: "16px" }}
                >
                    <Form.Item
                        name="username"
                        label="Tên đăng nhập"
                        rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
                    >
                        <Input
                            placeholder="username"
                            prefix={<User size={16} color="#b89968" />}
                            className="input"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}>
                        <Input.Password
                            placeholder="••••••••"
                            prefix={<Lock size={16} color="#b89968" />}
                            className="input"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <div className="rememberForgot">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox style={{ color: "#666" }}>Ghi nhớ tôi</Checkbox>
                            </Form.Item>
                            <Link to="/forgot-password" className="forgotLink">
                                Quên mật khẩu?
                            </Link>
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            loading={isLoading}
                            className="submitBtn"
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
        {
            key: "2",
            label: "Đăng ký",
            children: (
                <Form
                    form={registerForm}
                    layout="vertical"
                    onFinish={onFinishRegister}
                    style={{ marginTop: "16px" }}
                    autoComplete="off"
                >
                    <Form.Item name="fullName" label="Họ và tên" rules={[{ required: true, message: "Vui lòng nhập tên" }]}>
                        <Input
                            prefix={<User size={16} color="#b89968" />}
                            placeholder="Nguyễn Văn A"
                            className="input"
                            size="large"
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
                            prefix={<Mail size={16} color="#b89968" />}
                            placeholder="your@email.com"
                            className="input"
                            size="large"
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
                            prefix={<Phone size={16} color="#b89968" />}
                            placeholder="0123456789"
                            className="input"
                            size="large"
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
                            prefix={<Lock size={16} color="#b89968" />}
                            placeholder="••••••••"
                            className="input"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Xác nhận mật khẩu"
                        rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu" }]}
                    >
                        <Input.Password
                            prefix={<Lock size={16} color="#b89968" />}
                            placeholder="••••••••"
                            className="input"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            loading={isLoading}
                            className="submitBtn"
                        >
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
    ]

    return (
        <Layout className="layout">
            <Content className="content">
                <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
                    <Col xs={22} sm={20} md={12} lg={6}>
                        <div className="header">
                            <Link to="/" className="backLink">
                                <ArrowLeft size={18} />
                                Quay lại trang chủ
                            </Link>
                        </div>

                        <Card className="authCard">
                            <div className="cardHeader">
                                <h1 className="title">Booking</h1>
                                <p className="subtitle">Hệ thống đặt phòng trực tuyến</p>
                            </div>

                            <Tabs defaultActiveKey="1" activeKey={activeTab} onChange={setActiveTab} items={tabItems} />

                            {
                                activeTab === "1" && (
                                    <div>

                                        <div className="divider">
                                            <span>Hoặc</span>
                                        </div>

                                        <Space orientation="vertical" style={{ width: "100%" }} size="small">
                                            <Button block size="large" className="socialBtn" style={{ border: "1px solid #e0e0e0" }}>
                                                Đăng nhập bằng Google
                                            </Button>
                                            <Button block size="large" className="socialBtn" style={{ border: "1px solid #e0e0e0" }}>
                                                Đăng nhập bằng Facebook
                                            </Button>
                                        </Space>

                                        <div className="footer">
                                            <span>Chưa có tài khoản? </span>
                                            <a className="link" onClick={() => setActiveTab("2")} style={{ cursor: "pointer" }}>
                                                Tạo tài khoản
                                            </a>
                                        </div>
                                    </div>
                                )
                            }

                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}
