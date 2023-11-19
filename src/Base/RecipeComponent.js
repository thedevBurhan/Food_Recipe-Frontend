import React, { useState } from "react";
import "./RecipeComponentcss.js";
import "../App.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
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
} from "./RecipeComponentcss.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axios from "axios";
const RecipeComponent = (props) => {
  const [marked, setMarked] = useState(false);
  // Ensure that bookmarkedRecipes is always an array
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);
  const [show, setShow] = useState("");
  const { label, image, ingredients, url, calories, totalTime } = props.recipe;
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
const handleBookmarkClick = (e) => {
  const isBookmarked = bookmarkedRecipes.some(
    (recipe) => recipe.label === label
  );

  if (!isBookmarked) {
    setBookmarkedRecipes((prevBookmarkedRecipes) => [
      ...prevBookmarkedRecipes,
      { label, ingredients, image, url, calories, totalTime },
    ]);
    toast.success("😁❤️ Added to your Bookmark!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  setMarked(!isBookmarked);

  // Pass the updated bookmarked recipes directly to setBookmarkedRecipes
  setBookmarkedRecipes((prevBookmarkedRecipes) => {
    window.localStorage.setItem("calories", prevBookmarkedRecipes.calories);
    window.localStorage.setItem("image", prevBookmarkedRecipes.image);
    console.log("Bookmarked Recipes:", prevBookmarkedRecipes);
    return prevBookmarkedRecipes; // Return the updated value
  });

  // Pass the event and updatedBookmarkedRecipes to addRecipe
  addRecipe(e, bookmarkedRecipes);
};


    // to add the Recipe data
    const addRecipe = async (e,updatedBookmarkedRecipes) => {
      // console.log(window.localStorage.getItem("id"));
      e.preventDefault();
      try {
        let req = await axios.post(
          `https://addtastetoyourfood.vercel.app/recipe/`,
          {
            userid: window.localStorage.getItem("id"),
            updatedBookmarkedRecipes
          },
          {
            headers: {
              authtoken: window.localStorage.getItem("token"),
            },
          }
        );
        const { data } = req;
        console.log(data);
        const { message, statusCode } = data;
        // console.log(data);
        if (statusCode === 200) {
         
          Toast.fire({ icon: "success", title: message });
        } else {
          Toast.fire({
            icon: "error",
            title: "Error in adding Transaction Data",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  const handleBookmarkClickonChange = () => {
    toast.warning("Remove Recipe From Bookmark!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
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
                    <TableCell align="right">Food</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ingredients.map((ingredient, index) => (
                    <React.Fragment key={index}>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">{ingredient.text}</TableCell>
                        <TableCell align="right">
                          {ingredient.foodCategory}
                        </TableCell>
                        <TableCell align="right">{ingredient.food}</TableCell>
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
            <SeeNewTab onClick={() => window.open(url)}>See More</SeeNewTab>
            <SeeMoreText onClick={() => setShow("")}>Close</SeeMoreText>
          </DialogActions>
        </div>
      </Dialog>

      <div>
        {marked ? (
          <BookmarkIcon
            className="marked"
            sx={{ fontSize: "30px", color: "#f55feb" }}
            onClick={handleBookmarkClickonChange}
          />
        ) : (
          <BookmarkBorderIcon
            className="marked"
            sx={{ fontSize: "30px" }}
            onClick={handleBookmarkClick}
          />
        )}
      </div>
      <CoverImage src={image} alt={label} />

      <RecipeName>{label}</RecipeName>
      <IngredientsText onClick={() => setShow(!show)}>
        Ingredients
      </IngredientsText>
      <SeeMoreText onClick={() => window.open(url)}>
        See Complete Recipe
      </SeeMoreText>
    </RecipeContainer>
  );
};

export default RecipeComponent;
