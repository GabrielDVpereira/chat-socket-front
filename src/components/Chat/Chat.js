import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

let socket;
const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const ENDPOINT = "https://chat-websocket-back.herokuapp.com/";

  console.log("messages", messages);
  console.log("message", message);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [location.search, ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  function sendMessage(event) {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          sendMessage={sendMessage}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
