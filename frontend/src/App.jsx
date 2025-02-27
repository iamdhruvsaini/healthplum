import {Route,Routes} from 'react-router-dom'
import Homepage from './components/homepage/Homepage'
import Signup from './utils/Signup'
import Login from './utils/Login'
import UserDashboardMain from './components/user/UserDashboardMain'
import Error from './utils/Error'


function App() {



  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/login" element={<Login/>}> </Route>
        <Route path="/register" element={<Signup/>}></Route>
        <Route path="/user/*" element={<UserDashboardMain/>}></Route>
        <Route path="*" element={<Error/>}></Route>
      </Routes>
    </>
  )
}

export default App
