import './App.css'
import Leaderboard from './components/Leaderboard'
import Typetest from './components/Typetest'
import { Button } from './components/Button';
import { auth, provider } from './firebase';
import { useState } from 'react';
import { onAuthStateChanged, signInWithPopup, User, UserCredential, signOut} from 'firebase/auth';

function App() {
  const [user, setUser] = useState<User>();

  const login = () => {
    signInWithPopup(auth, provider).then((result: UserCredential) => {
      setUser(result.user)
    })
  }  

  const signout = () => {
    signOut(auth).then(() => {
      setUser(undefined)
    }).catch((err) => {
      console.log("Failed to sign out: "+err)
    })
  }

  onAuthStateChanged(auth, user => {
    if(user){
      setUser(user)
    }
  })

  return (
    <>
      {user ?
        <>
          <h3>Welcome {user.displayName}</h3>
          <Button onClick={() => signout()}>sign out</Button>
        </>
      : <Button onClick={() => login()}>login</Button>}
      
      <Typetest/>
      <Leaderboard/>
    </>
  )
}

export default App
