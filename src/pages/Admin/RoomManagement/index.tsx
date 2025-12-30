"use client"

import { createRoom, fetchRooms, updateRoom } from "@/redux/slices/roomSlice"
import { RootState } from "@/redux/store"

import { accommodationService } from "@/services/accommodation"
import { roomService } from "@/services/roomService"
import { DeleteOutlined, EditOutlined, IdcardOutlined, PlusOutlined, SyncOutlined } from "@ant-design/icons"
import { Button, Cascader, Checkbox, Divider, Flex, Form, Input, InputNumber, Layout, message, Modal, Select, Space, Table, Tag } from "antd"
import { toVND } from "lib/utils"
import * as motion from "motion/react-client"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const { Content } = Layout


export default function AdminRooms() {
    const dispatch = useDispatch()
    const { rooms, isLoading } = useSelector((state: RootState) => state.room)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [editingRoom, setEditingRoom] = useState<Room | null>(null)
    const [form] = Form.useForm()
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);

    const fetchAccommodations = async () => {
        try {
            const res = await accommodationService.getAllAccommodations()
            setAccommodations(res.data || []);
        } catch (e) {
            message.error("Không tải được danh sách accommodation")
        }
    }

    useEffect(() => {
        dispatch(fetchRooms() as any)
    }, [dispatch])

    const handleAdd = async () => {
        setEditingRoom(null)
        form.resetFields()
        await fetchAccommodations();
        setIsModalVisible(true);
    }

    const handleEdit = async (room: Room) => {
        setEditingRoom(room)
        await fetchAccommodations();
        form.setFieldsValue({
            ...room,
            amenities: room.amenities || "",
            accommodationId: room.accommodation.accommodationId,
        })
        setIsModalVisible(true)
    }

    const handleDelete = (roomId: number) => {
        Modal.confirm({
            title: "Xác nhận xóa " + roomId,
            content: "Bạn có chắc chắn muốn xóa phòng này? Hành động này không thể hoàn tác.",
            okText: "Xóa",
            okType: "danger",
            cancelText: "Không",
            onOk: async () => {
                const result = await roomService.deleteRoom(roomId)
                if (result.success) {
                    message.success("Xóa phòng thành công")
                    dispatch(fetchRooms() as any)
                }
            },
        })
    }

    const onFinish = async (values: any) => {

        if (editingRoom) {
            if (editingRoom.roomCode !== values.roomCode) {
                message.error("Mã phòng không thể chỉnh sửa")
                return
            }
            const result = await dispatch(updateRoom(values) as any)
            if (result.payload?.id) {
                message.success("Cập nhật phòng thành công")
                setIsModalVisible(false)
            } else {
                message.error(result?.payload || "Cập nhật phòng thất bại")
            }
        } else {
            const result = await dispatch(createRoom(values) as any);
            if (result.payload?.id) {
                message.success("Thêm phòng thành công")
                setIsModalVisible(false)
                form.resetFields()
            } else {
                message.error(result?.payload || "Thêm phòng thất bại")
            }
        }
    }

    const columns = [
        {
            title: "Tên phòng",
            dataIndex: "name",
            key: "name",
            render: (text: string) => <span className="font-semibold">{text}</span>,
        },
        {
            title: "Loại",
            dataIndex: "roomCategory",
            key: "roomCategory",
            render: (roomCategory: string) => <Tag color="blue">{roomCategory}</Tag>,
        },
        {
            title: "Giá / đêm",
            dataIndex: "price",
            key: "price",
            render: (price: number) => <span className="font-semibold text-indigo-600">{toVND(price)}</span>,
        },
        {
            title: "Sức chứa",
            dataIndex: "typeRoom",
            key: "typeRoom",
            align: "center" as const,
            render: (typeRoom: number) => <Tag color="blue">{typeRoom} Người</Tag>,
        },
        {
            title: "Trạng thái",
            dataIndex: "active",
            key: "active",
            render: (active: number) => (
                <Tag color={active == 1 ? "green" : "red"}>
                    {active == 1 ? "Sẵn sàng" : "Không sẵn sàng"}
                </Tag>
            ),
        },
        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: any) => (
                <Space size="small">
                    <Button type="text" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        Sửa
                    </Button>
                    <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ]

    return (
        <Content className="p-4 md:p-6">
            <div className="max-w-7xl mx-auto">

                <motion.header
                >
                    <Flex gap="small" justify='space-between' align="center" style={{ padding: '0 30px 0 30px' }}>
                        <motion.h1
                            style={{ fontSize: 22 }}
                        >
                            <IdcardOutlined style={{ marginRight: 8 }} />
                            Quản lý phòng
                        </motion.h1>
                        <motion.div
                        >
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={handleAdd} className="rounded-lg h-10"
                                loading={false && { icon: <SyncOutlined spin /> }}
                            >
                                Thêm phòng mới
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

                    <Table
                        dataSource={rooms}
                        columns={columns}
                        rowKey="id"
                        loading={isLoading}
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 1000 }}
                    />

                </motion.div>

                <Modal
                    title={editingRoom ? "Cập nhật phòng" : "Thêm phòng mới"}
                    open={isModalVisible}
                    onOk={() => form.submit()}
                    onCancel={() => setIsModalVisible(false)}
                    style={{ top: 20 }}
                    width={650}
                >
                    <Form form={form} layout="vertical" onFinish={onFinish} className="mt-4">

                        <Flex gap="large">
                            <Form.Item name="name" label="Tên phòng" rules={[{ required: true, message: "Vui lòng nhập tên phòng" }]}>
                                <Input placeholder="VD: Phòng 101" />
                            </Form.Item>
                            <Form.Item name="roomCode" label="Mã phòng" rules={[{ required: true, message: "Vui lòng nhập mã phòng" }]}>
                                <Input readOnly={!!editingRoom} disabled={!!editingRoom} placeholder="VD: P101" />
                            </Form.Item>
                        </Flex>

                        <Form.Item
                            name="accommodationId"
                            label="Accommodation"
                            rules={[{ required: true, message: "Vui lòng chọn accommodation" }]}

                            // 🔥 convert accommodationId -> [partnerId, accommodationId]
                            getValueProps={(value) => {
                                if (!value) return { value: undefined };

                                const item = accommodations.find(
                                    (i) => i.accommodationId === value
                                );

                                return {
                                    value: item
                                        ? [item.partner.partnerId, item.accommodationId]
                                        : undefined,
                                };
                            }}

                            // 🔥 convert [partnerId, accommodationId] -> accommodationId
                            getValueFromEvent={(value) => value?.[1]}
                        >
                            <Cascader
                                placeholder="Chọn Partner → Accommodation"
                                options={Object.values(
                                    accommodations.reduce((acc, item) => {
                                        const partnerId = item.partner.partnerId;

                                        if (!acc[partnerId]) {
                                            acc[partnerId] = {
                                                value: partnerId,
                                                label: item.partner.name,
                                                children: [],
                                            };
                                        }

                                        acc[partnerId].children.push({
                                            value: item.accommodationId,
                                            label: item.name, // ✅ label là name
                                        });

                                        return acc;
                                    }, {} as Record<number, any>)
                                )}
                                expandTrigger="hover"
                            />
                        </Form.Item>

                        <Form.Item
                            name="roomCategory"
                            label="Loại phòng"
                            rules={[{ required: true, message: "Vui lòng chọn loại phòng" }]}
                        >
                            <Select placeholder="Chọn loại phòng">
                                <Select.Option value="DLX">Phòng Deluxe</Select.Option>
                                <Select.Option value="SUT">Phòng suite</Select.Option>
                                <Select.Option value="PEN">Phòng Penthouse</Select.Option>
                            </Select>
                        </Form.Item>

                        <Flex gap="large" style={{ alignItems: "self-end" }}>

                            <Form.Item
                                name="price"
                                label="Giá / đêm (VND)"
                                rules={[{ required: true, message: "Vui lòng nhập giá" }]}
                            >
                                <InputNumber min={0} placeholder="VD: 100" />
                            </Form.Item>

                            <Form.Item
                                name="typeRoom"
                                label="Sức chứa (khách)"
                                rules={[{ required: true, message: "Vui lòng nhập sức chứa" }]}
                            >
                                <InputNumber min={1} placeholder="VD: 2" />
                            </Form.Item>

                            <Form.Item
                                name="active"
                                valuePropName="checked"
                                getValueFromEvent={(e) => e.target.checked ? 1 : 0}
                            >
                                <Checkbox>Trạng thái</Checkbox>
                            </Form.Item>
                        </Flex>

                        <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}>
                            <Input.TextArea rows={4} placeholder="Mô tả chi tiết về phòng" />
                        </Form.Item>

                        <Form.Item name="amenities" label="Tiện nghi (cách nhau bằng dấu phẩy)" tooltip="VD: WiFi, TV, Điều hòa">
                            <Input.TextArea rows={2} placeholder="WiFi, TV, Điều hòa, Nóng lạnh" />
                        </Form.Item>
                        <Form.Item name="policy" label="Chính sách">
                            <Input.TextArea rows={2} placeholder="Hoàn tiền, hủy phòng..." />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </Content>
    )
}
