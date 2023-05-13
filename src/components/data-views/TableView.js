import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {countElement} from "../../utils/math";

const TableView = ({responses, func, columnName}) => {

    const getScores = (responses) => {
        return responses.map(response => response.score)
    }

    const scores = getScores(responses)

    function createData(label, value) {
        return { label, value };
    }

    const rows = [
        createData('Дуже добре', func(scores, 5)),
        createData('Добре', func(scores, 4)),
        createData('Нормально', func(scores, 3)),
        createData('Погано', func(scores, 2)),
        createData('Дуже погано', func(scores, 1))
    ];

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Оцінка</TableCell>
                        <TableCell align="center">{columnName}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.label}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.label}
                            </TableCell>
                            <TableCell align="center">{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableView;