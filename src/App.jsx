import { ConfigProvider } from "antd"
import viVN from "antd/locale/vi_VN"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUser, setLoading } from "./redux/slices/authSlice"
import { getAuthToken } from "./services/tokenService"

import routes from "./routes"
import ProtectedRoute from "./components/ProtectedRoute"
import LoadingScreen from "./components/LoadingScreen"

function App() {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.auth)

  useEffect(() => {
    const token = getAuthToken()
    if (token) {
      const userData = localStorage.getItem("user");
      console.log(13, userData);
      if (userData) {
        dispatch(setUser(JSON.parse(userData)))
      }
    }
    dispatch(setLoading(false))
  }, [dispatch])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <ConfigProvider locale={viVN}>
      <Router>
        <Routes>
          {routes.map((r) => {
            const Comp = r.component

            let element = <Comp />

            if (r.protected) {
              // wrap in ProtectedRoute with optional role
              element = r.requiredRole ? (
                <ProtectedRoute requiredRole={r.requiredRole} isProtected={r.protected}>
                  <Comp />
                </ProtectedRoute>
              ) : (
                <ProtectedRoute isProtected={r.protected}>
                  <Comp />
                </ProtectedRoute>
              )
            }

            return <Route key={r.path} path={r.path} element={element} />
          })}

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </ConfigProvider>
  )
}

export default App
