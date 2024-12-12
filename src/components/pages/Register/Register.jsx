import React from 'react';
import { Typography, Box, TextField, Button, Paper, InputAdornment } from '@mui/material';
import { Person, Email, ListAlt } from '@mui/icons-material'; // Importing icons
import { useFormik } from 'formik'; // Importing Formik
import * as Yup from 'yup'; // For validation schema
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation
import './Register.css'; // Import the external CSS file

const RegisterPage = () => {
  const navigate = useNavigate(); // Initialize navigate function

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      rollNo: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[a-zA-Z ]+$/, 'Name must contain only letters and spaces')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      rollNo: Yup.string()
        .matches(/^[0-9]+$/, 'Roll No must contain only numbers')
        .required('Roll No is required'),
    }),
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
      // Navigate to the "Instruction" page
      navigate('/instruction');
    },
  });

  return (
    <div className="background-container">
      <Box className="content">
        <Paper elevation={3} className="form-paper">
          <Typography variant="h3" component="h1" className="header-text">
            Register
          </Typography>
          <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              className="form-field"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              className="form-field"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Roll No"
              variant="outlined"
              fullWidth
              margin="normal"
              className="form-field"
              name="rollNo"
              value={formik.values.rollNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.rollNo && Boolean(formik.errors.rollNo)}
              helperText={formik.touched.rollNo && formik.errors.rollNo}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ListAlt />
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Register
            </Button>
          </form>
        </Paper>
      </Box>
    </div>
  );
};

export default RegisterPage;
