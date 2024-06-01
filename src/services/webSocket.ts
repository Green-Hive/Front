
console.log(import.meta.env.WS_URL);
// const WS_URL = 'ws://localhost:443'
const WS_URL = 'wss://greenhiveapi.up.railway.app'
// LINKER AVEC CE FILS DE PUTE D'ENVIRONNEMENT COMPRENDS PAS PK CA UNDEFINED
const ws = new WebSocket(WS_URL);

ws.onopen = () => {
  console.log('Connected to the WebSocket server');
};

ws.onclose = () => {
  console.log('Disconnected from the WebSocket server');
};

export default ws;