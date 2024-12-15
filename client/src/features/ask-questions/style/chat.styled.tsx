import styled from '@emotion/styled';

import colors from '@/constant/colors.ts';

export const ChatWindowContainer = styled.div`
  display: grid;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #f0f0f0;
  grid-template-rows: 3rem 1fr 3rem;
`;
export const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid #e0e0e0;
`;
export const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;
export const ChatFooter = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.secondaryColor};
  border-top: 1px solid #e0e0e0;
`;
