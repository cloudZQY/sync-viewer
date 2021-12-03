import { EventType } from "./constant/event.constant";


const nativeAttachShadow = HTMLElement.prototype.attachShadow
HTMLElement.prototype.attachShadow = function () {
  return nativeAttachShadow.call(this, { mode: 'open' })
}
let loading = false;

window.addEventListener('load', () => {
  const link = document.createElement('style');
  link.innerHTML = `
 .toastify {
     padding: 12px 20px;
     color: #ffffff;
     display: inline-block;
     box-shadow: 0 3px 6px -1px rgba(0, 0, 0, 0.12), 0 10px 36px -4px rgba(77, 96, 232, 0.3);
     background: -webkit-linear-gradient(315deg, #73a5ff, #5477f5);
     background: linear-gradient(135deg, #73a5ff, #5477f5);
     position: fixed;
     opacity: 0;
     transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
     border-radius: 2px;
     cursor: pointer;
     text-decoration: none;
     max-width: calc(50% - 20px);
     z-index: 2147483647;
 }
 
 .toastify.on {
     opacity: 1;
 }
 
 .toast-close {
     opacity: 0.4;
     padding: 0 5px;
 }
 
 .toastify-right {
     right: 15px;
 }
 
 .toastify-left {
     left: 15px;
 }
 
 .toastify-top {
     top: -150px;
 }
 
 .toastify-bottom {
     bottom: -150px;
 }
 
 .toastify-rounded {
     border-radius: 25px;
 }
 
 .toastify-avatar {
     width: 1.5em;
     height: 1.5em;
     margin: -7px 5px;
     border-radius: 2px;
 }
 
 .toastify-center {
     margin-left: auto;
     margin-right: auto;
     left: 0;
     right: 0;
     max-width: fit-content;
     max-width: -moz-fit-content;
 }
 
 @media only screen and (max-width: 360px) {
     .toastify-right, .toastify-left {
         margin-left: auto;
         margin-right: auto;
         left: 0;
         right: 0;
         max-width: fit-content;
     }
 }
 `
  document.body.appendChild(link);
  const [_1, _2, bv] = window.location.pathname.match(/(\/video\/)(.*?)\/?$/) || [];
  const playerDom = document.querySelector('.bilibili-player-video');

  function start() {
    const video = (playerDom?.querySelector('bwp-video') || playerDom?.querySelector('video')) as HTMLVideoElement;
    window.addEventListener('message', (res) => {
      if (res.data.type === EventType.VideoHandle) {
        const currentTime: number = parseFloat(res.data.data.currentTime || 0);
        const event: string = res.data.data.event;
        console.log('get event', event);

        if (res.data.data.bv !== bv) {
          return;
        }

        if (event === 'play') {
          loading = true;
          player.seek(currentTime);
          player.play();
          setTimeout(() => {
            loading = false;
          }, 1000)
        }
        if (event === 'pause') {
          loading = true;
          player.pause();
          setTimeout(() => {
            loading = false;
          }, 1000)
        }
        if (event === 'seeked') {
          loading = true;
          player.seek(currentTime);
        }
        if (event === 'alert') {
          Toastify({
            text: res.data.data.text,
            duration: 3000,
          }).showToast();
        }
      }
    });

    [
        'play',
        'pause',
        'seeked',
        // 'timeupdate'
      ].forEach((event) => {
        video.addEventListener(event, () => {
          console.log('video event', event);
          if (event === 'seeked' && loading) {
            loading = false;
            return;
          }
          if (loading) {
            return;
          }
          window.postMessage({
            type: 'video',
            event,
            data: {
              currentTime: video.currentTime
            }
          })
        })
      });
  }

  const observer = new MutationObserver(() => {
    if (playerDom && (playerDom.querySelector('bwp-video') || playerDom?.querySelector('video'))) {
      startCheck();
      observer.disconnect();
    }
  });

  if (playerDom) {
    if (playerDom.querySelector('bwp-video') || playerDom?.querySelector('video')) {
      startCheck();
    } else {
      observer.observe(playerDom, {
        childList: true, subtree: true
      });
    }
  }
  function startCheck() {
    const check = () => {
        if ((window as any).player) {
          start();
        } else {
          requestAnimationFrame(check);
        }
    };
    requestAnimationFrame(check);
  }
});




// setInterval(() => {
//   window.postMessage('xxxx');
// }, 100)