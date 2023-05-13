import React, { useEffect, useState } from 'react'
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Card } from '@mui/material';
import { responsesList } from '../utils/responses';

function FormQuestion(props) {
    const [value, setValue] = useState(0);

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        if (value === 0) return
        props.addResponse(props.data.id, parseInt(value))
    }, [value])

    return (
        <Card style={{margin: '30px 0', padding: '20px'}}>
            <FormControl>
                <FormLabel component="legend" style={{ fontSize: '1.25rem', color: 'black', textTransform: 'uppercase', marginBottom: 10 }}>
                    {props.number}. {props.data.text}
                </FormLabel>
                <RadioGroup aria-label="rating" name={props.data.id} value={value} onChange={handleChange}>
                    {[...Array(5).keys()].map((value) => {
                        return <FormControlLabel key={value} value={responsesList[value].score} control={<Radio />} label={responsesList[value].label}  />
                    })}
                </RadioGroup>
            </FormControl>
        </Card>
        
    )
}

export default FormQuestion