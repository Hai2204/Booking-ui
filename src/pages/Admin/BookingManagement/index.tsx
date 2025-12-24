import { fetchAllBookings, getBookings } from '@/redux/slices/bookingSlice';
import { ArrowLeftOutlined, BookOutlined, EditOutlined, HomeFilled, PlusOutlined, SyncOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Divider, Flex, Layout, Space, Table, Tag } from 'antd';
import { toVND } from 'lib/utils';
import * as motion from "motion/react-client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from './Form';
const { Content } = Layout;




const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>("view");
  const [editingItem, setEditingItem] = useState<Booking | null>(null);
  const data = useSelector(getBookings);
  const dispatch = useDispatch();

  const columns: TableProps<Booking>['columns'] = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <div>{text}</div>,
  },
  {
    title: 'Khách Hàng',
    dataIndex: 'customer',
    key: 'customerName',
    render: (customer: Customer) => <div>{customer.name}</div>,
  },
  {
    title: 'Tên Phòng',
    dataIndex: 'room',
    key: 'room',
    render: (room: Room) => <div>{room.name}</div>,
  },
  {
    title: 'Giá Tiền',
    dataIndex: 'room',
    key: 'price',
    render: (room: Room) => <div>{toVND(room.price)}</div>,
  },
  {
    title: 'Giờ vào',
    dataIndex: 'timeIn',
    key: 'timeIn',
    render: (timeIn) => <div>{new Date(timeIn).toLocaleString()}</div>,
  },
  {
    title: 'Giờ ra',
    dataIndex: 'timeOut',
    key: 'timeOut',
    render: (timeOut) => <div>{new Date(timeOut).toLocaleString()}</div>,
  },

  {
    title: 'Tráng Thái',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => (
      <Flex gap="small" align="center" wrap>
        <Tag icon={<BookOutlined />} color="#55acee">
           {status.toUpperCase()}
        </Tag>
      </Flex>
    ),
  },
    {
    title: 'Mô tả',
    dataIndex: 'note',
    key: 'note',
    render: (note) => <div>{note}</div>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
         <Button type="text" size="small" icon={<EditOutlined />}
            onClick={() => {
              setMode("edit");
              setEditingItem(record)
            }}
          >
            Sửa
          </Button>
        <a>Delete</a>
      </Space>
    ),
  },
];

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
              bordered
              scroll={{ x: 1000 }}
            />
          }
        </motion.div>
      </div>
    </Content>
  </>
};

export default App;