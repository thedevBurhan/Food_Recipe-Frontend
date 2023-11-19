import React, { useEffect, useState } from "react";
import {
  Container,
  AppName,
  Header,
  RecipeImage,
  RecipeListContainer,
  Placeholder,
} from "../../Base/DashBoardcss.js";
import MenuIcon from '@mui/icons-material/Menu';
import PublicIcon from '@mui/icons-material/Public';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MarkedComponent from "./MarkedComponent.js";
import axios from "axios";
import { ListItemIcon, MenuItem } from "@mui/material";

const Bookmarked = () => {
    const history=useHistory();
    const [menuOpen, setMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
    
  
  const [transData, setTransData] = useState([]);
  const [datas, setDatas] = useState({});
  // for getting the Recipe from specificUser
  const getRecipeData = async () => {
    try {
      let y = window.localStorage.getItem("id");
      // console.log(y);
      let req = await axios.get(
        `https://addtastetoyourfood.vercel.app/recipe/specificUser/${y}`,
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
        setTransData(allRecipeData);
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
      <MenuIcon className={`menu-button ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
      </MenuIcon>
      <div className={`menu-items ${menuOpen ? 'open' : ''}`}>
      <MenuItem className="menu-item" onClick={() => history.push("/DashBoard")} >
            <ListItemIcon sx={{ color: "#2a9df4" }}  onClick={() => history.push("/DashBoard")}>
              <PublicIcon fontSize="small" />
            </ListItemIcon>
            Global
          </MenuItem>
          <MenuItem className="menu-item" onClick={() => history.push("/Users")}>
            <ListItemIcon sx={{ color: "#2a9df4" }} onClick={() => history.push("/Users")}>
              <AccountCircleIcon fontSize="small" />
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
          {transData?.length ? (
            transData.map((transData, index) => (
              <MarkedComponent key={index} recipe={transData} />
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
