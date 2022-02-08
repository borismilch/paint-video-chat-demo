import { useEffect, useState } from "react";
import { useUploadData } from ".";

import { useToggle } from '@/hooks/.'

type UseRecorderReturnValue = [string, boolean, () => void, () => void, string, boolean, number, HTMLAudioElement, boolean]

const useRecorder: (isVideo?: boolean) => UseRecorderReturnValue = (isVideo = false) => {
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [timeStamp, setTimeStamp] = useState<number>(0)

  const [stopped, changeStopped] = useToggle(false)
  const [interval, setInt] = useState<any>(null)
  const [audio, setAudio] = useState<HTMLAudioElement>(null)

  const {url, cleanImage, dataUrl, getUploadedData, loading} = useUploadData( isVideo ? "messages/video" : 'messages/audio', isVideo ? ".mp4" : '.webm')

  useEffect(() => {
    if (recorder === null) {
      if (isRecording) {
        requestRecorder(isVideo).then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder?.start();
    } else {
      if (recorder && recorder.stop) {
        recorder?.stop();
      }
    }

    // Obtain the audio when ready.
    const handleData = async e => {
      setAudioURL(URL.createObjectURL(e.data));
      let blob = await fetch(URL.createObjectURL(e.data)).then(r => r.blob());

      const audio = new Audio(audioURL)

      setAudio(audio)

      await getUploadedData(blob as any)
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);

    const intervalFunc = setInterval(() => setTimeStamp(prev => prev + 1) ,1000)

    setInt(intervalFunc)
    
  };

  const stopRecording = async () => {
    setIsRecording(false);

    clearInterval(interval)

    changeStopped(true)
    
  };

  return [audioURL, isRecording, startRecording, stopRecording, url, loading, timeStamp, audio, stopped];
};

async function requestRecorder(isVideo: boolean) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: isVideo });
  return new MediaRecorder(stream);
}
export default useRecorder;
