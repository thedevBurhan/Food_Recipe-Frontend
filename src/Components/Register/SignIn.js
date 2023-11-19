import React from "react";
import Base from "../../Base/RegBase/Base";
import "./Reg.css";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
// form validation
export const filedValidationScheme = yup.object({
  name: yup.string().required("Please fill your name"),
  email: yup.string().required("Please fill your email"),
  password: yup.string().required("Please fill password"),
});
const Register = () => {
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: filedValidationScheme,
      onSubmit: (userInfo) => {
        // console.log("onsubmit",userInfo)
        handleSignIn(userInfo);
      },
    });
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // pop-up message
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    history.push("/");
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        close
      </IconButton>
    </React.Fragment>
  );
  // pop-up end------------------------------------------------------------------------------------------------------------------------

  // fetch
  const handleSignIn = async (userInfo) => {
    const res = await fetch(
      `https://addtastetoyourfood.vercel.app/users/signup`,
      {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    localStorage.setItem("token", data.token);
    // console.log(data);
    console.log(localStorage.setItem("token", data.token));
    handleClick();
  };
 
  const history = useHistory();
  return (
    <div>
      <body className="mainBg">
        <Base title={"New Registration"}>
          <div className="container">
            <Card className="Bg-color">
              <form onSubmit={handleSubmit} className="form">
                <CardContent>
                  <h2 className="headings">For New Users</h2>
                  <TextField
                    sx={{ width: "300px" }}
                    id="standard-basic"
                    variant="standard"
                    label="Enter Name"
                    name="name"
                    type="name"
                    size="small"
                    onBlur={handleBlur}
                    value={values.name}
                    onChange={handleChange}
                  />
                  <div style={{ color: "crimson", fontSize: "small" }}>
                    {touched.name && errors ? errors.name : ""}
                  </div>
                </CardContent>
                <CardContent>
                  <TextField
                    sx={{ width: "300px" }}
                    id="standard-basic"
                    variant="standard"
                    label="Email"
                    name="email"
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    type="email"
                    size="small"
                  />
                  <div style={{ color: "crimson", fontSize: "small" }}>
                    {touched.email && errors ? errors.email : ""}
                  </div>
                </CardContent>
                <CardContent>
                  <TextField
                    sx={{ width: "300px" }}
                    id="standard-basic"
                    variant="standard"
                    label="Password"
                    name="password"
                    onBlur={handleBlur}
                    value={values.password}
                    onChange={handleChange}
                    type="password"
                    size="small"
                  />
                  <div style={{ color: "crimson", fontSize: "small" }}>
                    {touched.password && errors ? errors.password : ""}
                  </div>
                </CardContent>
                <div className="Reg">
                <Button
                    className="button-Bg"
                    type="submit"
                    variant="outlined"
                  >
                    Register
                  </Button>
                <Button
                  className="button-Bg"
                  onClick={() => history.push("/")}
                  variant="outlined"
                >
                  Login
                </Button>
                 
                </div>
              </form>
             
               
               
              
            </Card>
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              message="Signin Successfull"
              action={action}
            />
          </div>
        </Base>
      </body>
    </div>
  );
};
export default Register;
