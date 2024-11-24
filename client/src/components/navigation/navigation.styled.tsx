import styled from '@emotion/styled';

import { device } from '@/utils/responsive.ts';

export const NavbarContainer = styled.nav`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	background-color: #202225;
	color: #ffffff;
	padding: 0 20px;
	height: 60px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	grid-column: 1 / -1;

	@media ${device.tabletPort} {
		justify-content: space-between;
	}
`;

export const Brand = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
	cursor: pointer;
`;

export const NavLinks = styled.div`
	display: flex;
	gap: 20px;

	@media (max-width: 768px) {
		justify-self: end;
	}
`;

export const Link = styled.a`
	color: #ffffff;
	text-decoration: none;
	font-size: 1rem;

	&:hover {
		text-decoration: underline;
	}
`;
