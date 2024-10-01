import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentForm from "./components/StudentForm";
import BookForm from "./components/BookForm";

const App = () => {
  return (
    <Router>
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
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
