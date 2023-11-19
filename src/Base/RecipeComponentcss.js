import styled from 'styled-components';
const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 300px;
  box-shadow: 0 3px 10px 0 #dbdbd9;
  border-radius:15px
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 200px;
  border-radius:15px
`;
const RecipeName = styled.span`
display: flex;
flex-direction: column;
  font-size: 18px;
  font-weight: 400;
  color: black;
  margin: 10px 0;
  
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: Lato ;
`;
const SeeMoreText = styled.span`
  color: #c428eb;
  font-size: 16px;
  text-align: center;
  border-radius: 10px;
  padding: 8px 15px;
  font-family: Lato ;
  cursor: pointer;
`;
const IngredientsText = styled(SeeMoreText)`
  color: #eb28de;
`;
const SeeNewTab = styled(SeeMoreText)`
  color: green;
`;
export {SeeNewTab,IngredientsText,SeeMoreText,RecipeName,CoverImage,RecipeContainer};