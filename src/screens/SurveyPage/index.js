import React, {useEffect} from 'react';
import {Box, Button, Container, Divider, Paper, Tab, Tabs, Typography} from "@mui/material";
import {getSurveyById, getSurveyComment, getSurveyQuestions} from "../../services/survey-service";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getDate} from "../../utils/date";
import PropTypes from "prop-types";
import OverviewTab from "../../components/tabs/OverviewTab";
import QuestionsTab from "../../components/tabs/QuestionsTab";
import UsersTab from "../../components/tabs/UsersTab";

const SurveyPage = () => {
    const dispatch = useDispatch()
    const { surveyId } = useParams()
    const { survey } = useSelector((state) => state.surveysReducer);
    const { questions } = useSelector((state) => state.surveysReducer);
    const { comments } = useSelector((state) => state.surveysReducer);

    useEffect(() => {
        dispatch(getSurveyById(surveyId))
        dispatch(getSurveyQuestions(surveyId))
        dispatch(getSurveyComment(surveyId))
    }, [])

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
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper>
            <Container>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h1>
                        <Typography variant="h4" component="h1">
                            {survey.title}
                        </Typography>
                    </h1>
                    <div style={{display: 'flex', gap: 10, alignItems: 'center'}}>

                        <Typography variant="h6" color="gray">
                            Закінчується {getDate(survey.endAt)}
                        </Typography>
                        <Button variant="contained">
                            Export as PDF
                        </Button>
                    </div>
                </div>
                <Divider />
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Огляд" {...a11yProps(0)} />
                            <Tab label="Питання" {...a11yProps(1)} />
                            <Tab label="Користувачі" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <OverviewTab questions={questions} />
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