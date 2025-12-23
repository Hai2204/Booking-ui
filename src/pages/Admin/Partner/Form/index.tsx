import React, { useEffect } from 'react';
import { Button, Flex, Form, Input, Space } from 'antd';
import { PlusOutlined, SaveOutlined, SyncOutlined } from '@ant-design/icons';

const App: React.FC<{ data: Partner | null, mode: Mode }> = ({ data, mode }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values:', values);
  };

  useEffect(() => {
    if (mode === "edit" && data) {
      form.setFieldsValue(data);
    } else {
      form.resetFields();
    }
  }, [data, form]);

  return (
    <Space vertical>
      <Form form={form} layout="vertical" onFinish={onFinish} className="mt-4">
        <Form.Item name="partnerId" hidden>
          <Input />
        </Form.Item>
        <Flex gap="large">
          <Form.Item name="name" label="Tên partner" rules={[{ required: true, message: "Vui lòng nhập tên partner" },
          { type: "string", message: "Tên phải là chuỗi" },
          { min: 3, message: "Tên tối thiểu 3 ký tự" },
          { max: 100, message: "Tên tối đa 100 ký tự" },
          {
            validator: (_, value) =>
              value?.trim()
                ? Promise.resolve()
                : Promise.reject(new Error("Tên không được chỉ chứa khoảng trắng")),
          },]}>
            <Input placeholder="VD: Cty abc" />
          </Form.Item>
          <Form.Item name="contactInfo" label="Liên hệ" rules={[{ required: true, message: "Vui lòng nhập " }, { type: "email", message: "Email không đúng định dạng" }, {
            validator: (_, value) =>
              value?.endsWith("@gmail.com")
                ? Promise.resolve()
                : Promise.reject(new Error("Email kết thúc phải là @gmail.com")),
          }]}>
            <Input type='email' placeholder="VD: contact@company.com" />
          </Form.Item>
        </Flex>
        <Button
          type="primary"
          icon={mode === "create" ? <PlusOutlined /> : <SaveOutlined />}
          onClick={() => form.submit()} className="rounded-lg h-10"
          loading={false && { icon: <SyncOutlined spin /> }}
        >
          {mode === "create" ? "Thêm partner mới" : "Lưu"}
        </Button>
      </Form>
    </Space>);
};

export default App;