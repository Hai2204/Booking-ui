import {
  DeleteOutlined,
  EditOutlined,
  IdcardOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Space,
  Steps,
  Table,
  Tag,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import * as motion from 'motion/react-client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { allUsers, fetchUsers, createUser } from '@/redux/slices/userSlice';
import './index.css';
import _default_1 from 'antd/es/table/InternalTable';

export interface UserCustomerModal {
  username: string;
  fullName: string;
  email?: string | null;
  phone?: string | null;
  age?: number | null;
  nationalId?: string | null;
  roleName: string;
  password?: string;
  confirmPassword?: string;
}

const App: React.FC = () => {
  const dispatch = useDispatch();
  const listUsers = useSelector(allUsers);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] =
    useState<UserCustomerModal | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const [form] = Form.useForm();

  const isCreate = !editingUser;

  /* ================== HANDLER ================== */
  const handleAdd = () => {
    setEditingUser(null);
    setCurrentStep(0);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (user: UserCustomerModal) => {
    setEditingUser(user);
    setCurrentStep(0);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDelete = (username: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa người dùng này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Không',
      onOk: async () => {
        message.success('Xóa user thành công');
      },
    });
  };

  /* ================== SUBMIT ================== */
  const onFinish = async (values: UserCustomerModal) => {
    const payload: UserCustomerModal = {
      ...values,
      password: isCreate ? values.password : undefined,
    };

    if (isCreate) {
      const result = await dispatch(createUser(values) as any)
      if (result?.payload?.id) {
        message.success("Tạo user thành công")
        setIsModalVisible(false)
        form.resetFields()
        dispatch(fetchUsers() as any);
      } else {
        message.error(result?.payload || "Tạo user thất bại")
      }
    } else {
      //  const result = await dispatch(updateRoom({ roomId: editingRoom.id, payload: values }) as any)
      // if (result.payload) {
      //     message.success("Cập nhật phòng thành công")
      //     setIsModalVisible(false)
      // }
    }

    console.log('SUBMIT PAYLOAD:', payload);

    // setIsModalVisible(false);
  };

  /* ================== EFFECT ================== */
  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, [dispatch]);

  /* ================== TABLE ================== */
  const columns: ColumnsType<UserCustomerModal> = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (v) => v ?? '--',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (v) => v ?? '--',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: (v) => v ?? '--',
    },
    {
      title: 'National ID',
      dataIndex: 'nationalId',
      key: 'nationalId',
      render: (v) => v ?? '--',
    },
    {
      title: 'Role',
      dataIndex: 'roleName',
      key: 'roleName',
      render: (role) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: 'Action',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.username)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  /* ================== RENDER ================== */
  return (
    <>
      {/* HEADER */}
      <motion.header>
        <Flex
          gap="small"
          justify="space-between"
          align="center"
          style={{ padding: '0 30px' }}
        >
          <motion.h1 style={{ fontSize: 22 }}>
            <IdcardOutlined style={{ marginRight: 8 }} />
            My App
          </motion.h1>

          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Create User
          </Button>
        </Flex>
      </motion.header>

      <Divider />

      {/* TABLE */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Table
          rowKey="username"
          columns={columns}
          dataSource={listUsers}
          pagination={{ pageSize: 10 }}
        />
      </motion.div>

      {/* MODAL */}
      <Modal
        title={editingUser ? 'Cập nhật người dùng' : 'Thêm người dùng mới'}
        open={isModalVisible}
        width={650}
        onCancel={() => setIsModalVisible(false)}
        okText={isCreate && currentStep === 0 ? 'Tiếp tục' : 'Lưu'}
        onOk={async () => {
          if (isCreate && currentStep === 0) {
            await form.validateFields(['username', 'password']);
            setCurrentStep(1);
          } else {
            form.submit();
          }
        }}
      >
        {/* STEPS (chỉ khi create) */}
        {isCreate && (
          <Steps current={currentStep} className="mb-4">
            <Steps.Step title="Tạo tài khoản" />
            <Steps.Step title="Thông tin người dùng" />
          </Steps>
        )}

        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* ===== STEP 1 ===== */}
          <>
            {
              isCreate && currentStep === 0 && (<Form.Item
                name="username"
                label="Tên đăng nhập"
                rules={[{ required: true, message: 'Vui lòng nhập username' }]}
              >
                <Input placeholder="VD: hainv01" />
              </Form.Item>)
            }

            <Form.Item
              name="password"
              label="Mật khẩu"
              hidden={!isCreate || currentStep !== 0}
              rules={[
                { required: isCreate && currentStep === 0 },
                { required: true, message: 'Vui lòng nhập mật khẩu' },
                { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' },
              ]}
              hasFeedback
              preserve
            >
              <Input.Password />
            </Form.Item>
            {
              isCreate && currentStep === 0 && (
                <Form.Item
                  name="confirmPassword"
                  label="Xác nhận mật khẩu"
                  dependencies={['password']}
                  hidden={!isCreate || currentStep !== 0}
                  preserve
                  hasFeedback
                  rules={[
                    { required: true, message: 'Vui lòng xác nhận mật khẩu' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('Mật khẩu xác nhận không khớp'),
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              )
            }

          </>


          {/* ===== STEP 2 / EDIT ===== */}
          {(!isCreate || currentStep === 1) && (
            <>
              <Form.Item
                name="username"
                label="Tên đăng nhập"
                hidden={isCreate}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                name="fullName"
                label="Họ và tên"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="email" label="Email">
                <Input />
              </Form.Item>

              <Form.Item name="phone" label="Số điện thoại">
                <Input />
              </Form.Item>

              <Form.Item name="age" label="Tuổi">
                <InputNumber min={18} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item name="nationalId" label="CCCD / CMND">
                <Input />
              </Form.Item>

              <Form.Item
                name="roleName"
                label="Vai trò"
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value="ROLE_ADMIN">Admin</Select.Option>
                  <Select.Option value="ROLE_USER">User</Select.Option>
                  <Select.Option value="STAFF">Staff</Select.Option>
                </Select>
              </Form.Item>

              {isCreate && currentStep === 1 && (
                <Button onClick={() => setCurrentStep(0)}>Quay lại</Button>
              )}
            </>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default App;
