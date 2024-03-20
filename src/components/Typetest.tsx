import React, { useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook';
import { Wrapper, Input, Words, Info, InfoItem, Button } from './Typetest.styled';
import { fetchWordlist, publishScore } from '../services/firestore.service';
import { FaRepeat } from 'react-icons/fa6';
import { Score } from '../services/firestore.service';

const calculateWpm = (allEntries: number, timeSeconds: number) => {
    return Math.floor((allEntries/5) / (timeSeconds/60))
}

const Typetest = () => {
    const [wordlist, setWordlist] = useState<String[]>([])
    const [wpm, setWpm] = useState(0);
    const [entriesCounter, setEntriesCounter] = useState(0);
    const [timeOver, setTimeOver] = useState(false);
    const [input, setInput] = useState('');
    const [score, setScore] = useState<Score>();
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
        setInput(e.currentTarget.value)
        if(!timer.isRunning){
            timer.start()
        }

        if(e.currentTarget.value === wordlist[0]+' '){
            setWordlist(wordlist.slice(1))
            setInput('')
            setEntriesCounter(entriesCounter+wordlist[0].length+1)
        }
    }

    const handleRestart = async () => {
        setTimeOver(false);
        setWpm(0);
        setEntriesCounter(0);
        await getWordlist();

        const time = new Date();
        time.setSeconds(time.getSeconds()+timeLimitSeconds)
        timer.restart(time, false);
        timer.pause();
    }

    const getWordlist = async () => {
        setWordlist(await fetchWordlist("test", 30));
    }

    useEffect(() => {
        getWordlist();
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
                <InfoItem>
                    WPM: {wpm}
                    {timeOver && <Button $red>publish</Button>}
                </InfoItem>
                <InfoItem>{timer.minutes}:{timer.seconds}</InfoItem>
            </Info>
            <Words>
                { wordlist &&
                    wordlist.map((word, key) => {
                        return <span key={key}> {word} </span>
                    })
                }
            </Words>
            <Input value={input} onChange={handleInput} disabled={timeOver} placeholder='Type to start timer'/>
            <Button onClick={handleRestart}><FaRepeat/></Button>
        </Wrapper>
    </div>
  )
}

export default Typetest