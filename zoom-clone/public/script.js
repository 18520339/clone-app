const socket = io('/');
const peer = new Peer(undefined, { path: '/peerjs', host: '/', port: 7000 });

const videoGrid = document.getElementById('video-grid');
const videoElement = document.querySelector('video');
let videoStream = null;

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => video.play());
    videoGrid.append(video);
};

const newVideoCall = call => {
    const video = document.createElement('video');
    call.on('stream', stream => addVideoStream(video, stream));
};

navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .finally(stream => {
        videoStream = stream;
        addVideoStream(videoElement, stream);

        socket.on('NEW_USER', userId => {
            const call = peer.call(userId, stream);
            newVideoCall(call);
        });

        peer.on('call', call => {
            call.answer(stream);
            newVideoCall(call);
        });
    });

peer.on('open', id => socket.emit('JOIN_ROOM', ROOM_ID, id));
