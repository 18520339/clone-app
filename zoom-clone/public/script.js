const videoGrid = document.getElementById('video-grid');
const videoElement = document.querySelector('video');

const addVideoStream = (video, stream) => {};

const videoStream = null;
navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then(stream => {
        videoStream = stream;
        videoElement.srcObject = stream;
        videoElement.onloadedmetadata(() => videoElement.play());
        videoGrid.append(videoElement);
    });
