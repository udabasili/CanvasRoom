import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import {
  NavbarContainer,
  NavLinks,
} from '@/components/navigation/navigation.styled.tsx';
import { AuthContext } from '@/lib/auth-context.tsx';

type NavigationProps = {
  children: React.ReactNode;
};
export const Navigation = ({ children }: NavigationProps) => {
  const auth = useContext(AuthContext);
  return (
    <NavbarContainer>
      {children}
      <NavLinks>
        {auth?.isAuthenticated ? (
          <>
            <li className="list-none">{auth?.user?.username} </li>
            <li className="list-none">
              <button onClick={auth?.logout}>Logout</button>
            </li>
          </>
        ) : (
          <Link to="/auth">Login</Link>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};
