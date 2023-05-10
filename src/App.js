import {Route, Routes} from "react-router-dom";
import SurveysList from "./screens/SurveysList";
import CreateSurvey from "./screens/CreateSurvey";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path={'/'} element={<SurveysList/>} />
        <Route path={'/create-survey'} element={<CreateSurvey/>} />
      </Routes>
    </div>
  );
}

export default App;
