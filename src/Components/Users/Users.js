import React, { useEffect, useState } from "react";
import {
  Container,
  AppName,
  Header,
  RecipeImage,
  RecipeListContainer,
  Placeholder,
} from "../../Base/DashBoardcss.js";
import RecipeComponent from "../../Base/RecipeComponent.js";
import MenuIcon from "@mui/icons-material/Menu";
import PublicIcon from "@mui/icons-material/Public";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  FormControl,
  InputLabel,
  ListItemIcon,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const Users = () => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userIdKeys, setUserIdKeys] = useState({});
  const [type, setType] = useState("");
  const [personName, setPersonName] = useState([]);
  const [transData, setTransData] = useState([]);
  const [datas, setDatas] = useState({});
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleChange = (event) => {
    const selectedUserName = event.target.value;
    const selectedUserIdKey = userIdKeys[selectedUserName];
    localStorage.setItem("selectedUserKey", selectedUserIdKey);
    setType(selectedUserName);
    getRecipeData(selectedUserIdKey);
  };
  

  // Fetch user data
  const getallUserData = async () => {
    try {
      let req = await axios.get(
        `https://addtastetoyourfood.vercel.app/users/all`
      );
      const { data } = req.data;
      if (data && data.length > 0) {
        const namesArray = data.map((user) => user.name);
        const userIdKeysObject = {};

        data.forEach((user) => {
          const userIdKey = user.name;
          userIdKeysObject[userIdKey] = user._id;
          localStorage.setItem(userIdKey, user._id);
        });

        setPersonName(namesArray);
        setUserIdKeys(userIdKeysObject);
      } else {
        console.log("No user data available");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallUserData();
  }, []);

// for getting the Recipe from specificUser
const getRecipeData = async () => {
    try {
      // Get the selected user's key
      const selectedUserKey = localStorage.getItem("selectedUserKey");
  
    //  console.log("selectedUserKey:",selectedUserKey)
      if (!selectedUserKey) {
        // console.log("Selected user key not found.");
        return;
      }
  
  
      let req = await axios.get(
        `https://addtastetoyourfood.vercel.app/recipe/specificUser/${selectedUserKey}`,
        {
          headers: {
            authtoken: window.localStorage.getItem("token"),
          },
        }
      );
  
      const { data } = req;
      const { message, statusCode, allRecipeData } = data;
    //   console.log("data:", data);
      if(allRecipeData.length<=0){
        toast.warning("No Recipe To Be Shown!", {
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
                <AccountCircleIcon fontSize="small" />
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
      </Container>
      {/* for Users Select */}
      <div>
        <FormControl className="Select-menu">
          <InputLabel id="demo-simple-select-label">Select User</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Select User"
            onChange={handleChange}
            sx={{ width: 250 }}
          >
            {personName.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/* ----------------------- */}
      <RecipeListContainer>
        {transData?.length ? (
          transData.map((transData, index) => (
            <RecipeComponent key={index} recipe={transData} />
          ))
        ) : (
          <Placeholder src="/react-recipe-finder/RecipeLogo.png" />
        )}
      </RecipeListContainer>
    </div>
  );
};

export default Users;
