"use client";
import { useState } from "react";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);

  async function send() {
    const newMsg = { role: "user", content: input };
    setMessages([...messages, newMsg]);
    setInput("");
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setMessages(prev => [...prev, { role: "ai", content: data.text }]);
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h2>我的 Gemini 对话框</h2>
      <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        {messages.map((m, i) => <p key={i}><b>{m.role}:</b> {m.content}</p>)}
      </div>
      <input style={{ width: '80%', padding: '10px' }} value={input} onChange={e => setInput(e.target.value)} />
      <button style={{ padding: '10px' }} onClick={send}>发送</button>
    </div>
  );
}