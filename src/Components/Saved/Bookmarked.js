import React, { useEffect, useState } from "react";
import {
  Container,
  AppName,
  Header,
  RecipeImage,
  RecipeListContainer,
  Placeholder,
} from "../../Base/DashBoardcss.js";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import PublicIcon from "@mui/icons-material/Public";
import GroupsIcon from "@mui/icons-material/Groups";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MarkedComponent from "./MarkedComponent.js";
import axios from "axios";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { ListItemIcon, MenuItem, Tooltip } from "@mui/material";

const Bookmarked = () => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [recipeData, setRecipeData] = useState([]);
  const [datas, setDatas] = useState({});
  // for getting the Recipe from specificUser
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
      // console.log("data:",data);
      if (statusCode === 200) {
        setRecipeData(allRecipeData);
        // console.log("allRecipeData:",allRecipeData);
      } else {
        setDatas({ message });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRecipeData();
  }, []);
  const user = window.localStorage.getItem("user");
  return (
    <div>
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
              disabled
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
          <div className="addNew">
            <h5>
              Access your saved recipes and create new ones with ease,
              seamlessly managing both curated and personalized culinary
              creations.
            </h5>
            <MenuItem>
              <Tooltip title="Add Recipe">
                <AddToPhotosIcon
                  sx={{ color: "#2a9df4" }}
                  onClick={() => history.push("/AddRecipe")}
                />
              </Tooltip>
            </MenuItem>
          </div>
        </div>
        <RecipeListContainer>
          {recipeData?.length ? (
            recipeData.map((RecipeData, index) => (
              <MarkedComponent key={index} recipe={RecipeData} />
            ))
          ) : (
            <Placeholder src="/react-recipe-finder/RecipeLogo.png" />
          )}
        </RecipeListContainer>
      </Container>
    </div>
  );
};

export default Bookmarked;
