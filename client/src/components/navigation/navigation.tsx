import React from 'react';
import { Link } from 'react-router-dom';

import {
	NavbarContainer,
	NavLinks,
} from '@/components/navigation/navigation.styled.tsx';

type NavigationProps = {
	children: React.ReactNode;
};
export const Navigation = ({ children }: NavigationProps) => {
	return (
		<NavbarContainer>
			{children}
			<NavLinks>
				<Link to="#home">Home</Link>
				<Link to="#features">Features</Link>
				<Link to="#pricing">Pricing</Link>
			</NavLinks>
		</NavbarContainer>
	);
};
