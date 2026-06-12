import React, { useState, useEffect } from "react";



const STUDENTS_KEY = "students";
const SESSION_KEY = "student_session";


function getStudents() {
  return JSON.parse(localStorage.getItem(STUDENTS_KEY)) || [];
}

function saveStudents(students) {
  localStorage.setItem(
    STUDENTS_KEY,
    JSON.stringify(students)
  );
}

function saveSession(student) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(student)
  );
}

function getSession() {
  return JSON.parse(
    localStorage.getItem(SESSION_KEY)
  );
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}



function Signup({ setPage }) {

  const [form, setForm] = useState({
    name: "",
    roll: "",
    course: "",
    email: "",
    password: "",
  });

  function handleChange(event) {

    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(event) {

    event.preventDefault();

    const students = getStudents();

    const studentExists = students.find(
      (student) => student.email === form.email
    );

    if (studentExists) {
      alert("Student already registered");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: form.name,
      roll: form.roll,
      course: form.course,
      email: form.email,
      password: form.password,
    };

    saveStudents([
      ...students,
      newStudent,
    ]);

    alert("Signup Successful");

    setForm({
      name: "",
      roll: "",
      course: "",
      email: "",
      password: "",
    });

    setPage("login");
  }

  return (
    <div className="container">

      <div className="box">

        <h1>Student Signup</h1>

        <form onSubmit={handleSubmit}>

          <div className="row">

            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="roll"
              placeholder="Roll Number"
              value={form.roll}
              onChange={handleChange}
              required
            />

          </div>

          <div className="row">

            <input
              type="text"
              name="course"
              placeholder="Enter Course"
              value={form.course}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              required
            />

          </div>

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Signup
          </button>

        </form>

        <p>
          Already have account?{" "}
          <span onClick={() => setPage("login")}>
            Login
          </span>
        </p>

      </div>

    </div>
  );
}


function Login({
  setPage,
  setStudent,
}) {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {

    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(event) {

    event.preventDefault();

    const students = getStudents();

    const foundStudent = students.find(
      (student) =>
        student.email === form.email &&
        student.password === form.password
    );

    if (!foundStudent) {
      alert("Invalid Email or Password");
      return;
    }

    saveSession(foundStudent);

    setStudent(foundStudent);

    alert("Login Successful");

    setForm({
      email: "",
      password: "",
    });

    setPage("dashboard");
  }

  return (
    <div className="container">

      <div className="box">

        <h1>Student Login</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p>
          Don't have account?{" "}
          <span onClick={() => setPage("signup")}>
            Signup
          </span>
        </p>

      </div>

    </div>
  );
}



function Dashboard({
  student,
  logout,
}) {

  return (
    <div className="container">

      <div className="box">

        <h1>Student Dashboard</h1>

        <h2>
          Welcome {student.name}
        </h2>

        <p>
          <strong>Roll No:</strong>{" "}
          {student.roll}
        </p>

        <p>
          <strong>Course:</strong>{" "}
          {student.course}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {student.email}
        </p>

        <button onClick={logout}>
          Logout
        </button>

      </div>

    </div>
  );
}



export default function App() {

  const [page, setPage] =
    useState("signup");

  const [student, setStudent] =
    useState(null);

  /* AUTO LOGIN */

  useEffect(() => {

    const session = getSession();

    if (session) {
      setStudent(session);
      setPage("dashboard");
    }

  }, []);

  /* LOGOUT */

  function logout() {

    clearSession();

    setStudent(null);

    setPage("login");
  }

  /* CSS */

  useEffect(() => {

    const style =
      document.createElement("style");

    style.innerHTML = `

      body{
        margin:0;
        font-family:Arial, sans-serif;
        background:#fff8f0;
      }

      .container{
        display:flex;
        justify-content:center;
        align-items:center;
        min-height:100vh;
      }

      .box{
        width:420px;
        background:white;
        padding:30px;
        border-radius:12px;
        box-shadow:0 4px 12px rgba(0,0,0,0.1);
        text-align:center;
        border-top:6px solid #ff7b00;
      }

      h1{
        color:#ff7b00;
        margin-bottom:20px;
      }

      h2{
        color:#1f7a1f;
      }

      .row{
        display:flex;
        gap:10px;
      }

      .row input{
        width:100%;
      }

      input{
        width:100%;
        padding:12px;
        margin-top:12px;
        border:1px solid #b6e2b6;
        border-radius:6px;
        outline:none;
        font-size:15px;
        box-sizing:border-box;
      }

      input:focus{
        border-color:#1f7a1f;
        box-shadow:0 0 5px rgba(31,122,31,0.3);
      }

      button{
        width:100%;
        padding:12px;
        margin-top:18px;
        border:none;
        background:#1f7a1f;
        color:white;
        border-radius:6px;
        font-size:16px;
        cursor:pointer;
        transition:0.3s;
      }

      button:hover{
        background:#166316;
      }

      p{
        margin-top:15px;
        color:#444;
      }

      span{
        color:#ff7b00;
        cursor:pointer;
        font-weight:bold;
      }

      strong{
        color:#1f7a1f;
      }

    `;

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };

  }, []);

  /* PAGE ROUTING */

  if (page === "signup") {
    return (
      <Signup setPage={setPage} />
    );
  }

  if (page === "login") {
    return (
      <Login
        setPage={setPage}
        setStudent={setStudent}
      />
    );
  }

  return (
    <Dashboard
      student={student}
      logout={logout}
    />
  );
}
