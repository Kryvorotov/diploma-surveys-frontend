import {Route, Routes} from "react-router-dom";
import Surveys from "./screens/Surveys";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path={'/'} element={<Surveys/>} />
      </Routes>
    </div>
  );
}

export default App;
