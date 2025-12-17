import { IdcardOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import * as motion from 'motion/react-client';
import React, { useEffect } from 'react';
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
    render: (_, record) => (
      <Space>
        <a>Edit</a>
        <a style={{ color: 'red' }}>Delete</a>
      </Space>
    ),
  },
];


const App: React.FC = () => {
  const dispatch = useDispatch();
  const listUsers = useSelector(allUsers);

  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, [dispatch]);

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
    </>
  );
};

export default App;
