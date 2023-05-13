import {Route, Routes} from "react-router-dom";
import SurveysList from "./screens/SurveysList";
import CreateSurvey from "./screens/CreateSurvey";
import { ToastContainer } from 'react-toastify';
import NavBar from "./components/NavBar";
import SurveyPage from "./screens/SurveyPage";
import SurveyFormPage from './screens/SurveyFormPage'

function App() {
  return (
    <div className="App">
      <ToastContainer />
        <NavBar />
      <Routes>
        <Route path={'/'} element={<SurveysList/>} />
        <Route path={'/create-survey'} element={<CreateSurvey/>} />
        <Route path={'/edit/:surveyId'} element={<CreateSurvey/>} />
        <Route path={'/survey/:surveyId'} element={<SurveyPage />} />
        <Route path={'/survey-form/:surveyId'} element={<SurveyFormPage />} />
      </Routes>
    </div>
  );
}

export default App;
