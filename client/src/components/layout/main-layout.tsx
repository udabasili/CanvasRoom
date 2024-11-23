import React from 'react';
import {MainHead} from '../head';
import {Main, MainLayoutContainer} from './index.styled';
import {Footer} from "@/components/footer";
import {Navigation} from "@/components/navigation";

type MainLayout = {
    children: React.ReactNode;
    title: string;
    description?: string;
};

export const MainLayout = (props: MainLayout) => {
    const {children, title, description} = props;
    return (
        <MainLayoutContainer>
            <MainHead title={title} description={description}/>
            <Navigation/>
            <Main>
                {children}
            </Main>
            <Footer/>
        </MainLayoutContainer>
    );
};
