import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "./utilities/users-service";
import NewOrderPage from "./pages/NewOrderPage/NewOrderPage.jsx";
import AuthPage from "./pages/AuthPage/AuthPage.jsx";
import OrderHistoryPage from "./pages/OrderHistoryPage/OrderHistoryPage.jsx";
import Navbar from "./components/Navbar";



function App() {
  const [user, setUser] = useState(getUser());
  return (
    <div className="App">

      {user ? (
        <>
          <Navbar user={user} setUser={setUser} />
          <Routes>
            <Route path="/orders/new" element={<NewOrderPage user={user} setUser={setUser} />} />
            <Route path="/orders" element={<OrderHistoryPage user={user} setUser={setUser}/>} />
            
          </Routes>
        </>
      ) : (
        <AuthPage user={user} setUser={setUser}/>
      )}

    </div>
  );
}

export default App;



// App.jsx
// import React from 'react';
// import { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { getUser } from './utilities/users-service';
// import NewOrderPage from './pages/NewOrderPage/NewOrderPage.jsx';
// import AuthPage from './pages/AuthPage/AuthPage.jsx';
// import OrderHistoryPage from './pages/OrderHistoryPage/OrderHistoryPage.jsx';
// import Navbar from './components/Navbar';
// import LandingPage from './pages/HomePage/LandingPage';


// function App() {
//   const [user, setUser] = useState(getUser());
//   return (
//     <div className="App">

//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route
//           path="/app"
//           element={
//             user ? (
//               <>
//                 <Navbar user={user} setUser={setUser} />
//                 <Routes>
//                   <Route path="/app/orders/new" element={<NewOrderPage user={user} setUser={setUser} />} />
//                   <Route path="/app/orders" element={<OrderHistoryPage user={user} setUser={setUser} />} />
//                 </Routes>
//               </>
//             ) : (
//               <AuthPage user={user} setUser={setUser} />
//             )
//           }
//         />
//       </Routes>
//     </div>
//   );
// }

// export default App;




