import {
  Button,
  ListItemIcon,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import {
  Container,
  AppName,
  Header,
  RecipeImage,
} from "../../Base/DashBoardcss.js";
import "./addnewrecipe.css";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import GroupsIcon from "@mui/icons-material/Groups";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Paper from "@mui/material/Paper";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import Swal from "sweetalert2";

const AddNewRecipe = () => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  // for alert----------
  //  alert Function
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  //   table----

  const [ingredients, setIngredients] = useState([]);

  const handleAddIngredient = () => {
    const newIngredient = {
      text: "",
      foodCategory: "",
      weight: "",
      measure: "",
      quantity: "",
    };
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  };
  const handleInputChange = (index, field, value) => {
    setIngredients((prevIngredients) => {
      const newIngredients = [...prevIngredients];
      newIngredients[index][field] = value;
      switch (field) {
        case "quantity":
          setQuantity(value);
          break;
        case "measure":
          setMeasure(value);
          break;
        case "foodCategory":
          setFoodCategory(value);
          break;
        case "text":
          setText(value);
          break;
        case "weight":
          setWeight(value);
          break;
        default:
          break;
      }

      // console.log("newIngredients", newIngredients);
      return newIngredients;
    });
  };

  const handleDeleteIngredient = (index) => {
    setIngredients((prevIngredients) => {
      const newIngredients = [...prevIngredients];
      newIngredients.splice(index, 1);
      return newIngredients;
    });
  };
  // ---------------------
  // image handle

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };
  // -----------------------------------
  //   ----Adding new recipe---
  const [calories, setCalories] = useState("");
  const [label, setLabel] = useState("");
  const [image, setImage] = useState("");
  const [measure, setMeasure] = useState("");
  const [weight, setWeight] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [text, setText] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [loading, setLoading] = useState(false);

  const AddRecipe = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("userid", window.localStorage.getItem("id"));
    formData.append("calories", calories);
    formData.append("label", label);
    formData.append("totalTime", totalTime);
    // Append each ingredient separately to formData
    ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}][measure]`, ingredient.measure);
      formData.append(`ingredients[${index}][weight]`, ingredient.weight);
      formData.append(
        `ingredients[${index}][foodCategory]`,
        ingredient.foodCategory
      );
      formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
      formData.append(`ingredients[${index}][text]`, ingredient.text);
    });

    console.log("Request Data:", formData);

    try {
      const response = await axios.post(
        `https://addtastetoyourfoods.onrender.com/recipe/`,
        formData,
        {
          headers: {
            authtoken: window.localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { data } = response;
      const { message, statusCode } = data;

      if (statusCode === 200) {
        Toast.fire({ icon: "success", title: message });
      } else {
        Toast.fire({
          icon: "error",
          title: "Error in adding Recipe Data",
        });
      }

      // Reset form fields
      setFoodCategory("");
      setQuantity("");
      setText("");
      setTotalTime("");
      setCalories("");
      setLabel("");
      setImage("");
      setMeasure("");
      setWeight("");
      setIngredients([]);

      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      Toast.fire({
        icon: "error",
        title: "Error in adding Recipe Data",
      });
    }
  };
  const user = window.localStorage.getItem("user");
  return (
    <div>
      <div className="addrecipebg">
        <Container>
          <Header>
            <AppName>
              <RecipeImage src="/react-recipe-finder/Logo.png" />
              Recipe Finder
            </AppName>
          </Header>
          <div className="hamburger-menu">
            <MenuIcon
              className={`menu-button ${menuOpen ? "open" : ""}`}
              onClick={toggleMenu}
            ></MenuIcon>
            <div className={`menu-items ${menuOpen ? "open" : ""}`}>
              <MenuItem className="menu-item">
                <ListItemIcon sx={{ color: "#2a9df4" }}>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                {user}
              </MenuItem>
              <MenuItem
                className="menu-item"
                onClick={() => history.push("/DashBoard")}
              >
                <ListItemIcon
                  sx={{ color: "#2a9df4" }}
                  onClick={() => history.push("/DashBoard")}
                >
                  <PublicIcon fontSize="small" />
                </ListItemIcon>
                Global
              </MenuItem>
              <MenuItem
                className="menu-item"
                onClick={() => history.push("/Users")}
              >
                <ListItemIcon
                  sx={{ color: "#2a9df4" }}
                  onClick={() => history.push("/Users")}
                >
                  <GroupsIcon fontSize="small" />
                </ListItemIcon>
                Users
              </MenuItem>
              <MenuItem
                className="menu-item"
                onClick={() => history.push("/BookMarked")}
              >
                <ListItemIcon
                  sx={{ color: "#2a9df4" }}
                  onClick={() => history.push("/BookMarked")}
                >
                  <BookmarksIcon fontSize="small" />
                </ListItemIcon>
                Bookmarks
              </MenuItem>
              <MenuItem className="menu-item" onClick={() => history.push("/")}>
                <ListItemIcon
                  sx={{ color: "#2a9df4" }}
                  onClick={() => history.push("/")}
                >
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </div>
          </div>
          <div className="add-container">
            <form onSubmit={AddRecipe}>
              <div className="add">
                <h3 className="addHead">Recipe : </h3>
                <TextField
                  id="standard-basic"
                  label="Eg:Biriyani"
                  variant="standard"
                  className="field"
                  value={label}
                  type="text"
                  onChange={(e) => {
                    setLabel(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="add">
                <h3 className="addHead">Duration : </h3>
                <TextField
                  id="standard-basic"
                  label="Mins"
                  variant="standard"
                  type="number"
                  className="field"
                  value={totalTime}
                  onChange={(e) => {
                    setTotalTime(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="add">
                <h3 className="addHead">Calories : </h3>
                <TextField
                  id="standard-basic"
                  label="Eg:45.25"
                  variant="standard"
                  className="field"
                  type="number"
                  value={calories}
                  onChange={(e) => {
                    setCalories(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="add">
                <h3 className="addHead">Image : </h3>
                <input
                  type="file"
                  id="myfile"
                  className="image"
                  required
                  name="myfile"
                  onChange={handleImageChange}
                />
              </div>
              <div className="add">
                <h3 className="addHead">
                  Ingredients : (Add Atleast one Ingredients*){" "}
                </h3>
                <TableContainer component={Paper}>
                  <Table className="table" aria-label="caption table">
                    <caption className="caption" onClick={handleAddIngredient}>
                      Add Ingredients
                    </caption>
                    <TableHead>
                      <TableRow>
                        <TableCell>Ingredients</TableCell>
                        <TableCell align="right">FoodCategory</TableCell>
                        <TableCell align="right">Weight&nbsp;(g)</TableCell>
                        <TableCell align="right">Quantity&nbsp;(g)</TableCell>
                        <TableCell align="right">Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ingredients.map((ingredient, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <TextField
                              id="standard-basic"
                              variant="standard"
                              required
                              value={ingredient.text}
                              onChange={(e) =>
                                handleInputChange(index, "text", e.target.value)
                              }
                            />
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              id="standard-basic"
                              variant="standard"
                              required
                              value={ingredient.foodCategory}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "foodCategory",
                                  e.target.value
                                )
                              }
                            />
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              id="standard-basic"
                              variant="standard"
                              required
                              type="number"
                              value={ingredient.weight}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "weight",
                                  e.target.value
                                )
                              }
                            />
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              id="standard-basic"
                              variant="standard"
                              required
                              type="number"
                              value={ingredient.quantity}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "quantity",
                                  e.target.value
                                )
                              }
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Delete Row">
                              <DeleteOutlineIcon
                                onClick={() => handleDeleteIngredient(index)}
                              />
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className="buttons">
                  <Button variant="text" type="submit">
                    Save
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => history.push("/Bookmarked")}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AddNewRecipe;
