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
  const [selectedRoom, setSelectedRoom] = useState("One Piece Club");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const rooms = ["One Piece Club", "Astronomy Club", "Robotics Club"];

  useEffect(() => {
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", selectedRoom),
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
  }, [selectedRoom]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message === "") return;

    await addDoc(messageRef, {
      text: message,
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser.email,
      room: selectedRoom,
    });

    setMessage("");
  };

  return (
    <div className="chatContainer">
      {/* Sidebar */}
      <div className="clubSidebar">
        {rooms.map((room) => (
          <div
            key={room}
            className={`clubItem ${selectedRoom === room ? "active" : ""}`}
            onClick={() => setSelectedRoom(room)}
          >
            {room === "One Piece Club" ? "🏴‍☠️" : room === "Astronomy Club" ? "🔭" : "🤖"} {room}
          </div>
        ))}
      </div>

      {/* Chat Section */}
      <div className="chatSection">
        <div className="chatHeader">
          {selectedRoom}
          <button>Notifications</button>
        </div>

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
              <h1>{msg.createdBy === auth.currentUser.email ? "Me" : msg.createdBy}</h1>
              <p>{msg.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="newMessageForm">
          <input
            type="text"
            placeholder={`Message ${selectedRoom}...`}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button type="submit">➤</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
