import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
  Typography,
} from "@mui/material";
import { addRecord, getAllRecords } from "../utils/indexedDB";

const validationSchema = Yup.object({
  studentId: Yup.string()
    .required("Plaese select a student"),
  bookId: Yup.string()
    .required("Please selcet a book"),
});

const BookAllcateForm = () => {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setStudents(await getAllRecords("students"));
      setBooks(await getAllRecords("books"));
    };
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      studentId: "",
      bookId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      await addRecord("booksAllocate", values);
      console.log(values)
      alert("Book allocateed to student successfully...");
      actions.resetForm();
    },
  });

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" alignItems="center" textAlign="center">
        <Typography variant="h4">Book Allocation Form</Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth margin="normal" error={formik.touched.studentId && Boolean(formik.errors.studentId)}>
          <InputLabel>Studnelt</InputLabel>
          <Select
            id="studentId"
            name="studentId"
            value={formik.values.studentId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          >
            {students.map((student) => (
              <MenuItem key={student.id} value={student.id}>
                {student.name}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.studentId && formik.errors.studentId && (
            <FormHelperText>{formik.errors.studentId}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth margin="normal" error={formik.touched.bookId && Boolean(formik.errors.bookId)}>
          <InputLabel>Book</InputLabel>
          <Select
            id="bookId"
            name="bookId"
            value={formik.values.bookId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          >
            {books.map((book) => (
              <MenuItem key={book.bookId} value={book.bookId}>
                {book.bookName}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.bookId && formik.errors.bookId && (
            <FormHelperText>{formik.errors.bookId}</FormHelperText>
          )}
        </FormControl>




        <Button color="primary" variant="contained" fullWidth type="submit">
          Allocte Book
        </Button>
      </form>
    </Container>
  );
};



export default BookAllcateForm;














