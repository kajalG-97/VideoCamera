import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Controls from './components/video/Controls';

const VideoContainer = styled.video`
  width: 100vw;
  height: 90vh;
`;

const App = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string>();
  const [globalStream, setGlobalStream] = useState<MediaStream>();
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();

  const videoCaptureHandleClick = async () => {
    try {
      const constraints = {
        video: true,
        audio: true
      };
      const videoElement = document.querySelector('video');

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) videoRef.current.srcObject = stream;
      setGlobalStream(stream);

      // const videoTracks = stream.getVideoTracks();
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleRecordClick = () => {
    if (!globalStream) return;

    if (!isRecording) {
      const chunks: any[] = [];

      const recorder = new MediaRecorder(globalStream);

      recorder.ondataavailable = (event) => {
        console.log('chunks', chunks);
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      console.log('here');
      recorder.onstop = (event) => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        const videoUrl: string = URL.createObjectURL(blob);
        console.log('videoURL---->', videoUrl);
        setVideoSrc(videoUrl);
      };

      recorder.start();
      setIsRecording(true);
      setMediaRecorder(recorder);
    } else {
      console.log('RECORDING STOP');
      if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        console.log('videoSrc', videoSrc);
        // window.open(videoSrc);
        setIsRecording(false);
      }
    }

    // if (isRecording) {
    //   recorder.onstart = (e) => {
    //     console.log(e);
    //   };
    // } else {
    //   // setIsRecording(!isRecording);
    //   recorder.onstop = (event) => {
    //     const blob = new Blob(chunks, { type: 'video/mp4' });
    //     const videoUrl: string = URL.createObjectURL(blob);
    //     window.open(videoUrl);
    //   };
    // }

    // const chunks = [];

    // mediaRecorder.onstop = (e) => {
    //   console.log('data available after MediaRecorder.stop() called.');

    //   const audio = document.createElement('audio');
    //   audio.controls = true;
    //   const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
    //   const audioURL = window.URL.createObjectURL(blob);
    //   audio.src = audioURL;
    //   console.log('recorder stopped');
    // };

    // mediaRecorder.ondataavailable = (e) => {
    //   chunks.push(e.data);
    // };

    // ----------
    // const recorder = new MediaRecorder(stream);
    // const chunks: any[] = [];

    // recorder.ondataavailable = (event) => {
    //     if (event.data.size > 0) {
    //         chunks.push(event.data);
    //     }
    // };

    // recorder.onstop = () => {
    //     const blob = new Blob(chunks, { type: 'audio/wav' });
    //     const url: string = URL.createObjectURL(blob);
    //     setAudioURL(url);
    //     setAudioChunks([]);
    //     setMediaRecorder(null);
    //     setAudioBlob(blob);
    // };

    // recorder.start();
    // setIsRecording(true);
    // setMediaRecorder(recorder);
  };

  const handleCaptureClick = () => {};

  useEffect(() => {
    videoCaptureHandleClick();
  }, []);

  return (
    <Box>
      <a download='stream.mp4' href={videoSrc}>
        DOWNLAOD
      </a>
      <VideoContainer ref={videoRef} autoPlay controls />
      <Controls
        handleRecordClick={handleRecordClick}
        handleCaptureClick={handleCaptureClick}
        isRecording={isRecording}
      />
    </Box>
  );
};

export default App;
