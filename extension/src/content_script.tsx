import { EventType } from "./constant/event.constant";

const video: HTMLVideoElement | null = document.querySelector('bwp-video') || document.querySelector('video');

interface VideoData {
  event: string;
  currentTime: number;
}

if (video) {
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === EventType.VideoHandle) {
      const data: VideoData = message.data;

      if (data.event === 'play') {
        video.play();
        video.currentTime = data.currentTime;
      }
      if (data.event === 'pause') {
        video.pause();
        video.currentTime = data.currentTime;
      }
      if (data.event === 'seeked') {
        video.currentTime = data.currentTime;
      }
    }
  });

  const sendMsg = (event: string, video: any) => {
    chrome.runtime.sendMessage({
      type: EventType.Video,
      data: {
        event,
        currentTime: video.currentTime
      }
    })
  }

  [
    'play',
    'pause',
    'seeked '
  ].forEach((event) => {
    video.addEventListener(event, () => {
      sendMsg(event, video);
    })
  })
}
  