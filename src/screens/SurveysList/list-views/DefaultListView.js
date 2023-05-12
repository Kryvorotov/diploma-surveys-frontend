import React from 'react';
import {
    Card,
    Container,
    Typography,
    CardContent
} from "@mui/material";
import MainList from "../../../components/basic/MainList";

const DefaultListView = ({surveys}) => {

    return (
        <Container>
            <Card style={{marginTop: 24}}>
                <CardContent>
                    <Typography variant="h6" component="h1" style={{paddingInline: 0, fontWeight: 700}}>
                        За датою створення
                    </Typography>
                    <hr/>
                    <MainList surveys={surveys} />
                </CardContent>
            </Card>
        </Container>
    );
};

export default DefaultListView;