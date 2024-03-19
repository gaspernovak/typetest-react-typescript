import React, { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
    font-size: 1.5em;
    text-align: left;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid black;
    color: antiquewhite;
    background-color: #282c34;
`

const Words = styled.div`
    background-color: #373d48;
    border-radius: 4px;
    padding: 0.5em;
    margin-bottom: 10px;
    color: white;
`

const Input = styled.input`
    color: antiquewhite;
    border: 1px solid black;
    border-radius: 4px;
    background-color: #373d48;
    padding: 0.5em;
    outline: none;
`

const Typetest = () => {
    const [wordlist, setWordlist] = useState<String[]>(["marie", "john", "doe", "lorem", "ipsum"])
    const [input, setInput] = useState("")

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value)

        if(e.currentTarget.value === wordlist[0]+' '){
            setWordlist(wordlist.slice(1))
            e.currentTarget.value = ''
        }

    }
    console.log(input)

    return (
    <div>
        <Wrapper>
            <Words>
                { wordlist &&
                    wordlist.map((word) => {
                        return <span> {word} </span>
                    })
                }
            </Words>
            <Input onChange={handleInput} />
        </Wrapper>
    </div>
  )
}

export default Typetest