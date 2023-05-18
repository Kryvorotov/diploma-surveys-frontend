import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import {
  getSurveyById,
  getSurveyComment,
  getSurveyQuestions,
} from "../../services/survey-service";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDate } from "../../utils/date";
import PropTypes from "prop-types";
import OverviewTab from "../../components/tabs/OverviewTab";
import QuestionsTab from "../../components/tabs/QuestionsTab";
import UsersTab from "../../components/tabs/UsersTab";
import jsPDF from "jspdf";
import { getAverage, getMostPopular } from "../../utils/math";
import { getScores } from "../../utils/responses";

const SurveyPage = () => {
  const dispatch = useDispatch();
  const { surveyId } = useParams();
  const { survey } = useSelector((state) => state.surveysReducer);
  const { questions } = useSelector((state) => state.surveysReducer);
  const { comments } = useSelector((state) => state.surveysReducer);
  const responses = questions.map((question) => question.responses).flat();

  useEffect(() => {
    dispatch(getSurveyById(surveyId));
    dispatch(getSurveyQuestions(surveyId));
    dispatch(getSurveyComment(surveyId));
  }, []);

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const exportAsPdf = () => {
    const doc = new jsPDF();
    doc.text("Title: " + survey.title, 10, 10);
    doc.line(10, 13, 400, 13);
    doc.text("Survey ID: " + survey.id, 10, 20);
    doc.text("Created At: " + getDate(survey.createdAt), 10, 30);
    doc.text("Start At: " + getDate(survey.startAt), 10, 40);
    doc.text("Ends At: " + getDate(survey.endAt), 10, 50);
    doc.line(10, 53, 400, 53);
    doc.text(
      "Most Popular answer: " + getMostPopular(getScores(responses)),
      10,
      60
    );
    doc.text("Average answer: " + getAverage(getScores(responses)), 10, 70);
    doc.text("Responses: " + responses.length, 10, 80);
    doc.line(10, 83, 400, 83);
    doc.text("Questions: ", 10, 90);
    let i = 100;
    questions.map((question) => {
      doc.text(
        question.text + ": " + getAverage(getScores(question.responses)),
        10,
        i
      );
      i = i + 10;
    });
    doc.save((survey.title + "").toLowerCase().replace(" ", "-") + ".pdf");
  };

  return (
    <Paper>
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>
            <Typography variant="h4" component="h1">
              {survey.title}
            </Typography>
          </h1>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Typography variant="h6" color="gray">
              Закінчується {getDate(survey.endAt)}
            </Typography>
            <Button variant="contained" onClick={exportAsPdf}>
              Export as PDF
            </Button>
          </div>
        </div>
        <Divider />
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Огляд" {...a11yProps(0)} />
              <Tab label="Питання" {...a11yProps(1)} />
              <Tab label="Користувачі" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <OverviewTab questions={questions} survey={survey} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <QuestionsTab questions={questions} comments={comments} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <UsersTab />
          </TabPanel>
        </Box>
      </Container>
    </Paper>
  );
};

export default SurveyPage;
