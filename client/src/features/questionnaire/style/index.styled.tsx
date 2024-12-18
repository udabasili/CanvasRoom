import styled from '@emotion/styled';

import colors from '@/constant/colors.ts';

export const QuestionnaireContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: max-content 1fr;
`;

// Header Section
export const Header = styled.header`
  background-color: ${colors.primaryColor};
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
  background-color: #ffff;
  color: #000;
`;

export const QuestionList = styled.ul`
  list-style: none;
  padding: 4rem 1rem;
  overflow-y: auto;
`;

export const QuestionItem = styled.li`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  margin: 10px 15px;
  padding: 15px;
  border-radius: 5px;
  display: grid;
  gap: 10px;
  grid-template-rows: min-content 1fr min-content;
`;

export const QuestionTitle = styled.h2`
  font-size: 18px;
  color: #000000;
  font-weight: bolder;
  cursor: pointer;
`;

export const QuestionBody = styled.p`
  font-size: 14px;
  color: #555;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-self: flex-end;
  justify-content: flex-end;
  grid-row: 3;
  grid-column: 1;
`;

export const ActionButton = styled.button`
  padding: 12px 10px;
  background-color: ${colors.primaryColor};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;

  &:hover {
    background-color: #005fa3;
  }
`;
