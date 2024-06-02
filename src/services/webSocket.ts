const WS_URL= import.meta.env.VITE_APP_WS;

console.log("WS_URL:", WS_URL);

const ws = new WebSocket(WS_URL);

ws.onopen = () => {
  console.log('Connected to the WebSocket server');
};

ws.onclose = () => {
  console.log('Disconnected from the WebSocket server');
};

export default ws;