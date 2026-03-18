"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPaperPlane, FaWhatsapp, FaInstagram, FaLinkedin, 
  FaMagnifyingGlass, FaEllipsisVertical, FaCheckDouble, 
  FaXmark, FaTriangleExclamation, FaPhone, FaVideo, FaMicrophone 
} from 'react-icons/fa6';
import styles from './inbox.module.scss';

const initialChats = [
  { id: 1, name: 'Alice Smith', platform: 'WhatsApp', lastMsg: 'Hey, thanks for the update!', time: '10:30 AM', icon: <FaWhatsapp color="#25D366" />, online: true, email: 'alice@example.com' },
  { id: 2, name: 'John Doe', platform: 'Instagram', lastMsg: 'Loved that last post 🔥', time: '09:15 AM', icon: <FaInstagram color="#E4405F" />, online: false, email: 'john@insta.com' },
  { id: 3, name: 'Tech Solutions Inc.', platform: 'LinkedIn', lastMsg: 'We would like to collaborate...', time: 'Yesterday', icon: <FaLinkedin color="#0A66C2" />, online: true, email: 'contact@techsol.com' },
];

export default function Inbox() {
  const [activeChat, setActiveChat] = useState(initialChats[0]);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! Hope you are doing well.", sender: 'received', time: '10:00 AM' }
  ]);
  const [input, setInput] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Logic for Auto-Reply
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: input,
      sender: 'sent',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Bot Reply after 1 second
    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        text: `Got it! I will check this on ${activeChat.platform}.`,
        sender: 'received',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botReply]);
    }, 1000);
  };

  return (
    <div className={styles.inboxContainer}>
      {/* ALERT OVERLAY */}
      <AnimatePresence>
        {showAlert && (
          <div className={styles.alertOverlay}>
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className={styles.alertBox}>
              <FaTriangleExclamation size={30} color="#ef4444" />
              <h3>Clear Chat?</h3>
              <p>Permanently delete conversation with {activeChat.name}?</p>
              <div className={styles.alertActions}>
                <button onClick={() => setShowAlert(false)}>Cancel</button>
                <button className={styles.confirm} onClick={() => { setMessages([]); setShowAlert(false); setShowMenu(false); }}>Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Inbox</h2>
          <div className={styles.searchWrapper}>
            <FaMagnifyingGlass /><input type="text" placeholder="Search chats..." />
          </div>
        </div>
        <div className={styles.chatList}>
          {initialChats.map(chat => (
            <div key={chat.id} className={`${styles.chatItem} ${activeChat.id === chat.id ? styles.active : ''}`} onClick={() => setActiveChat(chat)}>
              <div className={styles.avatar}>{chat.name[0]}</div>
              <div className={styles.chatInfo}>
                <div className={styles.row}>
                  <span className={styles.name}>{chat.name}</span>
                  <span className={styles.time}>{chat.time}</span>
                </div>
                <div className={styles.row}>
                  <p className={styles.preview}>{chat.lastMsg}</p>
                  <span className={styles.platformIcon}>{chat.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className={styles.chatMain}>
        <header className={styles.chatHeader}>
          <div className={styles.activeUser}>
            <h3>{activeChat.name}</h3>
            <span>{activeChat.online ? '• Online' : '• Offline'}</span>
          </div>
          <div className={styles.topActions}>
            <button title="Audio Call"><FaPhone /></button>
            <button title="Video Call"><FaVideo /></button>
            <button onClick={() => setShowMenu(!showMenu)}><FaEllipsisVertical /></button>
            {showMenu && (
              <div className={styles.dropdown}>
                <button onClick={() => { setShowProfile(true); setShowMenu(false); }}>View Profile</button>
                <button onClick={() => setShowAlert(true)}>Clear History</button>
              </div>
            )}
          </div>
        </header>

        <div className={styles.messageArea}>
          {messages.map(msg => (
            <div key={msg.id} className={`${styles.msgWrapper} ${styles[msg.sender]}`}>
              <div className={styles.bubble}>
                {msg.text}
                {msg.sender === 'sent' && <FaCheckDouble className={styles.statusIcon} />}
                <div className={styles.arrow}></div>
              </div>
              <span className={styles.msgTime}>{msg.time}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className={styles.inputBar} onSubmit={handleSendMessage}>
          <button type="button" className={styles.iconBtn}><FaMicrophone /></button>
          <input type="text" placeholder="Write a message..." value={input} onChange={(e) => setInput(e.target.value)} />
          <button type="submit" className={styles.sendBtn}><FaPaperPlane /></button>
        </form>
      </main>

      <AnimatePresence>
        {showProfile && (
          <motion.section className={styles.profilePanel} initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: 300 }}>
            <div className={styles.panelHeader}>
              <button onClick={() => setShowProfile(false)}><FaXmark /></button>
              <h4>Contact Details</h4>
            </div>
            <div className={styles.panelBody}>
              <div className={styles.bigAvatar}>{activeChat.name[0]}</div>
              <h3>{activeChat.name}</h3>
              <div className={styles.meta}><label>Source</label><span>{activeChat.platform} {activeChat.icon}</span></div>
              <div className={styles.meta}><label>Email</label><span>{activeChat.email}</span></div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}