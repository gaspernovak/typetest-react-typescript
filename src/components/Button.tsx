import styled, {css} from 'styled-components'

export const Button = styled.button<{ $primary?: boolean; }>`
    background: transparent;
    border-radius: 3px;
    border: 2px solid black;
    padding: 0.25em 1em;
    ${props =>
        props.$primary &&
        css`
            background: #0d6efd;
        `
    };
`