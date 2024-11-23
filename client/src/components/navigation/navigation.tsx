import {Link} from "react-router-dom";
import {
    Brand,
    HamburgerMenu,
    MobileMenu,
    NavbarContainer,
    NavLinks
} from "@/components/navigation/navigation.styled.tsx";
import {useDisclosure} from "@/lib/use-disclosure.ts";

export const Navigation = () => {

    const {toggle, isOpen, close} = useDisclosure()

    return (
        <NavbarContainer>
            <Brand>MyApp</Brand>

            <NavLinks>
                <Link to="#home">Home</Link>
                <Link to="#features">Features</Link>
                <Link to="#pricing">Pricing</Link>
                <Link to="#about">About</Link>
            </NavLinks>

            <HamburgerMenu onClick={toggle}>
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

            <MobileMenu isOpen={isOpen}>
                <Link to="#home" onClick={() => close()}>Home</Link>
                <Link to="#features" onClick={() => close()}>Features</Link>
                <Link to="#pricing" onClick={() => close()}>Pricing</Link>
                <Link to="#about" onClick={() => close()}>About</Link>
            </MobileMenu>
        </NavbarContainer>
    );
};

