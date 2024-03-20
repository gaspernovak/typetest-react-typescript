
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../firebase';

export interface Score {
    username: string;
    date: Date;
    wpm: number;
}

export const fetchWordlist = async (wordDoc: string, wordCount: number) => {
    const ref = doc(db, "wordlist", wordDoc);
    const snapshot = await getDoc(ref);

    if(snapshot.exists()){
        let snapshotSize = snapshot.data().words.length
        const rand = Math.floor(Math.random() * snapshotSize-wordCount);
        return snapshot.data().words.slice(rand, rand+wordCount)
    } else {
        console.log("Failed to fetch wordlist")
    }
}

export const publishScore = async (score: Score) => {
    await setDoc(doc(db, "scores"), {
        score
    })
}