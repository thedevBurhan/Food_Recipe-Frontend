import axios from 'axios';
import "./Hamburger.css"
import React, { useState } from "react";
import {
    Container,
    AppName,
    Header,
    SearchBox,
    SearchIcon,
    RecipeImage,
    Placeholder,
    SearchInput,
    RecipeListContainer,
  } from "./DashBoardcss.js"
import RecipeComponent from "./RecipeComponent.js"
import MenuIcon from '@mui/icons-material/Menu';
import PublicIcon from '@mui/icons-material/Public';
import GroupsIcon from '@mui/icons-material/Groups';
import { ListItemIcon, MenuItem } from '@mui/material';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const APP_ID = "ee0d21a7";
const APP_KEY = "4831551cfab603988f9e808f06b62411";
const DashBoard = () => {
  const history=useHistory();
    const [menuOpen, setMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };


    const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  const fetchData = async (searchString) => {
    const response =await axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`,
    );
    updateRecipeList(response.data.hits);
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
 const user=window.localStorage.getItem("user")
  return (
    <div>
      
    <Container>
      <Header>
        <AppName>
          <RecipeImage src="/react-recipe-finder/Logo.png"/>
          Recipe Finder
        </AppName>
        <SearchBox>
          <SearchIcon src="/react-recipe-finder/SearchIcon.png" />
          <SearchInput
            placeholder="Search"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      <div className="hamburger-menu">
      <MenuIcon className={`menu-button ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
      </MenuIcon>
      <div className={`menu-items ${menuOpen ? 'open' : ''}`}>
      <MenuItem  className="menu-item" >
            <ListItemIcon sx={{ color: "#2a9df4" }}>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            {user}
          </MenuItem>
      <MenuItem disabled className="menu-item" >
            <ListItemIcon sx={{ color: "#2a9df4" }}>
              <PublicIcon fontSize="small" />
            </ListItemIcon>
            Global
          </MenuItem>
          <MenuItem className="menu-item" onClick={() => history.push("/Users")}>
            <ListItemIcon sx={{ color: "#2a9df4" }} onClick={() => history.push("/Users")}>
              <GroupsIcon fontSize="small" />
            </ListItemIcon>
            Users
          </MenuItem>
          <MenuItem className="menu-item" onClick={() => history.push("/BookMarked")}>
            <ListItemIcon sx={{ color: "#2a9df4" }} onClick={() => history.push("/BookMarked")}>
              <BookmarksIcon fontSize="small" />
            </ListItemIcon>
            Bookmarks
          </MenuItem>
          <MenuItem className="menu-item" onClick={() => history.push("/")}>
            <ListItemIcon sx={{ color: "#2a9df4" }} onClick={() => history.push("/")}>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        
      </div>
    </div>
      <RecipeListContainer>
        {recipeList?.length ? (
          recipeList.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe.recipe} />
          ))
        ) : (
          <Placeholder src="/react-recipe-finder/RecipeLogo.png" />
        )}
        
      </RecipeListContainer>
    </Container>
    
    </div>
      );
}
 
export default DashBoard;