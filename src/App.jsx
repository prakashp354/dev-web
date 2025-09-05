import { BrowserRouter, Route,  Routes } from "react-router";
import "./App.css"; 
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed ";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}>
      <Route path="/" element={<Feed/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Profile" element={<Profile/>}/>
      <Route path="/Connections" element={<Connections/>}/>
      <Route path="/Requests" element={<Requests/>}/>
      </Route>

    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
