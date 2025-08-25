import {Routes,Route} from "react-router-dom"
import Login from "../src/pages/public/Login"
import Register from './pages/public/Register'
import NotFound from './pages/NotFound'
import Home from './pages/public/Home'
import Profile from "./pages/protected/Profile"
import Share from "./pages/protected/Share"
import Swipe from "./pages/protected/Swipe"
import ProtectedRoute from "./components/auth/ProtectedRoutes"

function App() {

  return (
    <>
      <Routes>
      <Route 
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
                <Route 
            path="/share"
            element={
              <ProtectedRoute>
                <Share />
              </ProtectedRoute>
            }
          />
                <Route 
            path="/chime"
            element={
              <ProtectedRoute>
                <Swipe />
              </ProtectedRoute>
            }
          />
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      
    </>
  )
}

export default App
