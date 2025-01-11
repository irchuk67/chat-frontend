import axios from "axios";

const baseURL = 'http://localhost:8000';

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


export {submitUser}