import React from 'react';
import { auth } from '../../Services/firebase/firebase';
import SignIn from '../components/SignIn';
import { useAuthState } from 'react-firebase-hooks/auth'
import Chat from '../components/Chat';
import '../../_Assets/chat.css'

function TestFirebase() {

  const [user] = useAuthState(auth)
  return (
    <div>
        {/* <SignIn/>  */}
        {user ? <Chat /> : <SignIn />}
    </div>
  );
}

export default TestFirebase;
