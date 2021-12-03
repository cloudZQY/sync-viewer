import { EventType } from "./constant/event.constant";

function injectScript(file: string) {
  var th = document.querySelector('html');
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  if (th) {
    th.prepend(s);
  }
}

const btnStyle = {
  'cursor': 'pointer',
    'position': 'relative',
    'color': '#fff',
    'font-size': '14px',
    'display': 'block',
    'width': '100px',
    'height': '36px',
    'line-height': '36px',
    'text-align': 'center',
    'background': '#FB7299',
    'border-radius': '2px',
    'margin-left': '14px',
}

injectScript(chrome.extension.getURL('/js/vendor.js'));
injectScript(chrome.extension.getURL('/js/inject.js'));
injectScript(chrome.extension.getURL('/toastify.js'));


interface VideoData {
  event: string;
  currentTime: number;
  bv: string;
}




window.addEventListener('load', () => {
  const { pathname } = window.location;

  const [_1, _2, bv] = pathname.match(/(\/video\/)(.*?)\/?$/) || [];
  const playerDom = document.querySelector('.bilibili-player-video');


  function start() {
    const video = playerDom?.querySelector('bwp-video') as HTMLVideoElement;
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === EventType.VideoHandle) {
        const data: VideoData = message.data;

        window.postMessage({
          type: EventType.VideoHandle,
          data
        });
        if (data.event === 'init') {
          if (bv === data.bv) {
            sendMsg('enter', {});
            window.postMessage({
              type: EventType.VideoHandle,
              data: {
                bv,
                event: 'alert',
                text: "进入同一视频🙆",
              }
            });
          }
        } else if (data.event === 'enter') {
          setTimeout(() => {
            window.postMessage({
              type: EventType.VideoHandle,
              data: {
                event: 'alert',
                bv,
                text: "进入同一视频🙆"
              }
            });
          }, 2000)
        }
      }
    });

    setTimeout(() => {
      const uploader: any = document.querySelector('.mini-upload') || document.querySelector('[data-idx=upload]');
      const btn = document.createElement('div');
      btn.innerText = '邀请';
      Object.assign(btn.style, btnStyle);
      if (uploader) {
        Object.assign(uploader.style, {
          display: 'none'
        })
        uploader?.parentElement?.insertBefore(btn, uploader);
        btn.addEventListener('click', () => {
          chrome.runtime.sendMessage({
            type: EventType.Invite,
            data: {
              url: location.href,
              message: (document.querySelector('.tit') as any)?.innerText
            }
          })
        })
      }
    }, 2000);

    function sendMsg(event: string, video: any = {}) {
      try {
        chrome.runtime.sendMessage({
          type: EventType.Video,
          data: {
            event,
            bv,
            currentTime: `${video.currentTime || 0}`
          }
        })
      } catch(err) {
        console.log(err);
      }
    }

    sendMsg('init');

    window.addEventListener('message', (res) => {
      if (res.data && res.data.type === 'video') {
        const event: string = res.data.event;
        const content: any = res.data.data;

        sendMsg(event, content);
      }
    });

    // [
    //   'play',
    //   'pause',
    //   'seeked',
    //   'playing'
    // ].forEach((event) => {
      
    //   video.addEventListener(event, () => {
    //     const currentTime = video.getAttribute('data-currenttime');
    //     console.log(event, currentTime);
    //     console.log(100)
    //     video.currentTime = 100;
    //     console.log('name', (video as any).name)
    //     sendMsg(event, {
    //       currentTime: currentTime
    //     });
    //   })
    // })
  }
  const observer = new MutationObserver(() => {
    if (playerDom && playerDom.querySelector('bwp-video') || playerDom?.querySelector('video')) {
      start();
      observer.disconnect();
    }
  });

  if (playerDom) {
    if (playerDom.querySelector('bwp-video') || playerDom?.querySelector('video')) {
      start();
    } else {
      observer.observe(playerDom, {
        childList: true, subtree: true
      });
    }
  }
})


