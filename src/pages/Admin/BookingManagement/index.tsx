import { FileSearchOutlined, SyncOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Divider, Flex, Space, Table, Tag } from 'antd';
import * as motion from "motion/react-client";
import React from 'react';


const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <Flex gap="small" align="center" wrap>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </Flex>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];



const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const App: React.FC = () => {
  return <>
    <motion.header
    >
      <Flex gap="small" justify='space-between' align="center" style={{ padding: '0 30px 0 30px' }}>
        <motion.h1
          style={{ fontSize: 22 }}
        >
          <FileSearchOutlined style={{ marginRight: 8 }} />
          Quản Lý Đặt Phòng
        </motion.h1>
        <motion.div
        >
          <Button
            type="primary"
            loading={false && { icon: <SyncOutlined spin /> }}
          >
            Create User
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

      <Table columns={columns} dataSource={data} />
    </motion.div>
  </>;
};

export default App;