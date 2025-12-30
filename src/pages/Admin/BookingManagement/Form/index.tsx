import React, { useEffect } from 'react';
import { Button, Col, DatePicker, Flex, Form, Input, message, Row, Select } from 'antd';
import { PlusOutlined, SaveOutlined, SyncOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
const { TextArea } = Input;
const { RangePicker } = DatePicker;

enum Status {
  BLOCKED = 'booked',
  ACTIVE = 'active',
  CLOSE = 'close',
  CANCEL = 'cancel',
}

const STATUS_OPTIONS = [
  { label: 'Hoạt động', value: Status.ACTIVE },
  { label: 'Ngừng hoạt động', value: Status.CLOSE },
  { label: 'Đã Đặt', value: Status.BLOCKED },
  { label: 'Hủy', value: Status.CANCEL },
];

const App: React.FC<{ data: Booking | null, mode: Mode, setMode: React.Dispatch<React.SetStateAction<Mode>> }> = ({ data, mode, setMode }) => {
  const [form] = Form.useForm();

  const onFinish = (values: Booking) => {
    console.log(1, values);

    if (!!values.id) {

    } else {
    }
  }
  const calcNights = (dates?: [dayjs.Dayjs, dayjs.Dayjs]) => {
    if (!dates || dates.length !== 2) return 0;

    const [checkIn, checkOut] = dates;

    return checkOut.startOf('day').diff(
      checkIn.startOf('day'),
      'day'
    );
  };
  useEffect(() => {
    if (mode === "edit" && data) {
      const dates = [dayjs(data.timeIn), dayjs(data.timeOut)];
      const nights = calcNights(dates as [dayjs.Dayjs, dayjs.Dayjs]);
      form.setFieldsValue({
        ...data,
        dateRanger: dates,
        nights: nights,
      });
    } else {
      form.resetFields();
    }
  }, [data, form]);
  return (<>
    <Form form={form} layout="vertical" onFinish={onFinish} className="mt-4">
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>
      <Row gutter={16}>
        <Col span={3}>
          <Form.Item
            name="userName"
            label="Mã Khách hàng"
            rules={[{ required: true, message: "Vui lòng nhập mã khách hàng" }]}
          >
            <Input placeholder="VD: hainv" />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Select
              placeholder="Chọn mã khách hàng"
              showSearch
              options={STATUS_OPTIONS.map(c => ({
                label: `${c.label}`,
                value: c.value
              }))}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={5}>
          <Form.Item
            name={"dateRanger"}
            label="Ngày đặt phòng"
            rules={[{ required: true, message: "Vui lòng chọn ngày đặt phòng" }]}
          >
            <RangePicker onChange={(dates) => {
              if (!dates) return;

              const nights = calcNights(dates as [dayjs.Dayjs, dayjs.Dayjs]);
              if (nights <= 0) {
                message.error('Ngày trả phòng phải sau ngày nhận phòng');
                return;
              }

              form.setFieldsValue({
                timeIn: dates?.[0]?.hour(14).minute(0).second(0).format('YYYY-MM-DDTHH:mm:ss'),
                timeOut: dates?.[1]?.hour(12).minute(0).second(0).format('YYYY-MM-DDTHH:mm:ss'),
                nights: nights,
              })
            }} />

          </Form.Item></Col>
        <Col span={2}> <Form.Item
          name="nights"
          label="Số đêm ở"
        ><Input readOnly disabled width={300} /></Form.Item></Col>
        <Col>   <Form.Item
          name="timeIn"
          hidden
        ><Input /></Form.Item></Col>
        <Col>
          <Form.Item
            name="timeOut"
            hidden
          ><Input /></Form.Item>
        </Col>
      </Row>
      <Col span={10}>
        <Form.Item
          name="note"
          label="Ghi chú"
          rules={[{ required: true, message: "Vui lòng nhập ghi chú" }]}>
          <TextArea placeholder="Ghi chú" rows={5} />
        </Form.Item>
      </Col>

      <Button
        type="primary"
        icon={mode === "create" ? <PlusOutlined /> : <SaveOutlined />}
        onClick={() => form.submit()} className="rounded-lg h-10"
        loading={false && { icon: <SyncOutlined spin /> }}
      >
        {mode === "create" ? "Thêm partner mới" : "Lưu"}
      </Button>
    </Form>
  </>);
}

export default App;