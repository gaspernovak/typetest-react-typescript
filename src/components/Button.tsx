import styled, {css} from 'styled-components'

export const Button = styled.button<{ $primary?: boolean; }>`
    border-radius: 3px;
    border: 2px solid #282c34;
    padding: 0.25em 1em;
    margin-bottom:10px;
    &:hover {
        background: lightgrey;
    }
    ${props =>
        props.$primary &&
        css`
            background: #0d6efd;
        `
    };
`