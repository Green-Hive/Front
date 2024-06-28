import Pusher from 'pusher-js';

const pusher = new Pusher('', {
  cluster: 'eu'
});
const channel = pusher.subscribe('my-channel');

export default channel;
