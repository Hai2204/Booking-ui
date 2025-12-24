import { fetchPartners, partnerState } from '@/redux/slices/partnerSlice';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, HomeFilled, PlusOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Layout, Space, Table } from 'antd';
import * as motion from "motion/react-client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from './Form';
const { Content } = Layout




const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>("view");
  const [editingItem, setEditingItem] = useState<Partner | null>(null);
  const { partners, isLoading } = useSelector(partnerState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mode === "view") {
      dispatch(fetchPartners() as any);
    }
  }, [dispatch, mode]);


  const columns = [
    {
      title: "Tên Partner",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span className="font-semibold">{text}</span>,
    },

    {
      title: "Thông tin liên hệ",
      dataIndex: "contactInfo",
      key: "contactInfo",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="text" size="small" icon={<EditOutlined />}
            onClick={() => {
              setMode("edit");
              setEditingItem(record)
            }}
          >
            Sửa
          </Button>
          {/* <Button type="text" size="small" danger icon={<DeleteOutlined />}
          // onClick={() => handleDelete(record.id)}
          >
            Xóa
          </Button> */}
        </Space>
      ),
    },
  ]

  return (

    <>
      <Content className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">

          <motion.header
          >
            <Flex gap="small" justify='space-between' align="center" style={{ padding: '0 30px 0 30px' }}>
              <motion.h1
                style={{ fontSize: 22 }}
              >
                <HomeFilled style={{ marginRight: 8 }} />
                Partner
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
                  {mode === "view" ? "Thêm partner mới" : "Trở lại"}
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
                dataSource={partners}
                columns={columns}
                rowKey="partnerId"
                loading={isLoading}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 1000 }}
              />
            }
          </motion.div>
        </div>
      </Content>
    </>
  )
};

export default App;