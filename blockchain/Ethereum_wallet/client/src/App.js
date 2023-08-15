import './App.css';
import {BrowserRouter as Router , Routes,Route} from "react-router-dom";
import HomeScreen from './Screens/HomeScreen';
import Login from './Screens/Login';
function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path = "/Home" element = {<HomeScreen/>}/>
        <Route path = "/" element = {<Login/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
