import * as React from 'react';
import {MainHead} from '../head';
import {Main, MainLayoutContainer} from './index.styled';

type ContentLayoutProps = {
    children: React.ReactNode;
    title: string;
    description?: string;
};

export const AuthLayout = ({children, title, description}: ContentLayoutProps) => {
    return (
        <MainLayoutContainer>
            <MainHead title={title} description={description}/>
            <Main>
                {children}
            </Main>
        </MainLayoutContainer>
    );
};
