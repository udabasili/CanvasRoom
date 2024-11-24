import React from 'react';

import { MainHead } from '../head';

import { Main, MainLayoutContainer } from './index.styled';

type MainLayout = {
	children: React.ReactNode;
	title: string;
	description?: string;
};

export const MainLayout = (props: MainLayout) => {
	const { children, title, description } = props;
	return (
		<MainLayoutContainer>
			<MainHead title={title} description={description} />
			<Main>{children}</Main>
		</MainLayoutContainer>
	);
};
