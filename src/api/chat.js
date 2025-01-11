import axios from "axios";

const baseURL = 'http://localhost:8000/api';

const ChatApi = axios.create({
    baseURL
});

const submitUser = (sessionId, token) => ChatApi.post("/users",
    {
        sessionId
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);

const getAllChats = (token) => ChatApi.get("/chats", {
    headers: {
        Authorization: `Bearer ${token}`
    }
}).then(response => response.data);

const getChatMessages = (chatId, token) => ChatApi.get(`/chats/${chatId}/messages`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
}).then(response => response.data);

export {submitUser, getAllChats, getChatMessages};