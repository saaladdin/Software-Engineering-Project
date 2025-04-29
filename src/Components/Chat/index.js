import {
  collection,
  serverTimestamp,
  addDoc,
  onSnapshot,
  where,
  query,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import db, { auth } from "../../FirebaseConfig";
import "./index.scss";

const Chat = () => {
  const [message, setMessage] = useState("");
  const messageRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("One Piece Club");
  const [userPics, setUserPics] = useState({});

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const rooms = ["One Piece Club", "Astronomy Club", "Robotics Club"];

  // 1️⃣ Listen for messages + fetch any missing profile pics
  useEffect(() => {
    const q = query(
      messageRef,
      where("room", "==", selectedRoom),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const msgs = [];
      const picsToFetch = [];

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        msgs.push({ ...data, id: docSnap.id });
        if (data.uid && !(data.uid in userPics)) {
          picsToFetch.push(data.uid);
        }
      });

      // Fetch all missing pics in parallel
      await Promise.all(
        picsToFetch.map(async (uid) => {
          try {
            const userDoc = await getDoc(doc(db, "users", uid));
            if (userDoc.exists()) {
              setUserPics((prev) => ({
                ...prev,
                [uid]: userDoc.data().profilePic || null,
              }));
            }
          } catch (e) {
            console.error("Error fetching profilePic for", uid, e);
          }
        })
      );

      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [selectedRoom]); // userPics not in deps because we use functional update

  // 2️⃣ Auto-scroll on new messages
  useEffect(() => {
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await addDoc(messageRef, {
      text: message,
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser.email,
      uid: auth.currentUser.uid,
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
            {room === "One Piece Club"
              ? "🏴‍☠️"
              : room === "Astronomy Club"
              ? "🔭"
              : "🤖"}{" "}
            {room}
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
          {messages.map((msg) => {
            const isMe = msg.createdBy === auth.currentUser.email;
            const avatarSrc =
              !isMe && msg.uid
                ? userPics[msg.uid] || "/default-avatar.png"
                : null;

            return (
              <div
                key={msg.id}
                className={`message ${isMe ? "myMessage" : "otherMessage"}`}
              >
                {!isMe && (
                  <img src={avatarSrc} alt="avatar" className="avatar" />
                )}
                <div>
                  <h1>{isMe ? "Me" : msg.createdBy}</h1>
                  <p>{msg.text}</p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="newMessageForm">
          <input
            type="text"
            placeholder={`Message ${selectedRoom}...`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">➤</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;