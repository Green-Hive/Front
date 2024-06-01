const ws = new WebSocket('ws://localhost:4001');

console.log(import.meta.env.VITE_WS_URL);

// LINKER AVEC CE FILS DE PUTE D'ENVIRONNEMENT COMPRENDS PAS PK CA UNDEFINED

ws.onopen = () => {
  console.log('Connected to the WebSocket server');
};

ws.onclose = () => {
  console.log('Disconnected from the WebSocket server');
};

export default ws;