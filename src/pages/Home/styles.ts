import styled from "styled-components";

export const HomeContainer = styled.main`
    /* height: 100%; */
    flex: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;

        /* background-color: ${props => props.theme["gray-900"]}; */
    }

    /* background-color: ${props => props.theme["red-700"]}; */
`;

export const BaseCountdownButton = styled.button`
    width: 100%;
    border: 0;
    padding: 1rem;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme["gray-100"]};

    gap: 0.5rem;
    font-weight: bold;

    cursor: pointer;

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
    background-color: ${props => props.theme["green-500"]};

    &:not(:disabled):hover {
        background-color: ${props => props.theme["green-700"]};
        transition: 0.2s;
    }
`;

export const StopCountdownButton = styled(BaseCountdownButton)`
    background-color: ${props => props.theme["red-500"]};

    &:not(:disabled):hover {
        background-color: ${props => props.theme["red-700"]};
        transition: 0.2s;
    }
`;