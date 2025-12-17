import { DeleteOutlined, EditOutlined, IdcardOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Form, Input, InputNumber, message, Modal, Select, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import * as motion from 'motion/react-client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { allUsers, fetchUsers } from '@/redux/slices/userSlice';
import './index.css';

export interface UserCustomerModal {
  username: string;
  fullName: string;
  email?: string | null;
  phone?: string | null;
  age?: number | null;
  nationalId?: string | null;
  roleName: string;
}


const App: React.FC = () => {
  const dispatch = useDispatch();
  const listUsers = useSelector(allUsers);
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingUser, setEditingUser] = useState<UserCustomerModal | null>(null);
  const [form] = Form.useForm()

  const handleEdit = (user: UserCustomerModal) => {
    setEditingUser(user)
    form.setFieldsValue(user)
    setIsModalVisible(true)
  }
  const handleAdd = () => {
    setEditingUser(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleDelete = (userId: string) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa phòng này? Hành động này không thể hoàn tác.",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Không",
      onOk: async () => {
        message.success("Xóa user thành công")
      },
    })
  }


  const onFinish = async (values: any) => {
    console.log(values);
    return;
  }


  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, [dispatch]);


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
      key: 'action',
      render: (_: any, record: UserCustomerModal) => (
        <Space size="small">
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.username)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

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

          <motion.div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              Create User
            </Button>
          </motion.div>
        </Flex>
      </motion.header>

      <Divider />

      {/* TABLE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Table<UserCustomerModal>
          rowKey="username"
          columns={columns}
          dataSource={listUsers}
          pagination={{ pageSize: 10 }}
        />
      </motion.div>
      <Modal
        title={editingUser ? "Cập nhật người dùng" : "Thêm người dùng mới"}
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => setIsModalVisible(false)}
        style={{ top: 20 }}
        width={650}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="mt-4"
        >
          {/* Username */}
          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[{ required: true, message: "Vui lòng nhập username" }]}
          >
            <Input placeholder="VD: hainv01" disabled={!!editingUser} />
          </Form.Item>

          {/* Full name */}
          <Form.Item
            name="fullName"
            label="Họ và tên"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input placeholder="VD: Nguyễn Văn A" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="VD: user@email.com" />
          </Form.Item>

          {/* Phone */}
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input placeholder="VD: 0909123456" />
          </Form.Item>

          {/* Age */}
          <Form.Item
            name="age"
            label="Tuổi"
            rules={[{ required: true, message: "Vui lòng nhập tuổi" }]}
          >
            <InputNumber min={18} style={{ width: "100%" }} />
          </Form.Item>

          {/* National ID */}
          <Form.Item
            name="nationalId"
            label="CCCD / CMND"
            rules={[{ required: true, message: "Vui lòng nhập CCCD" }]}
          >
            <Input placeholder="VD: 0123456789" />
          </Form.Item>

          {/* Role */}
          <Form.Item
            name="roleName"
            label="Vai trò"
            rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
          >
            <Select placeholder="Chọn vai trò">
              <Select.Option value="ADMIN">Admin</Select.Option>
              <Select.Option value="USER">User</Select.Option>
              <Select.Option value="STAFF">Staff</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

    </>
  );
};

export default App;
