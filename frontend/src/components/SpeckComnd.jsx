import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LinearProgress from '@mui/material/LinearProgress';
import {BasicPage} from "./BasicPage"
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import JSONPretty from "react-json-prettify";
import { atomOneDark } from "react-json-prettify/dist/themes";
import "../styles/doc/doc.scss";

import axios from "axios";
import jwt_decode from "jwt-decode";

export const SpeckComand = () => {
    const [Val, setVal ] = React.useState('');
    const [data, setData ] = React.useState(''); 
    const [progress, setProgress] = React.useState(false);

    const handleChange = (event) => {
        setVal(event.target.value);
      };
    
    const Submit = () => {
        const json = JSON.parse(window.localStorage.user)
        const d_token = jwt_decode(json.token)
        const p_id = d_token.public_id
        setProgress(true)

            axios({url:`http://127.0.0.1:9000/service/api/out?key=${p_id}&command=${Val}`,
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
            })
            .then(res => {
                    setData(res.data)
                    setProgress(false)
            })
            .catch(err => {
                    console.error(err);
            });        
    };


    return(
        <>
            {progress === true?
            <Box sx={{ width: '100%' }}>
            <LinearProgress />
            </Box>:
            <></> }
        <div className="main">
            <BasicPage title="Command Serach" icon={<ScreenSearchDesktopIcon />} />
            <hr />
            <div className="warp-center">
                <Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": { m: 1, width: 400 }
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        onChange={handleChange}
                        fullWidth
                        value={Val}
                    />
                    {Val === ''?
                    <Button style={{margin: '10px', padding: '1em 2em'}} 
                        disabled
                        variant="contained"> Submit</Button>:
                    <Button style={{margin: '10px', padding: '1em 2em'}} 
                        onClick={Submit}
                         variant="contained">Submit</Button>
                    }
                </Box>
                
            </div>
            <hr />
            <div><Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": { m: 1, width: 400 },
                        margin: '1ems'
                    }}
                    noValidate
                    autoComplete="off"
                >
                    {data === ''?
                    <></>:
                    <div className="bgtheam">
                        <JSONPretty 
                            json={data} 
                            theme={atomOneDark} 
                            padding={4} 
                        />
                    </div>}
                </Box></div>
        </div>
        </>
    )
}