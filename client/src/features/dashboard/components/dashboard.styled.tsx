import styled from '@emotion/styled';

import colors from '@/constant/colors.ts';
import { device } from '@/utils/responsive.ts';

export const DashboardContainer = styled.section`
	grid-template-columns: inherit;
	grid-column: side-start / full-end;
	height: 100vh;
	display: grid;
`;

type ChannelContainerProps = {
	isVisible?: boolean;
};

export const ChannelContainer = styled.div<ChannelContainerProps>`
	grid-column: full-start / col-start 3;
	background-color: ${colors.secondaryColor};
	height: 100%;
	@media ${device.tabletPort} {
		position: fixed;
		overflow: hidden;
		left: 0;
		top: 0;
		z-index: 40;
		width: ${(props) => (props.isVisible ? '50vw' : 0)};
		transition: width 0.5s;
	}
`;

export const HamburgerMenu = styled.div`
	display: none;
	cursor: pointer;
	@media ${device.tabletPort} {
		display: block;
	}
`;

export const CloseButton = styled.span`
	display: none;
	cursor: pointer;
	border-radius: 50%;
	position: absolute;
	top: 1rem;
	right: 1rem;
	@media ${device.tabletPort} {
		display: block;
	}
`;

export const ChatContainer = styled.section`
	grid-column: col-start 3 / full-end;
	@media ${device.tabletPort} {
		grid-column: side-start / full-end;
	}
`;
