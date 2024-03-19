import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useTimer } from 'react-timer-hook';

const Wrapper = styled.section`
    font-size: 1.2em;
    text-align: left;
    padding: 10px 10px;
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
    text-align: justify;
`

const Input = styled.input`
    color: antiquewhite;
    border: 1px solid black;
    border-radius: 4px;
    background-color: #373d48;
    padding: 0.5em;
    outline: none;
`

const Info = styled.div`
    display: flex;
    justify-content: space-between;
`

const InfoItem = styled.span`
    margin-bottom: 10px;
`

const calculateWpm = (allEntries: number, timeSeconds: number) => {
    return Math.floor((allEntries/5) / (timeSeconds/60))
}

const Typetest = () => {
    const [wordlist, setWordlist] = useState<String[]>([])
    const [wpm, setWpm] = useState(0);
    const [entriesCounter, setEntriesCounter] = useState(0);
    const [timeOver, setTimeOver] = useState(false);
    
    const timeLimitSeconds = 15;
    const time = new Date();
    time.setSeconds(time.getSeconds()+timeLimitSeconds)

    const timer = useTimer({expiryTimestamp: time,
        onExpire: () => {
            setTimeOver(true);
        },
        autoStart: false
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        timer.start()
        if(e.currentTarget.value === wordlist[0]+' '){
            setWordlist(wordlist.slice(1))
            e.currentTarget.value = ''
            setEntriesCounter(entriesCounter+wordlist[0].length+1)
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

    useEffect(() => {
        console.log(entriesCounter, timeLimitSeconds-timer.seconds)
        if(timer.isRunning){
            setWpm(calculateWpm(entriesCounter, (timeLimitSeconds-timer.seconds)))
        }
    }, [timer.seconds])

    return (
    <div>
        <Wrapper>
            <Info>
                <InfoItem>WPM: {wpm}</InfoItem>
                <InfoItem>{timer.minutes}:{timer.seconds}</InfoItem>
            </Info>
            <Words>
                { wordlist &&
                    wordlist.map((word, key) => {
                        return <span key={key}> {word} </span>
                    })
                }
            </Words>
            <Input onChange={handleInput} disabled={timeOver}/>
        </Wrapper>
    </div>
  )
}

export default Typetest