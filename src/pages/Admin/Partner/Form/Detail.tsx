import { accommodationService } from '@/services/accommodation';
import { Descriptions, Flex, FloatButton, Form, Input, message, Modal, Select, Space, Table, Upload } from 'antd';
import React, { useEffect, useState } from 'react';

import { OrderedListOutlined, PlusOutlined } from '@ant-design/icons';
import type { DescriptionsProps, GetProp, TableProps, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const Detail: React.FC<{ data: Partner | null, setMode: React.Dispatch<React.SetStateAction<Mode>> }> = ({ data, setMode }) => {

  const items: DescriptionsProps['items'] = [
    {
      label: 'Partner',
      children: data?.name,
    },
    {
      label: 'Liên Hệ',
      span: 'filled', // span = 2
      children: data?.contactInfo,
    },
  ];
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const columns: TableProps<Accommodation>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200
    },
    {
      title: 'type',
      dataIndex: 'accommodationType',
      key: 'accommodationType',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 600
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const onFinish = async (values: any) => {
    console.log(values);
    return;
    accommodationService.createAccommodation(values).then(resp => {
      console.log(resp);
      if (resp.success) {
        message.success(resp.message || "Thành Công !")
        setIsModalVisible(false)
      } else {
        message.error(resp.message || "Thất bại !")
      }

    }).catch(err => {
      console.log(err);

    })
  }

  useEffect(() => {
    if (isModalVisible && data) {
      form.setFieldsValue({
        partner: data,
      });
    }
  }, [isModalVisible, data, form]);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const res = await accommodationService.getAllAccommodations(data?.partnerId)
        setAccommodations(res.data || []);
      } catch (e) {
        message.error("Không tải được danh sách accommodation")
      }
    }
    // Immediately invoke the function
    fetchAccommodations();
  }, [isModalVisible])

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <>
      <Space orientation="vertical" size={'middle'} align='baseline'>
        <Descriptions bordered title="Partner Info" items={items} />
        <Table dataSource={accommodations} columns={columns} rowKey={'accommodationId'} />
      </Space>

      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ insetInlineEnd: 94 }}
        icon={<OrderedListOutlined size={85} color='#1877F2' />}
      >
        <FloatButton icon={<PlusOutlined color='#1877F2' />} onClick={() => setIsModalVisible(true)} />
      </FloatButton.Group>

      <Modal
        title={"Thêm loại accommodation"}
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => setIsModalVisible(false)}
        style={{ top: 100 }}
        width={650}
      >
        <Form form={form} layout="vertical" onFinish={onFinish} className="mt-4">
          <Form.Item name="accommodationId" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="partner" hidden>
            <Input />
          </Form.Item>
          <Flex gap="large">
            <Form.Item name="name" label="Tên KS" rules={[{ required: true, message: "Vui lòng nhập tên phòng" }]}>
              <Input placeholder="VD: Mường Thanh Luxury Da Nang" />
            </Form.Item>

            <Form.Item
              name="accommodationType"
              label="Loại phòng"
              rules={[{ required: true, message: "Vui lòng chọn loại phòng" }]}
            >
              <Select placeholder="Chọn type">
                <Select.Option value="hotel">Phòng Hotel</Select.Option>
                <Select.Option value="villa">Phòng Villa</Select.Option>
                <Select.Option value="homestay">Phòng HomeStay</Select.Option>
              </Select>
            </Form.Item>


          </Flex>
          <Form.Item name="fileLists" label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload beforeUpload={() => false} listType="picture-card" onPreview={onPreview}>
              <button
                style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
                type="button"
              >
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={4} placeholder="VD: Khách sạn ven biển, Thoải mái ..." />
          </Form.Item>
          <Form.Item name="city" label="Thành phố" rules={[{ required: true, message: "Vui lòng nhập thành phố" }]}>
            <Input placeholder="VD: TP.Đà Nẵng" />
          </Form.Item>
          <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}>
            <Input placeholder="VD: Ngũ Hành Sơn, Đà Nẵng" />
          </Form.Item>

        </Form>
      </Modal>
    </>
  )
};

export default Detail;