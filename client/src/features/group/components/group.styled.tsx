import {device} from "@/utils/responsive.ts";
import styled from "@emotion/styled";

export const GroupContainer = styled.aside`
    grid-column: side-start / side-end;
    background-color: #2E2E2E;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    hr {
        width: 100%;
    }

    @media ${device.tabletPort} {
        position: fixed;
        bottom: 0;
        width: 100vw;
        height: 10vh;
        z-index: 100;
        flex-direction: row;

    }

`

export const CircleIcon = styled.div`
    width: 3.5rem;
    height: 3.5rem;
    margin: 1rem 0;
    background-color: black;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`