// src/components/StudentForm.js
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Container, Box, Typography } from "@mui/material";
import { addRecord } from "../utils/indexedDB";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Full name is required"),
  rollNumber: Yup.string()
    .required("Roll number is required"),
});

const StudentForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      rollNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      await addRecord("students", values);
      console.log(values)
      alert("Student added successfully...");
      actions.resetForm();
    },
  });

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Typography variant="h4">Student Form</Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          id="name"
          name="name"
          label="Full Name"
          InputLabelProps={{ shrink: true }}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          id="rollNumber"
          name="rollNumber"
          label="Roll Number"
          InputLabelProps={{ shrink: true }}
          value={formik.values.rollNumber}
          onChange={formik.handleChange}
          error={formik.touched.rollNumber && Boolean(formik.errors.rollNumber)}
          helperText={formik.touched.rollNumber && formik.errors.rollNumber}
          required
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Add Student
        </Button>
      </form>
    </Container>
  );
};

export default StudentForm;
