import React, {useEffect, useState} from 'react';
import styles from './styles.module.sass';
import {useDispatch, useSelector} from "react-redux";
import {fetchSurveys} from "../../services/survey-service";
import {Container, Skeleton, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ReorderIcon from '@mui/icons-material/Reorder';
import DefaultListView from "./list-views/DefaultListView";
import SortedListView from "./list-views/SortedListView";

function SurveysList() {
  const dispatch = useDispatch();
  const { surveys } = useSelector((state) => state.surveysReducer);

    const [listView, setListView] = useState('default')

    const handleListView = (event, newView) => {
        if (newView)
            setListView(newView)
    }

  useEffect(() => {
    dispatch(fetchSurveys());
  }, [])

  return (
    <div className={styles.container}>
        <Container>
            <ToggleButtonGroup
                value={listView}
                exclusive
                onChange={handleListView}
                size="small"
                aria-label="list view"
            >
                <ToggleButton value="default" aria-label="default list">
                    <ReorderIcon />
                </ToggleButton>
                <ToggleButton value="sorted" aria-label="sorted-list">
                    <FormatListBulletedIcon />
                </ToggleButton>
            </ToggleButtonGroup>
        </Container>
        {surveys && surveys.length > 0 && (
            <div>
                {listView === 'default' && <DefaultListView surveys={surveys} />}
                {listView === 'sorted' && <SortedListView surveys={surveys} />}
            </div>
        )}
        {!(surveys && surveys.length > 0) && (
            <Typography variant="h6" component="h1" style={{paddingInline: 0, fontWeight: 700}}>
                Нема опитувань
            </Typography>
        )}


    </div>
  );
}

export default SurveysList;
