import * as React from 'react';
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup";
import axios from "axios";


export const RegisterPage = () => {
  const [setUsername ] = useState('')
  const [setEmail ] = useState('')
  const [setPassword ] = useState('')
  // const [confirmPassword, setConfirmPassword ] = useState('')
  const [setOpen] = useState(false);

    const handleClick = () => {
      setOpen(true)
    }

    let validationSchema = Yup.object().shape({
		username: Yup.string()
			.required('UserName is Required.')
			.min(3, 'Username is must 3 characters.'),
		email: Yup.string()
      .lowercase()
			.required('Email is Required.')
			.email('Email is Invalid.'),
		password: Yup.string()
			.required('Password is Required.')
			// eslint-disable-next-line
			.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
				"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character."
			),
    // confirmPassword: Yup.string()
    // .oneOf([Yup.ref('password'), null], 'Password must be match')
    // .required('Comfirm Password is Required.')
    
	});
	
	// filds validaction.
	const { register, handleSubmit, formState: {errors} } = useForm({
		resolver: yupResolver(validationSchema)
	});

    async function RegisterUser(e) {
    try {
            const response = await axios({url:'http://127.0.0.1:9000/api/register', 
                method:'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
            
                data:{
                  username: e.username,
                  email: e.email,
                  password: e.password
                }
                
            });
            const data = await response.data
            console.log(data.u_id);

              if (data.u_id){
                setOpen(false)
                window.location.href = '/login'
              }else{
                setOpen(true)
              }
            console.log(response);
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
          Register Page
        </Typography>
        <Box component="form" onSubmit={handleSubmit(RegisterUser)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="UserName"
            name="username"
            // value={username}
            onChange={(e) => setUsername(e.target.value)}
            {...register('username', {required: true, maxLength: 30 })}
			      error={errors.username ? true : false }
            helperText={errors.username?.message}
            autoComplete="username"
            // autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            // value={email}
            onChange={(e) => setEmail(e.target.value)}
            {...register('email', {required: true, maxLength: 30 })}
            error={errors.email ? true : false }
            helperText={errors.email?.message}
            autoComplete="email"
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
            {...register('password', {required: true, maxLength: 30 })}
            error={errors.password ? true : false }
            helperText={errors.password?.message}
            autoComplete="password"
          />
          {/* <TextField
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            // value={password}
            onChange={(e) => setConfirmPassword(e.target.value)}
            {...register('Confirm password', {required: true, maxLength: 30 })}
            error={errors.confirmPassword ? true : false }
            helperText={errors.confirmPassword?.message}
            autoComplete="Confirm password"
          /> */}
          <code style={{textAlign: 'justify'}}>
            By clicking on the "Create Account" button below, you understand and agree that the use of `SIGMA` web site is subject to the `Sigma.ai` Terms of Use.
          </code>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleClick}
          >
            Register
          </Button>
          <Grid container>
            <Grid item>
              <RouterLink to="/login">
                <Link href="#" variant="body2">
                  {"Don't have an account? Login"}
                </Link>
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
