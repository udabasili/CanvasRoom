import styled from '@emotion/styled';

export const QuestionnaireContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  max-width: 700px;
  height: 100%;
`;

// Header Section
export const Header = styled.header`
  background-color: #f48024;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SearchBar = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const QuestionList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const QuestionItem = styled.li`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  margin: 10px 0;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

export const QuestionTitle = styled.h2`
  font-size: 18px;
  color: #0074cc;
  cursor: pointer;
`;

export const QuestionDetails = styled.p`
  font-size: 14px;
  color: #555;
`;
