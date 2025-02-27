import {Route,Routes,Navigate} from 'react-router-dom';
import UserContent from './dashboard/UserContent';
import Profile from './profile/Profile';
import Help from './help/Help';
import Calendar from './calendar/Calendar';
import LogOut from './logout/Logout';
import Leftbar from "../../utils/Leftbar"
import Navbar from "../../utils/Navbar"



const UserDashboardMain = () => {

  return (
    // here i have give width of col and rows in px thats why w-[100%] of containet
      <section className="absolute right-0 xl:w-[100%] w-[calc(100%-54px)] lg:w-[calc(100%-200px)] sm:w-[calc(100%-160px)] xl:grid xl:grid-cols-mainColsxl 2xl:grid-cols-mainCols2xl xl:place-content-center">
        <div className="col-start-1 col-end-2 absolute left-[-54px] sm:left-[-160px] lg:left-[-200px] xl:static ">
          <Leftbar/>
        </div>
        <div className="col-start-2 col-end-8 px-6 max-[640px]:px-2">
          <Navbar></Navbar>     
            <Routes>
              <Route path="/" element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<UserContent/>}></Route>
              <Route path="profile/*" element={<Profile/>}></Route>
              <Route path="help" element={<Help/>}></Route>
              <Route path="calendar/*" element={<Calendar/>}> </Route>
              <Route path="logout" element={<LogOut/>}></Route>
            </Routes>
        </div> 
      </section>
  );
};

export default UserDashboardMain;
