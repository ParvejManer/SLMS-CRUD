import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { getAllRecords, deleteRecord, updateRecord } from "../utils/indexedDB";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudentsData();
  }, []);

  const fetchStudentsData = async () => {
    const studentData = await getAllRecords("students");
    const allocateBooks = await getAllRecords("booksAllocate");
    const bookData = await getAllRecords("books");

    const studentsWithBooks = studentData.map((student) => {
      const books = allocateBooks
        .filter((allocate) => allocate.studentId === student.id)
        .map((allocate) => bookData.find((book) => book.bookId === allocate.bookId)); 
      return { ...student, books };
    });

    setStudents(studentsWithBooks);
  };

  const handleDeleteBook = async (studentId, bookId) => {
    const allocateBooks = await getAllRecords("booksAllocate");
    const allocation = allocateBooks.find(
      (record) => record.studentId === studentId && record.bookId === bookId
    );

    if (allocation) {
      await deleteRecord("booksAllocate", allocation.id);
      fetchStudentsData();
    }
  };

  const handleDeleteStudent = async (studentId) => {
    await deleteRecord("students", studentId);
    fetchStudentsData();
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  const handleSaveStudent = async () => {
    await updateRecord("students", editingStudent);
    setEditingStudent(null);
    fetchStudentsData();
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center" textAlign="center">
        <Typography variant="h4">List of Students</Typography>
      </Box>
      {students.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Roll Number</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Books Allocated</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                student && (
                  <TableRow key={student.id}>
                    <TableCell>
                      {editingStudent && editingStudent.id === student.id ? (
                        <input
                          type="text"
                          value={editingStudent.rollNumber}
                          onChange={(e) => setEditingStudent({ ...editingStudent, rollNumber: e.target.value })}
                        />
                      ) : (
                        student.rollNumber
                      )}
                    </TableCell>
                    <TableCell>
                      {editingStudent && editingStudent.id === student.id ? (
                        <input
                          type="text"
                          value={editingStudent.name}
                          onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                        />
                      ) : (
                        student.name
                      )}
                    </TableCell>
                    <TableCell>
                      {student.books.length > 0 ? (
                        student.books.map((book) => (
                          <div key={book.bookId}>
                            {book.bookName}
                            {" "}
                            <IconButton onClick={() => handleDeleteBook(student.id, book.bookId)}>
                              <DeleteIcon color="error" />
                            </IconButton>
                          </div>
                        ))
                      ) : (
                        <Typography variant="body2" color="textSecondary">No books allocated</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingStudent && editingStudent.id === student.id ? (
                        <>
                          <Button variant="contained" color="primary" onClick={handleSaveStudent}>Save</Button>
                          {" "}
                          <Button variant="contained" color="secondary" onClick={() => setEditingStudent(null)}>Cancel</Button>
                        </>
                      ) : (
                        <>
                          <IconButton onClick={() => handleEditStudent(student)}>
                            <EditIcon color="primary" />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteStudent(student.id)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                )
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" align="center">No data to display</Typography>
      )}
    </Container>
  );
  
};




export default StudentList;



















