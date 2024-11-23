import {Link} from "react-router-dom";
import {
    Brand,
    HamburgerMenu,
    MobileMenu,
    NavbarContainer,
    NavLinks
} from "@/components/navigation/navigation.styled.tsx";
import React from "react";

export const Navigation = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <NavbarContainer>
            <Brand>MyApp</Brand>

            <NavLinks>
                <Link to="#home">Home</Link>
                <Link to="#features">Features</Link>
                <Link to="#pricing">Pricing</Link>
                <Link to="#about">About</Link>
            </NavLinks>

            <HamburgerMenu onClick={toggleMenu}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    width="32px"
                    height="32px"
                >
                    <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/>
                </svg>
            </HamburgerMenu>

            <MobileMenu isOpen={menuOpen}>
                <Link to="#home" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="#features" onClick={() => setMenuOpen(false)}>Features</Link>
                <Link to="#pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
                <Link to="#about" onClick={() => setMenuOpen(false)}>About</Link>
            </MobileMenu>
        </NavbarContainer>
    );
};

