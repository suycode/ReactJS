import React, { useState } from "react";
import { Input, Button, List, Avatar, Typography } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import "./inbox.css";

const { TextArea } = Input;
const { Text } = Typography;

const Inbox = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: "Bạn", text: "Chào bạn!", type: "sent" },
        { id: 2, sender: "Admin", text: "Xin chào, tôi có thể giúp gì cho bạn?", type: "received" },
    ]);

    const [inputValue, setInputValue] = useState("");

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            const newMessage = {
                id: messages.length + 1,
                sender: "Bạn",
                text: inputValue,
                type: "sent",
            };
            setMessages([...messages, newMessage]);
            setInputValue("");
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <Text strong>Hộp tin nhắn</Text>
            </div>

            <div className="chat-messages">
                <List
                    dataSource={messages}
                    renderItem={(msg) => (
                        <List.Item
                            key={msg.id}
                            className={`chat-message ${msg.type}`}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        icon={<UserOutlined />}
                                        className={msg.type === "sent" ? "avatar-sent" : "avatar-received"}
                                    />
                                }
                                title={msg.sender}
                                description={
                                    <span className={`chat-bubble ${msg.type}`}>
                                        {msg.text}
                                    </span>
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>

            <div className="chat-input">
                <TextArea
                    rows={1}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                />
                <Button type="primary" icon={<SendOutlined />} onClick={handleSendMessage}>
                    Gửi
                </Button>
            </div>
        </div>
    );
};

export default Inbox;
