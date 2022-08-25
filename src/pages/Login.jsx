import * as React from "react";
import * as Yup from "yup";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form';

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useAuth } from "../hooks/useAuth";


export const LoginPage = () => {

  const { login } = useAuth()
  const [setEmail ] = useState('')
  const [setPassword ] = useState('')
  const [open, setOpen] = useState(false);
  
    // const handleClick = () => {
    //   setOpen(true)
    // }
    const handleClose = () => {
      setOpen(false);
    };

  const validationSchema = Yup.object().shape({
		email: Yup.string()
			.required('Email is Required.')
			.email('Email is Invalid.'),
		password: Yup.string()
			.required('Password is Required.')
			// eslint-disable-next-line
			.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
				"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
			),
	});

  const { register, handleSubmit, formState: {errors} } = useForm({
		resolver: yupResolver(validationSchema)
	});


  async function LoginUser(e) {
    // event.preventDefault()
    // const response = await fetch('http://127.0.0.1:9000/api/login', {
    //       method:'POST',
    //       headers: {
    //           'Content-Type': 'application/json',
    //       },

    //       body: JSON.stringify({
    //         email,
    //         password
    //       }),
          
    //   })

    //   const data = await response.json()
      
    //   if (data.email){
    //     alert("user Login Successfully.")
    //     login({
    //       email: data.email,
    //       password: data.password
    //     })
    //     // window.location.href = '/dashboard'
    //   }else{
    //     alert("Check Email And Password.")
    //   }
    //   console.log(data);

    try {
      const response = await axios({url:'http://127.0.0.1:9000/api/login', 
          method:'POST',
          headers: {
                      'Content-Type': 'application/json',
                  },
      
          data:{
                  email: e.email,
                  password: e.password
              }
      });
        const data = await response.data
        console.log(data);
        if (data.Token){
              login({
                token: data.Token,
                name: data.name,
                email: data.email
              })
              setOpen(false)
              window.location.href = '/dashboard'
            }else{
              setOpen(true)
            }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        {/* Form */}
        <Box component="form" onSubmit={handleSubmit(LoginUser)} noValidate sx={{ mt: 1 }} >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            // value={email}
            onChange={(e) => setEmail(e.target.value)}
            {...register('email')}
			      error={errors.email ? true : false }
            helperText={errors.email?.message}
            autoComplete="off"
            // autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            // value={password}
            onChange={(e) => setPassword(e.target.value)}
            {...register('password')}
			      error={errors.password ? true : false }
            helperText={errors.password?.message}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login In
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                  <strong>Check Email And Password!</strong>
              </Alert>
          </Snackbar>
          <Grid container>
            <Grid item>
              <RouterLink to="/register">
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
