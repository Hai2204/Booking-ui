import { Spin } from "antd"
import React from "react"

const LoadingScreen: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(to bottom right, #f0f5ff, #e6f7ff)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Spin size="large" />
        <p style={{ marginTop: "16px", color: "#666" }}>Đang tải...</p>
      </div>
    </div>
  )
}

export default LoadingScreen
