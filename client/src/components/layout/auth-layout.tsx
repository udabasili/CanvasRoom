import clsx from 'clsx';
import * as React from 'react';

import { MainHead } from '../head';

import { MainLayoutContainer } from './index.styled';

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
};

export const AuthLayout = ({
  children,
  title,
  description,
}: ContentLayoutProps) => {
  return (
    <MainLayoutContainer>
      <MainHead title={title} description={description} />
      <div
        className={clsx([
          'col-[1_/_-1] flex min-h-screen flex-col items-center justify-center px-4 py-6',
          'bg-primaryColor',
        ])}
      >
        <div className="grid w-full max-w-6xl items-center gap-4  md:grid-cols-2">
          <div className="max-w-md rounded-lg border border-white bg-white p-6 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            {children}
          </div>
        </div>
      </div>
    </MainLayoutContainer>
  );
};
