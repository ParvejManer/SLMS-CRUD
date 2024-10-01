// src/components/BookForm.js
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Container, Box, Typography } from "@mui/material";
import { addRecord } from "../utils/indexedDB";

const validationSchema = Yup.object({
  bookName: Yup.string()
    .required("Book name is required"),
});

const BookForm = () => {
  const formik = useFormik({
    initialValues: {
      bookName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      console.log(values)
      await addRecord("books", { bookName: values.bookName });
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
        <Typography variant="h4">Book Form</Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          id="bookName"
          name="bookName"
          label="Book Name"
          InputLabelProps={{ shrink: true }}
          value={formik.values.bookName}
          onChange={formik.handleChange}
          error={formik.touched.bookName && Boolean(formik.errors.bookName)}
          helperText={formik.touched.bookName && formik.errors.bookName}
          required
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Add Book
        </Button>
      </form>
    </Container>
  );
};

export default BookForm;
