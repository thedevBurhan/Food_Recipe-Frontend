import React, { useState } from "react";
import Base from "../../Base/RegBase/Base";
import Card from "@mui/material/Card";
import "./Reg.css";
import {
  Button,
  CardContent,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";

// form validation
export const filedValidationScheme = yup.object({
  name: yup.string().required("Please fill your name"),
  email: yup.string().required("Please fill your email"),
  password: yup.string().required("Please fill password"),
});
const Login = () => {
  const history = useHistory();
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: filedValidationScheme,
      onSubmit: (userInfo) => {
        console.log("onsubmit", userInfo);

        handleLogin(userInfo);
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
    history.push("/DashBoard");
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
  const handleLogin = async (userInfo) => {
    // console.log(userInfo)
    const res = await fetch(
      `https://addtastetoyourfood.vercel.app/users/login`,
      {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(res)
    const data = await res.json();
    // console.log(data)
    const datas = data.data.statusCode;
    // console.log(datas);
    if (datas === 404) {
      toast.success("😳User Not Found!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      history.push("/SignIn");
    } else if (datas === 400) {
      toast.error("Invalid Password 😳", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.success("😁❤️ Success!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("id", data.data.user._id);
      localStorage.setItem("user", data.data.user.email);
      localStorage.setItem("user", data.data.user.name);
      // console.log(data.data.user);
      // console.log(userInfo);
      handleClick();
    }
  };
  return (
    <div>
      <body className="mainBg">
        <Base title={"Login To Your Account"}>
          <div className="container">
            <Card className="Bg-color">
              <form onSubmit={handleSubmit} className="form">
                <CardContent>
                  <h2 className="headings">For Existing Users</h2>
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
                    label="Email"
                    name="email"
                    id="standard-basic"
                    variant="standard"
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
                    type="password"
                    label="Password"
                    name="password"
                    onBlur={handleBlur}
                    value={values.password}
                    onChange={handleChange}
                    size="small"
                  />
                  <div style={{ color: "crimson", fontSize: "small" }}>
                    {touched.password && errors ? errors.password : ""}
                  </div>
                </CardContent>
                <div className="forget-password">
                  <p>Forget password?</p>
                </div>
                <div className="button">
                  <Button
                    className="button-Bg"
                    type="submit"
                    variant="outlined"
                  >
                    Login
                  </Button>
                  <Button
                  className="button-Bg"
                  onClick={() => history.push("/SignIn")}
                  variant="outlined"
                >
                  Register
                </Button>
                </div>
              </form>
            </Card>
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              message="Login Successfully"
              action={action}
            />
          </div>
        </Base>
      </body>
    </div>
  );
};

export default Login;
