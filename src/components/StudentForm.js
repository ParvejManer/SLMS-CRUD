// src/components/StudentForm.js
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Container, Box, Typography, Table, TableHead, TableRow, TableBody, TableCell, Stack, IconButton } from "@mui/material";
import { addRecord, deleteRecord, getAllRecords } from "../utils/indexedDB";
import DeleteIcon from "@mui/icons-material/Delete";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Full name is required"),
  rollNumber: Yup.string()
    .required("Roll number is required"),
});

const StudentForm = () => {
  const [student, setStudent] = useState([]);
  // const allStudents = getAllRecords("students");
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
      fetchStudents();
    },
  });

  const handleDeleteStudent = async(studentId) => {
    const confirmed = window.confirm("Are you sure to delete?");
    if(confirmed){
    await deleteRecord("students", studentId);
    fetchStudents();
  }
  }

  const fetchStudents = async() =>{
    const allStudents = await getAllRecords("students");
    console.log(allStudents);
    setStudent(allStudents);
  }

  useEffect(()=>{
    fetchStudents();
  }, []);

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
          onBlur={formik.handleBlur}
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
          placeholder="Class-RollNumber (e.g..10-01)"
          InputLabelProps={{ shrink: true }}
          value={formik.values.rollNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.rollNumber && Boolean(formik.errors.rollNumber)}
          helperText={formik.touched.rollNumber && formik.errors.rollNumber}
          required
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Add Student
        </Button>
      </form>

      <Box sx={{marginTop: 3}}>
        <Typography variant="h6" color="inherit">Students List</Typography>
        {/* <List>
          {student.map((std)=>(
            <ListItem key={std.id}>
              <ListItemText primary={std.name}/>
            </ListItem>
          ))}
        </List> */}

        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Student Name</strong></TableCell>
              <TableCell><strong>Roll Number</strong><small>(class-Roll No.)</small></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              student.map((stud)=>(
                <TableRow key={stud.id}>
                  <TableCell>{stud.name}</TableCell>
                  <TableCell>{stud.rollNumber}</TableCell>
                  <TableCell>
                    <Stack direction="row">
                      <IconButton onClick={()=>handleDeleteStudent(stud.id)}>
                        <DeleteIcon color="error"/>
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

export default StudentForm;
