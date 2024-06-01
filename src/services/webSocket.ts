
console.log(import.meta.env.WS_URL);
// const WS_URL = 'ws://localhost:4001'
const WS_URL = 'ws://greenhiveapi.up.railway.app:4001'
// LINKER AVEC CE FILS DE PUTE D'ENVIRONNEMENT COMPRENDS PAS PK CA UNDEFINED
const ws = new WebSocket(WS_URL);

ws.onopen = () => {
  console.log('Connected to the WebSocket server');
};

ws.onclose = () => {
  console.log('Disconnected from the WebSocket server');
};

export default ws;