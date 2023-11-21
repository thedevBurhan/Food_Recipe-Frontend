import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  SeeNewTab,
  IngredientsText,
  SeeMoreText,
  RecipeName,
  CoverImage,
  RecipeContainer,
} from "../../Base/RecipeComponentcss.js";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Swal from "sweetalert2";
const UsersComponent = (props) => {
  // console.log(props)
  const [transData, setTransData] = useState([]);
  const [datas, setDatas] = useState({});
  const [show, setShow] = useState("");
  const { label, image, ingredients, calories, totalTime } = props.recipe;
 // Checking if image exists before destructuring its properties
const { destination, filename } = image || {};
const filenames = filename ? filename.split(',') : [];
const displayFilename = filenames.length > 0 ? filenames[0] : '';
const imageURL = `https://addtastetoyourfoods.onrender.com/${destination || ''}${displayFilename}`;

  // for alert----------
  // alert Function
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
  const getRecipeData = async () => {
    try {
      let y = window.localStorage.getItem("id");
      // console.log(y);
      let req = await axios.get(
        `https://addtastetoyourfoods.onrender.com/recipe/specificUser/${y}`,
        {
          headers: {
            authtoken: window.localStorage.getItem("token"),
          },
        }
      );
      const { data } = req;
      const { message, statusCode, allRecipeData } = data;
      // console.log("data:", data);
      if (statusCode === 200) {
        setTransData(allRecipeData);
        // console.log("allRecipeData:", allRecipeData);
      } else {
        setDatas({ message });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // for delete Recipe
  const delRecipeData = async (id) => {
    // console.log(id);
    try {
      let req = await axios.delete(
        `https://addtastetoyourfoods.onrender.com/recipe/deleteRecipeData/${id}`,
        {
          headers: {
            authtoken: window.localStorage.getItem("token"),
          },
        }
      );
      const { data } = req;
      const { message, statusCode } = data.data;
      if (statusCode === 200) {
        getRecipeData();
        Toast.fire({ icon: "success", title: message });
      } else {
        Toast.fire({ icon: "error", title: "Can't delete Recipe Data" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRecipeData();
  }, []);
  return (
    <RecipeContainer>
      <Dialog
        maxWidth="lg" // Adjust the width as needed (xs | sm | md | lg | xl)
        fullWidth
        aria-labelledby="simple-dialog-title"
        open={!!show}
      >
        <div>
          <DialogTitle>Ingredients</DialogTitle>
          <DialogContent>
            <RecipeName>{label}</RecipeName>

            <RecipeName> Preparation : {totalTime} mins</RecipeName>
            <RecipeName> Toatal Calories : {calories}</RecipeName>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1000 }} size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#9b9e9c" }}>
                    <TableCell align="center">Ingredient</TableCell>
                    <TableCell align="right">Category</TableCell>
                    <TableCell align="right">Weight</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ingredients.map((ingredient, index) => (
                    <React.Fragment key={index}>
                      <TableRow>
                        <TableCell align="left">{ingredient.text}</TableCell>
                        <TableCell align="right">
                          {ingredient.foodCategory}
                        </TableCell>
                        <TableCell align="right">{ingredient.weight}</TableCell>
                        <TableCell align="right">
                          {ingredient.quantity}
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <SeeNewTab onClick={() => window.open("https://www.youtube.com/")}>
              See More
            </SeeNewTab>
            <SeeMoreText onClick={() => setShow("")}>Close</SeeMoreText>
          </DialogActions>
        </div>
      </Dialog>
      <div>
        <DeleteIcon
          className="marked"
          sx={{ fontSize: "30px", color: "#8ac8f8", float: "left" }}
          onClick={() => delRecipeData(props.recipe._id)} // Using props.recipe._id
        />
      </div>

      <CoverImage
        src={imageURL}
        alt={label}
        style={{
          objectFit: "cover",
          height: "200px",
          borderRadius: "15px"
        }}
      />

      <RecipeName>{label}</RecipeName>
      <IngredientsText onClick={() => setShow(!show)}>
        Ingredients
      </IngredientsText>
      <SeeMoreText onClick={() => window.open("https://www.youtube.com/")}>
        See Complete Recipe
      </SeeMoreText>
    </RecipeContainer>
  );
};

export default UsersComponent;
