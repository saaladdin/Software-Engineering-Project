import {
  collection,
  serverTimestamp,
  addDoc,
  onSnapshot,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import db, { auth } from "../../FirebaseConfig";
import "./index.scss";
const Chat = () => {
  const [message, setMessage] = useState("");
  const messageRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);
  const room = "room1";
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // Scroll the messages container to the bottom
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message === "") return;

    await addDoc(messageRef, {
      text: message,
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser.email,
      room: room,
    });

    setMessage("");
  };

  return (
    <div className="chatContainer">
      <div ref={messagesContainerRef} className="messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.createdBy === auth.currentUser.email
                ? "myMessage"
                : "otherMessage"
            }`}
          >
            <h1>{msg.createdBy}</h1>
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="newMessageForm">
        <input
          type="text"
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
