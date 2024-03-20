import styled, {css} from 'styled-components'

export const Wrapper = styled.section`
    font-size: 1.2em;
    text-align: left;
    padding: 10px 10px;
    border-radius: 4px;
    border: 1px solid black;
    color: antiquewhite;
    background-color: #282c34;
`

export const Words = styled.div`
    background-color: #373d48;
    border-radius: 4px;
    padding: 0.5em;
    margin-bottom: 10px;
    color: white;
    text-align: justify;
`

export const Input = styled.input`
    color: antiquewhite;
    border: 1px solid black;
    border-radius: 4px;
    background-color: #373d48;
    padding: 0.5em;
    margin-right: 0.5em;
    outline: none;
`

export const Info = styled.div`
    display: flex;
    justify-content: space-between;
`

export const InfoItem = styled.span`
    margin-bottom: 10px;
`

export const Button = styled.button<{ $red?: boolean }>`
    color: antiquewhite;
    border: 0px;
    border-radius: 4px;
    background-color: #282c34;
    padding: 0.5em;
    margin: 0.5em;
    margin-right: 0.5em;
    outline: none;
    &:hover {
        background-color: #373d48;
    }

    ${props => 
        props.$red &&
        css`
            color: lightcoral;
        `};
`