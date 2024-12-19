import styled from '@emotion/styled';

import colors from '@/constant/colors.ts';
import { device } from '@/utils/responsive.ts';

export const ChatWindowContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 100%;
  background-color: #f0f0f0;

  @media ${device.mobile} {
    height: 85%;
  }
`;
export const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid #e0e0e0;
  height: 10%;
`;
export const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 1rem;
  height: 80%;
  max-height: 80%;
`;
export const ChatFooter = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.secondaryColor};
  border-top: 1px solid #e0e0e0;
  height: 10%;
`;
