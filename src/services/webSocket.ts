import Pusher from 'pusher-js';

const pusher = new Pusher('89316c4952f82b5e2874', {
  cluster: 'eu'
});
const channel = pusher.subscribe('my-channel');

export default channel;