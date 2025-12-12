"use client"

import { SearchOutlined, ShoppingOutlined } from "@ant-design/icons"
import { Badge, Button, Card, Col, Empty, Input, Layout, Row, Select, Spin } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar.tsx/index.js"
import CarouselComponent from "../components/CarouselComponent.jsx"
import { logout } from "../redux/slices/authSlice"
import { fetchRooms } from "../redux/slices/roomSlice"
import type { RootState } from "../redux/store"

const { Content } = Layout

export default function Dashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { rooms, isLoading } = useSelector((state: RootState) => state.room)
  const [filteredRooms, setFilteredRooms] = useState([])
  const [searchText, setSearchText] = useState("")
  const [filterType, setFilterType] = useState("all")

  useEffect(() => {
    dispatch(fetchRooms() as any)
  }, [dispatch])

  useEffect(() => {
    let filtered = rooms
    if (searchText) {
      filtered = filtered.filter((r: any) => r.name.toLowerCase().includes(searchText.toLowerCase()))
    }
    if (filterType !== "all") {
      filtered = filtered.filter((r : any) => r.type === filterType)
    }
    setFilteredRooms(filtered)
  }, [rooms, searchText, filterType])

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  const roomTypes = ["all", ...new Set(rooms.map((r : any) => r.type))]

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Navbar />
      <CarouselComponent />
      <Content className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Khám phá phòng của chúng tôi</h1>
            <p className="text-gray-600">Tìm phòng phù hợp với nhu cầu của bạn</p>
          </div>

          <Card className="mb-6 shadow-md border-0">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Input
                  placeholder="Tìm kiếm phòng..."
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  size="large"
                  className="rounded-lg"
                />
              </Col>
              <Col xs={24} sm={12}>
                <Select
                  value={filterType}
                  onChange={setFilterType}
                  size="large"
                  style={{ width: "100%" }}
                  className="rounded-lg"
                >
                  {roomTypes.map((type : any) => (
                    <Select.Option key={type} value={type}>
                      {type === "all" ? "Tất cả loại phòng" : type}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Card>

          {isLoading ? (
            <div className="flex justify-center p-12">
              <Spin size="large" tip="Đang tải danh sách phòng..." />
            </div>
          ) : filteredRooms.length === 0 ? (
            <Empty description="Không tìm thấy phòng" style={{ marginTop: "50px" }} />
          ) : (
            <Row gutter={[24, 24]}>
              {filteredRooms.map((room : any) => (
                <Col key={room.id} xs={24} sm={12} lg={8}>
                  <Card
                    hoverable
                    className="h-full flex flex-col shadow-md hover:shadow-xl transition-all duration-300 rounded-lg border-0 overflow-hidden"
                    cover={
                      <div className="relative overflow-hidden h-48 bg-gray-200">
                        <img
                          alt={room.name}
                          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                          className="h-full w-full object-cover hover:scale-110 transition-transform duration-300"
                          width={"100%"}
                        />
                        {room.active && (
                          <Badge
                            status={
                              room.active === 1 ? "success" : "error"
                            }
                            text={
                              room.status === 1 ? "Có sẵn" : "Đã đặt"
                            }
                            className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full"
                          />
                        )}
                      </div>
                    }
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{room.name}</h3>
                    {/* <p className="text-sm text-gray-600 mb-4 line-clamp-2">{room.description}</p> */}

                    <div className="flex justify-between mb-4 text-xs text-gray-600 space-x-2">
                      <span>Loại: {room.typeRoom}</span>
                      <span>Sức chứa: {room.typeRoom}</span>
                    </div>

                    {/* <div className="flex gap-2 mb-4 flex-wrap">
                      {room.amenities?.slice(0, 3).map((amenity) => (
                        <span key={amenity} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                          {amenity}
                        </span>
                      ))}
                    </div> */}

                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                      <span className="text-2xl font-bold text-indigo-600">${room.price}</span>
                      <Button
                        type="primary"
                        icon={<ShoppingOutlined />}
                        onClick={() => navigate(`/booking/${room.id}`)}
                        disabled={room.active == 0}
                        className="rounded-lg"
                      >
                        Đặt phòng ${room.id}
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Content>
    </Layout>
  )
}
