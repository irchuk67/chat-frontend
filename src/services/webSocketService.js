let socket = null;

export const connectWebSocket = (
    url,
    onMessageCallback,
    onSocketCloseCallback,
) => {
    if (socket) {
        return;
    }

    socket = new WebSocket(url);

    socket.onopen = () => {
        console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
        onMessageCallback(event.data);
    };

    socket.onclose = () => {
        onSocketCloseCallback();
    };

    socket.onerror = (error) => {
        throw error;
    };
};

export const disconnectWebSocket = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
        socket = null;
    }
};

export const sendWebSocketMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
    } else {
        console.error('WebSocket is not connected or is not open');
    }
};

export const isWebSocketOpen = () => {
    return socket && socket.readyState === WebSocket.OPEN;
};