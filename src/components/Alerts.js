import React, {useState} from 'react';
import {Alert, AlertTitle, IconButton, Stack} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch, useSelector} from "react-redux";
import {removeAlert} from "../redux/slices/alertsSlice";
const Alerts = () => {

    const dispatch = useDispatch()
    const alerts = useSelector((state) => state.alertsReducer)

    const removeThisAlert = (id) => {
        dispatch(removeAlert(id));
    }

    return (
        <Stack sx={{ width: '100%' }} spacing={2} style={{position: 'fixed', right: 10, bottom: 10, width: 400, zIndex: 1}}>
            {alerts.map(alert =>
                <Alert severity={alert.alertType} key={alert.id}
                       action={
                           <IconButton
                               aria-label="close"
                               color="inherit"
                               size="small"
                               onClick={() => removeThisAlert(alert.id)}
                           >
                               <CloseIcon fontSize="inherit" />
                           </IconButton>
                       }
                >
                    <AlertTitle>{alert.alertType.charAt(0).toUpperCase() + alert.alertType.slice(1)}</AlertTitle>
                    {alert.message}
                </Alert>
            )}
        </Stack>
    );
};

export default Alerts;