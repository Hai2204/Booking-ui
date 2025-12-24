import { ArrowLeftOutlined, HomeFilled, PlusOutlined, SyncOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Divider, Flex, Layout, Space, Table, Tag } from 'antd';
import * as motion from "motion/react-client";
import React, { use, useEffect, useState } from 'react';
import Form from './Form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBookings, getBookings } from '@/redux/slices/bookingSlice';
import { toVND } from 'lib/utils';
const { Content } = Layout;


const columns: TableProps<Booking>['columns'] = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Khách Hàng',
    dataIndex: 'customer',
    key: 'customerName',
    render: (customer: Customer) => <a>{customer.name}</a>,
  },
  {
    title: 'Tên Phòng',
    dataIndex: 'room',
    key: 'room',
    render: (room: Room) => <a>{room.name}</a>,
  },
  {
    title: 'Giá Tiền',
    dataIndex: 'room',
    key: 'price',
    render: (room: Room) => <a>{toVND(room.price)}</a>,
  },
  {
    title: 'Giờ vào',
    dataIndex: 'timeIn',
    key: 'timeIn',
    render: (timeIn) => <a>{new Date(timeIn).toLocaleString()}</a>,
  },
  {
    title: 'Giờ ra',
    dataIndex: 'timeOut',
    key: 'timeOut',
    render: (timeOut) => <a>{new Date(timeOut).toLocaleString()}</a>,
  },

  {
    title: 'Tráng Thái',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => (
      <Flex gap="small" align="center" wrap>
        <Tag color={"geekblue"} key={status}>
          {status.toUpperCase()}
        </Tag>
      </Flex>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
];

const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>("view");
  const [editingItem, setEditingItem] = useState<Booking | null>(null);
  const data = useSelector(getBookings);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mode === "view") {
      dispatch(fetchAllBookings() as any);
    }
  }, [dispatch, mode]);

  return <>
    <Content className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        <motion.header
        >
          <Flex gap="small" justify='space-between' align="center" style={{ padding: '0 30px 0 30px' }}>
            <motion.h1
              style={{ fontSize: 22 }}
            >
              <HomeFilled style={{ marginRight: 8 }} />
              QL Đặt chỗ
            </motion.h1>
            <motion.div
            >
              <Button
                type="primary"
                icon={mode === "view" ? <PlusOutlined /> : <ArrowLeftOutlined />}
                onClick={() => {
                  setMode(mode === "view" ? "create" : "view");
                  setEditingItem(null);
                }} className="rounded-lg h-10"
                loading={false && { icon: <SyncOutlined spin /> }}
              >
                {mode === "view" ? "Thêm booking mới" : "Trở lại"}
              </Button>
            </motion.div>
          </Flex>


        </motion.header>
        <Divider />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {
            mode !== "view" ? <Form data={editingItem} mode={mode} setMode={setMode} /> : <Table
              dataSource={data}
              columns={columns}
              rowKey="id"
              loading={false}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1000 }}
            />
          }
        </motion.div>
      </div>
    </Content>
  </>
};

export default App;