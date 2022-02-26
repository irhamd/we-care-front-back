import moment from 'moment'
import React, { useState, useEffect, useRef, createRef } from 'react'
// import { db, auth } from '../firebase'
import SendMessage from './SendMessage'
import SignOut from './SignOut'
import 'moment/locale/id';
import { auth, db } from '../../Services/firebase/firebase';

function Chat() {
    const scroll = useRef()
    const [messages, setMessages] = useState([])
    const [typing, settyping] = useState(false)

    useEffect(async () => {
        scroll.current.scrollIntoView({ behavior: 'smooth' })

        db.collection('messages').orderBy('createdAt').onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
            // try {
            // scroll.current.scrollIntoView({ behavior: 'smooth' })
            // } catch (error) { }
        })

        await db
            .collection("typing").doc("BJ")
            .onSnapshot(snapshot => {
                settyping(snapshot.data().typing)
            })
    }, [])
    return (
        <div>
            <SignOut />
            <div className="msgs">
                {messages.map(({ id, text, photoURL, uid, createdAt }, idx) => {
                    const dateInMillis = createdAt && createdAt.seconds * 1000
                    var tgl = moment(new Date(dateInMillis)).locale(moment.locale()).fromNow();
                    return (
                        <div>
                            <div key={idx} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                                <img src={photoURL} alt="" />
                                <p style={{ paddingBottom: "10px" }}>{text}
                                    <br />
                                    <small style={{ fontSize: "8px", fontStyle: "italic", color: `${uid === auth.currentUser.uid ? '#B0C4DE' : '#778899'}`, float: "right" }}>{tgl}</small>

                                </p>

                            </div>
                            {/* <p>{createdAt}</p> */}
                        </div>
                    )
                }
                )}
                {
                    typing && <p className="typing"> sedang mengetik ... </p>
                }

                {typing}
            </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
        </div>
    )
}

export default Chat
