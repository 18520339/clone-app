const socket = io();
const currentPeer = new Peer(undefined, {
	path: '/peerjs',
	host: '/',
	port: 443, // 7000 for development
});
const peers = {};

const videoGrid = document.getElementById('video-grid');
const videoElement = document.querySelector('video');
let videoStream = null;

function muteSwitch() {
	const muteButton = document.querySelector('.main__mute-button');
	if (videoStream.getAudioTracks()[0].enabled) {
		videoStream.getAudioTracks()[0].enabled = false;
		muteButton.innerHTML = `
            <i class="fas fa-microphone"></i>
            <span>Mute</span>
        `;
	} else {
		muteButton.innerHTML = `
            <i class="unmute fas fa-microphone-slash"></i>
            <span>Unmute</span>
        `;
		videoStream.getAudioTracks()[0].enabled = true;
	}
}

function playStop() {
	const playButton = document.querySelector('.main__video-button');
	if (videoStream.getVideoTracks()[0].enabled) {
		videoStream.getVideoTracks()[0].enabled = false;
		playButton.innerHTML = `
            <i class="stop fas fa-video-slash"></i>
            <span>Play Video</span>
        `;
	} else {
		playButton.innerHTML = `
            <i class="fas fa-video"></i>
            <span>Stop Video</span>
        `;
		videoStream.getVideoTracks()[0].enabled = true;
	}
}

function scrollToBottom() {
	const chatWindow = document.querySelector('.main__chat-window');
	chatWindow.scrollTop = chatWindow.scrollHeight;
}

document.querySelector('html').addEventListener('keydown', event => {
	const message = document.querySelector('input');
	if (event.key === 'Enter' && message.value.length !== 0) {
		socket.emit('MESSAGE_TO_SERVER', message.value);
		message.value = '';
	}
});

socket.on('MESSAGE_TO_CLIENT', message => {
	document.getElementById('messages-list').innerHTML += `
        <li class="message">
            <b>user:</b> ${message}
        </li>
    `;
	scrollToBottom();
});

function addVideoStream(video, stream) {
	video.srcObject = stream;
	video.addEventListener('loadedmetadata', () => video.play());
	videoGrid.append(video);
}

function connectToNewUser(userId, stream) {
	const call = currentPeer.call(userId, stream);
	const video = document.createElement('video');
	call.on('stream', stream => addVideoStream(video, stream));
	call.on('close', () => video.remove());
	peers[userId] = call;
}

navigator.mediaDevices
	.getUserMedia({ video: true, audio: true })
	.then(stream => {
		videoStream = stream;
		addVideoStream(videoElement, stream);

		socket.on('NEW_USER', userId => connectToNewUser(userId, stream));
		currentPeer.on('call', call => {
			call.answer(stream);
			const video = document.createElement('video');
			call.on('stream', stream => addVideoStream(video, stream));
		});
	})
	.catch(console.error);

currentPeer.on('open', id => socket.emit('JOIN_ROOM', ROOM_ID, id));
socket.on('USER_LEAVE', userId => peers[userId]?.close());
