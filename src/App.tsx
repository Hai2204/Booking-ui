import { ConfigProvider } from "antd"
import viVN from "antd/locale/vi_VN"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { JSX, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUser, setLoading } from "@/redux/slices/authSlice"
import { getAuthToken } from "@/services/tokenService"

import routes, { RouteItem } from "./routes"
import ProtectedRoute from "@/components/ProtectedRoute"
import LoadingScreen from "@/components/LoadingScreen"
import { RootState, AppDispatch } from "@/redux/store"

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    const token = getAuthToken()

    if (token) {
      const userData = localStorage.getItem("user")
      if (userData) {
        dispatch(setUser(JSON.parse(userData)))
      }
    }

    dispatch(setLoading(false))
  }, [dispatch])

  if (isLoading) {
    return <LoadingScreen />
  }

  // ------------------------
  // Render route recursive
  // ------------------------
  const renderRoute = (route: RouteItem): JSX.Element => {
    let element = route.element as JSX.Element

    // Wrap ProtectedRoute if needed
    if (route.protected) {
      element = (
        <ProtectedRoute
          requiredRole={route.requiredRole}
          isProtected={route.protected}
        >
          {element}
        </ProtectedRoute>
      )
    }

    // If nested children → generate child <Route>
    if (route.children && route.children.length > 0) {
      return (
        <Route key={route.path} path={route.path} element={element}>
          {route.children.map((child) => renderRoute(child))}
        </Route>
      )
    }

    return <Route key={route.path} path={route.path} element={element} />
  }

  return (
    <ConfigProvider locale={viVN}>
      <Router>
        <Routes>
          {routes.map((route) => renderRoute(route))}

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </ConfigProvider>
  )
}

export default App
