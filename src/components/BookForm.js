// src/components/BookForm.js
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Container, Box, Typography, List, ListItem, ListItemText, Table, TableHead, TableRow, TableCell, TableBody, Stack, IconButton } from "@mui/material";
import { addRecord, deleteRecord, getAllRecords } from "../utils/indexedDB";
import DeleteIcon from "@mui/icons-material/Delete";

const validationSchema = Yup.object({
  bookName: Yup.string()
    .required("Book name is required"),
});

const BookForm = () => {
  const [books, setBooks] = useState([]);
  const formik = useFormik({
    initialValues: {
      bookName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      console.log(values)
      await addRecord("books", { bookName: values.bookName });
      alert("Book added successfully...");
      actions.resetForm();
      fetchBooks();
    },
  });

  const handleDeleteBook = async(bookId) =>{
    const confirmed = window.confirm("Are you sure want to delete?")
    if(confirmed){
      await deleteRecord("books",bookId);
      fetchBooks();
    }
  }

  const fetchBooks = async() => {
    const allBooks = await getAllRecords("books");
    console.log(allBooks);
    setBooks(allBooks);
  }

  useEffect(()=> {
    fetchBooks();
  },[]);

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
          margin="normal"                                                                                      id="bookName"
          name="bookName"
          label="Book Name"
          InputLabelProps={{ shrink: true }}
          value={formik.values.bookName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bookName && Boolean(formik.errors.bookName)}
          helperText={formik.touched.bookName && formik.errors.bookName}
          required
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Add Book
        </Button>
      </form>
      <Box sx={{marginTop: 3}}>
        <Typography variant="h6" color="inherit">Available Books</Typography>
        {/* <List>
          {
            books.map((book)=>(
              <ListItem key={book.bookId}>
                <ListItemText primary={book.bookName}/>
              </ListItem>
            ))
          }
        </List> */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Book Id</strong></TableCell>
              <TableCell><strong>Book Name</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              books.map((book)=>(
                <TableRow key={book.bookId}>
                  <TableCell>{book.bookId}</TableCell>
                  <TableCell>{book.bookName}</TableCell>
                  <TableCell>
                    <Stack direction='row'>
                      <IconButton onClick={()=>handleDeleteBook(book.bookId)}>
                        <DeleteIcon color='error'/>
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default BookForm;
