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

const manageRandomMessagesSending = (send, token) => ChatApi.patch("/users",
    {},
    {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            sendRandomMessages: send
        }
    }
)

const getAllChats = (token, searchTerm) => ChatApi.get("/chats", {
    headers: {
        Authorization: `Bearer ${token}`
    },
    params: {
        search: searchTerm
    }
}).then(response => response.data);

const deleteChat = (chatId, token) => ChatApi.delete(`/chats/${chatId}`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const addChat = (token, firstName, lastName) => ChatApi.post("/chats",
    {
        firstName,
        lastName
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
).then(response => response.data);

const updateChat = (chatId, token, firstName, lastName) => ChatApi.put(`/chats/${chatId}`,
    {
        firstName,
        lastName
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
)
const getChatMessages = (chatId, token) => ChatApi.get(`/chats/${chatId}/messages`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
}).then(response => response.data)

const deleteChatMessage = (chatId, messageId, token) => ChatApi.delete(`/chats/${chatId}/messages/${messageId}`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

const updateChatMessage = (chatId, messageId, messageContent, token) => ChatApi.put(`/chats/${chatId}/messages/${messageId}`,
    {
        content: messageContent,
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

export {
    submitUser,
    getAllChats,
    getChatMessages,
    addChat,
    updateChat,
    deleteChat,
    deleteChatMessage,
    manageRandomMessagesSending,
    updateChatMessage
};