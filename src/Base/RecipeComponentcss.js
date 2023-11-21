import styled from "styled-components";
const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 300px;
  box-shadow: 0 3px 10px 0 #dbdbd9;
  border-radius: 15px;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 200px;
  border-radius: 15px;
`;
const RecipeName = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 400;
  color: black;
  margin: 10px 0;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SeeMoreText = styled.span`
  font-size: 14px;
  text-align: center;
  border-radius: 10px;
  padding: 4px 10px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  cursor: pointer;
`;
const IngredientsText = styled(SeeMoreText)`
  color: #2a9df4;
`;
const SeeNewTab = styled(SeeMoreText)`
  color: green;
`;
export {
  SeeNewTab,
  IngredientsText,
  SeeMoreText,
  RecipeName,
  CoverImage,
  RecipeContainer,
};
