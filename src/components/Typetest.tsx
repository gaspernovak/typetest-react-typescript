import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';

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
    const [wordlist, setWordlist] = useState<String[]>([])

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.value === wordlist[0]+' '){
            setWordlist(wordlist.slice(1))
            e.currentTarget.value = ''
        }
    }

    const fetchWordlist = async () => {
        const ref = doc(db, "wordlist", "test");
        const snapshot = await getDoc(ref);
        const rand = Math.floor(Math.random() * 3950);

        if(snapshot.exists()){
            setWordlist(snapshot.data().words.slice(rand, rand+50))
        } else {
            console.log("Failed to fetch wordlist")
        }
    }

    useEffect(() => {
        fetchWordlist()
    },[])

    return (
    <div>
        <Wrapper>
            <Words>
                { wordlist &&
                    wordlist.map((word, key) => {
                        return <span key={key}> {word} </span>
                    })
                }
            </Words>
            <Input onChange={handleInput} />
        </Wrapper>
    </div>
  )
}

export default Typetest