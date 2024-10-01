import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StudentForm from "./components/StudentForm";
import BookForm from "./components/BookForm";
import BookAllcateForm from "./components/BookAllcateForm";
import StudentList from "./components/StudentList";

const App = () => {
  return (
    <Router>
      <AppBar component="nav" position="static" sx={{paddingBottom: '20px', marginBottom: '20px'}}>
        <Toolbar>
          <Typography variant="h5" color="inherit" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            Student Library Management System
          </Typography>
          <Button component={Link} color="inherit" to="/">Home</Button>
          <Button component={Link} color="inherit" to="/addStudent">Add Student</Button>
          <Button component={Link} color="inherit" to="/addBook">Add Book</Button>
          <Button component={Link} color="inherit" to="/allocateBook">Book Allocate</Button>
          <Button component={Link} color="inherit" to="/stuedntlist">Student List</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
              >
                <Typography variant="h3">
                  Welcome to the Student Library Management System
                </Typography>
              </Box>
            }
          />
          <Route path="/addStudent" element={<StudentForm />} />
          <Route path="/addBook" element={<BookForm />} />
          <Route path="/allocateBook" element={<BookAllcateForm />} />
          <Route path="/stuedntlist" element={<StudentList />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
