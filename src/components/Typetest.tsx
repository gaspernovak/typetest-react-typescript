import React, { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useTimer } from 'react-timer-hook';
import { Wrapper, Input, Words, Info, InfoItem } from './Typetest.styled';

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