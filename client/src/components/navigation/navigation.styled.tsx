import styled from '@emotion/styled';

export const NavbarContainer = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #202225;
    color: #ffffff;
    padding: 0 20px;
    height: 60px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    grid-column: 1 / -1;
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
        display: none;
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

export const HamburgerMenu = styled.div`
    display: none;
    cursor: pointer;

    @media (max-width: 768px) {
        display: block;
    }
`;

type MobileMenuProps = {
    isOpen: boolean;
}

export const MobileMenu = styled.div<MobileMenuProps>`
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #2f3136;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
    z-index: 1000;

    a {
        display: block;
        padding: 15px 20px;
        border-bottom: 1px solid #444;

        &:last-child {
            border-bottom: none;
        }
    }
`;