const ws = new WebSocket('ws://localhost:4001');

ws.onopen = () => {
  console.log('Connected to the WebSocket server');
};

ws.onclose = () => {
  console.log('Disconnected from the WebSocket server');
};

export default ws;