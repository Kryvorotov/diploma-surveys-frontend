import React from "react";
import { isPast } from "../../../utils/date";
import { Container, Card, CardContent, Typography } from "@mui/material";
import MainList from "../../../components/basic/MainList";

const SortedListView = ({ surveys }) => {
  const finished = surveys.filter((survey) => isPast(survey.endAt));
  const planned = surveys.filter(
    (survey) => !isPast(survey.startAt) && !isPast(survey.endAt)
  );
  const current = surveys.filter(
    (survey) => !isPast(survey.endAt) && isPast(survey.startAt)
  );

  return (
    <Container>
      <h1>Опитування</h1>
      <br />
      <Card>
        <CardContent>
          <Typography
            variant="h6"
            component="h1"
            style={{ paddingInline: 0, fontWeight: 700 }}
          >
            Заплановані
          </Typography>
          <hr />
          <MainList surveys={planned} />
        </CardContent>
      </Card>
      <Card style={{ marginTop: 24 }}>
        <CardContent>
          <Typography
            variant="h6"
            component="h1"
            style={{ paddingInline: 0, fontWeight: 700 }}
          >
            В процессі
          </Typography>
          <hr />
          <MainList surveys={current} />
        </CardContent>
      </Card>
      <Card style={{ marginTop: 24 }}>
        <CardContent>
          <Typography
            variant="h6"
            component="h1"
            style={{ paddingInline: 0, fontWeight: 700 }}
          >
            Завершені
          </Typography>
          <hr />
          <MainList surveys={finished} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default SortedListView;
