import React from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { getDate, isPast } from "../../utils/date";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  EDIT_ROUTE,
  SURVEY_FORM_ROUTE,
  SURVEY_ROUTE,
} from "../../utils/consts";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PollIcon from "@mui/icons-material/Poll";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteSurvey, fetchSurveys } from "../../services/survey-service";

const MainList = ({ surveys }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async (surveyId) => {
    const ok = await dispatch(deleteSurvey(surveyId));
    if (ok) {
      dispatch(fetchSurveys());
    }
  };

  return (
    <List>
      {surveys.map((survey) => (
        <ListItem
          key={survey.id}
          secondaryAction={
            <div>
              {isPast(survey.startAt) && (
                <IconButton>
                  <RemoveRedEyeIcon
                    onClick={() => navigate(SURVEY_ROUTE + "/" + survey.id)}
                  />
                </IconButton>
              )}
              {!isPast(survey.startAt) && (
                <IconButton>
                  <EditIcon
                    onClick={() => navigate(EDIT_ROUTE + "/" + survey.id)}
                  />
                </IconButton>
              )}
              <IconButton>
                <DeleteIcon onClick={() => handleDelete(survey.id)} />
              </IconButton>
            </div>
          }
        >
          <ListItemButton
            onClick={() =>
              navigate(
                (isPast(survey.endAt) ? SURVEY_ROUTE : SURVEY_FORM_ROUTE) +
                  "/" +
                  survey.id
              )
            }
            disabled={!isPast(survey.startAt) && !isPast(survey.endAt)}
          >
            <ListItemIcon>
              <PollIcon
                color={isPast(survey.endAt) ? "primary" : "secondary"}
              />
            </ListItemIcon>
            <ListItemText
              primary={survey.title}
              secondary={
                "Start at: " +
                getDate(survey.startAt) +
                ". End at: " +
                getDate(survey.endAt)
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default MainList;
