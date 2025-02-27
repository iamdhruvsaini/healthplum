import React from 'react'
import Completed from './Completed'
import Upcoming from './Upcoming'
import { Navigate, Route, Routes, useNavigate} from 'react-router-dom';


const Calendar = () => {
  const navigate=useNavigate();
  return (
   <section className="content h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-md">Appointments</h1>
        <div className='middle justify-between'>
          <div className="flex gap-4 text-xs">
            <button className="gray-btn" onClick={() => navigate('/user/calendar/upcoming', { replace: true })}>
              Upcoming
            </button>
            <button className="gray-btn" onClick={() => navigate('/user/calendar/completed', { replace: true })}>
              Completed
            </button>
          </div>

          <div>
            <button className="gray-btn text-xs" > Clear All</button>
          </div>

        </div>
        

        <Routes>
          <Route path="/" element={<Navigate to="upcoming" />} />
          <Route path='/upcoming' element={<Upcoming/>}></Route>
          <Route path='/completed' element={<Completed/>}></Route>
        </Routes>


      </div>
   </section>
  )
}

export default Calendar
