import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import CopyToClipboard from "react-copy-to-clipboard";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./doc/doc.css"
import * as React from "react" 
import { Alert, AlertTitle, Snackbar } from "@mui/material";

export default function ApiGen() {
    const [Apikey, setApikey] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [gen, setGen] = React.useState(false);

    const genClick = () => {
        generate_api_key()
        setGen(true);
      };
    const genClose = () => {
        setGen(false);
      };
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const k = window.localStorage.user;
    const data = JSON.parse(k)
    const decodedHeader = jwt_decode(data.token);
    let pub_id = decodedHeader.public_id
    let resp // eslint-disable-line
    
    async function find_api_key(){
        try{
            resp = axios({url:`http://127.0.0.1:9000/api/service/find_api_key?public_id=${pub_id}`,
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                // data: {
                //     public_id: pub_id
                // }
            })
            .then(function(res){
                const key = res.data.API;
                setApikey(key);
            })
            // Apikey = resp.data;
            // console.log(Apikey)
        }catch(err){ 
            console.log(err); 
        }
    }
    find_api_key()
        
    async function generate_api_key() {
        try{
            resp = await axios({url:`http://127.0.0.1:9000/api/service/generate_api_key?public_id=${pub_id}`,
                method:'POST',
                headers: {
                            'Content-Type': 'application/json',
                        },
                // data: {
                //     public_id: pub_id
                // }
            }).then(function(res){
                const key = res.data;
                // genClick()
                console.log(key);
                setApikey(key)
            })
            console.log(Apikey);
        }catch(err){
            console.log(err);
        }
    }


  return (
    <div>
        {
            // Check Condtion..
            Apikey === null ? 
            <Box
                component="form"
                sx={{
                "& .MuiTextField-root": { m: 10, width: 400 }
                }}
                noValidate
                autoComplete="off"
            >   <p style={{margin: '10px', padding: '13px'}}>
                <Button variant="contained" onClick={genClick}>Generate API Key</Button>
                <p>
                    <strong>NOTE : </strong> API key is not Generate Automatic.
                    You Have Click the Button to Ganrate API Key.
                </p>
                    <Snackbar open={gen} autoHideDuration={6000} onClose={genClose}>
                        <Alert onClose={genClose} severity="success" sx={{ width: '100%' }}>
                            <AlertTitle>Success</AlertTitle>
                            Your API Key Generated. — <strong>check it out!</strong>
                        </Alert>
                    </Snackbar>
                </p>
            </Box>:
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: 400 }
                }}
                noValidate
                autoComplete="off"
            >
            <TextField
                id="outlined-read-only-input"
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <InfoOutlined />
                        </InputAdornment>
                    ),
                }}
                value={Apikey}
            />
            
                <CopyToClipboard text={Apikey}>
                    <Button style={{margin: '10px', padding: '13px'}} onClick={handleClick}
                        variant="contained">Copy API Key</Button>
                </CopyToClipboard>
                    <p style={{margin: '10px'}}><strong>NOTE : </strong> Your API Key Here Click Button to Copy. </p>
                    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            <AlertTitle>Success</AlertTitle>
                            Your API Key Copied. — <strong> USE TO Paste it!</strong>
                        </Alert>
                    </Snackbar>
            </Box>
        }
    </div>
    );
}
