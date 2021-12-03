/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constant/event.constant.ts":
/*!****************************************!*\
  !*** ./src/constant/event.constant.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventType = void 0;
var EventType;
(function (EventType) {
    EventType[EventType["Login"] = 0] = "Login";
    EventType[EventType["Connect"] = 1] = "Connect";
    EventType[EventType["Join"] = 2] = "Join";
    EventType[EventType["PopupInit"] = 3] = "PopupInit";
    EventType[EventType["DisConnect"] = 4] = "DisConnect";
    EventType[EventType["Video"] = 5] = "Video";
    EventType[EventType["VideoHandle"] = 6] = "VideoHandle";
    EventType[EventType["Invite"] = 7] = "Invite";
})(EventType = exports.EventType || (exports.EventType = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!********************************!*\
  !*** ./src/content_script.tsx ***!
  \********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const event_constant_1 = __webpack_require__(/*! ./constant/event.constant */ "./src/constant/event.constant.ts");
function injectScript(file) {
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
};
injectScript(chrome.extension.getURL('/js/vendor.js'));
injectScript(chrome.extension.getURL('/js/inject.js'));
injectScript(chrome.extension.getURL('/toastify.js'));
window.addEventListener('load', () => {
    const { pathname } = window.location;
    const [_1, _2, bv] = pathname.match(/(\/video\/)(.*?)\/?$/) || [];
    const playerDom = document.querySelector('.bilibili-player-video');
    function start() {
        const video = playerDom === null || playerDom === void 0 ? void 0 : playerDom.querySelector('bwp-video');
        chrome.runtime.onMessage.addListener((message) => {
            if (message.type === event_constant_1.EventType.VideoHandle) {
                const data = message.data;
                window.postMessage({
                    type: event_constant_1.EventType.VideoHandle,
                    data
                });
                if (data.event === 'init') {
                    if (bv === data.bv) {
                        sendMsg('enter', {});
                        window.postMessage({
                            type: event_constant_1.EventType.VideoHandle,
                            data: {
                                bv,
                                event: 'alert',
                                text: "进入同一视频🙆",
                            }
                        });
                    }
                }
                else if (data.event === 'enter') {
                    setTimeout(() => {
                        window.postMessage({
                            type: event_constant_1.EventType.VideoHandle,
                            data: {
                                event: 'alert',
                                bv,
                                text: "进入同一视频🙆"
                            }
                        });
                    }, 2000);
                }
            }
        });
        setTimeout(() => {
            var _a;
            const uploader = document.querySelector('.mini-upload') || document.querySelector('[data-idx=upload]');
            const btn = document.createElement('div');
            btn.innerText = '邀请';
            Object.assign(btn.style, btnStyle);
            if (uploader) {
                Object.assign(uploader.style, {
                    display: 'none'
                });
                (_a = uploader === null || uploader === void 0 ? void 0 : uploader.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(btn, uploader);
                btn.addEventListener('click', () => {
                    var _a;
                    chrome.runtime.sendMessage({
                        type: event_constant_1.EventType.Invite,
                        data: {
                            url: location.href,
                            message: (_a = document.querySelector('.tit')) === null || _a === void 0 ? void 0 : _a.innerText
                        }
                    });
                });
            }
        }, 2000);
        function sendMsg(event, video = {}) {
            try {
                chrome.runtime.sendMessage({
                    type: event_constant_1.EventType.Video,
                    data: {
                        event,
                        bv,
                        currentTime: `${video.currentTime || 0}`
                    }
                });
            }
            catch (err) {
                console.log(err);
            }
        }
        sendMsg('init');
        window.addEventListener('message', (res) => {
            if (res.data && res.data.type === 'video') {
                const event = res.data.event;
                const content = res.data.data;
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
        if (playerDom && playerDom.querySelector('bwp-video') || (playerDom === null || playerDom === void 0 ? void 0 : playerDom.querySelector('video'))) {
            start();
            observer.disconnect();
        }
    });
    if (playerDom) {
        if (playerDom.querySelector('bwp-video') || (playerDom === null || playerDom === void 0 ? void 0 : playerDom.querySelector('video'))) {
            start();
        }
        else {
            observer.observe(playerDom, {
                childList: true, subtree: true
            });
        }
    }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudF9zY3JpcHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsb0NBQW9DLGlCQUFpQixLQUFLOzs7Ozs7O1VDYjNEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QseUJBQXlCLG1CQUFPLENBQUMsbUVBQTJCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1QsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3Qyx1QkFBdUI7QUFDL0Q7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsY0FBYztBQUNkLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9jb25zdGFudC9ldmVudC5jb25zdGFudC50cyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9jb250ZW50X3NjcmlwdC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkV2ZW50VHlwZSA9IHZvaWQgMDtcbnZhciBFdmVudFR5cGU7XG4oZnVuY3Rpb24gKEV2ZW50VHlwZSkge1xuICAgIEV2ZW50VHlwZVtFdmVudFR5cGVbXCJMb2dpblwiXSA9IDBdID0gXCJMb2dpblwiO1xuICAgIEV2ZW50VHlwZVtFdmVudFR5cGVbXCJDb25uZWN0XCJdID0gMV0gPSBcIkNvbm5lY3RcIjtcbiAgICBFdmVudFR5cGVbRXZlbnRUeXBlW1wiSm9pblwiXSA9IDJdID0gXCJKb2luXCI7XG4gICAgRXZlbnRUeXBlW0V2ZW50VHlwZVtcIlBvcHVwSW5pdFwiXSA9IDNdID0gXCJQb3B1cEluaXRcIjtcbiAgICBFdmVudFR5cGVbRXZlbnRUeXBlW1wiRGlzQ29ubmVjdFwiXSA9IDRdID0gXCJEaXNDb25uZWN0XCI7XG4gICAgRXZlbnRUeXBlW0V2ZW50VHlwZVtcIlZpZGVvXCJdID0gNV0gPSBcIlZpZGVvXCI7XG4gICAgRXZlbnRUeXBlW0V2ZW50VHlwZVtcIlZpZGVvSGFuZGxlXCJdID0gNl0gPSBcIlZpZGVvSGFuZGxlXCI7XG4gICAgRXZlbnRUeXBlW0V2ZW50VHlwZVtcIkludml0ZVwiXSA9IDddID0gXCJJbnZpdGVcIjtcbn0pKEV2ZW50VHlwZSA9IGV4cG9ydHMuRXZlbnRUeXBlIHx8IChleHBvcnRzLkV2ZW50VHlwZSA9IHt9KSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBldmVudF9jb25zdGFudF8xID0gcmVxdWlyZShcIi4vY29uc3RhbnQvZXZlbnQuY29uc3RhbnRcIik7XG5mdW5jdGlvbiBpbmplY3RTY3JpcHQoZmlsZSkge1xuICAgIHZhciB0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKTtcbiAgICB2YXIgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHMuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvamF2YXNjcmlwdCcpO1xuICAgIHMuc2V0QXR0cmlidXRlKCdzcmMnLCBmaWxlKTtcbiAgICBpZiAodGgpIHtcbiAgICAgICAgdGgucHJlcGVuZChzKTtcbiAgICB9XG59XG5jb25zdCBidG5TdHlsZSA9IHtcbiAgICAnY3Vyc29yJzogJ3BvaW50ZXInLFxuICAgICdwb3NpdGlvbic6ICdyZWxhdGl2ZScsXG4gICAgJ2NvbG9yJzogJyNmZmYnLFxuICAgICdmb250LXNpemUnOiAnMTRweCcsXG4gICAgJ2Rpc3BsYXknOiAnYmxvY2snLFxuICAgICd3aWR0aCc6ICcxMDBweCcsXG4gICAgJ2hlaWdodCc6ICczNnB4JyxcbiAgICAnbGluZS1oZWlnaHQnOiAnMzZweCcsXG4gICAgJ3RleHQtYWxpZ24nOiAnY2VudGVyJyxcbiAgICAnYmFja2dyb3VuZCc6ICcjRkI3Mjk5JyxcbiAgICAnYm9yZGVyLXJhZGl1cyc6ICcycHgnLFxuICAgICdtYXJnaW4tbGVmdCc6ICcxNHB4Jyxcbn07XG5pbmplY3RTY3JpcHQoY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9qcy92ZW5kb3IuanMnKSk7XG5pbmplY3RTY3JpcHQoY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9qcy9pbmplY3QuanMnKSk7XG5pbmplY3RTY3JpcHQoY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy90b2FzdGlmeS5qcycpKTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgIGNvbnN0IHsgcGF0aG5hbWUgfSA9IHdpbmRvdy5sb2NhdGlvbjtcbiAgICBjb25zdCBbXzEsIF8yLCBidl0gPSBwYXRobmFtZS5tYXRjaCgvKFxcL3ZpZGVvXFwvKSguKj8pXFwvPyQvKSB8fCBbXTtcbiAgICBjb25zdCBwbGF5ZXJEb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmlsaWJpbGktcGxheWVyLXZpZGVvJyk7XG4gICAgZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgIGNvbnN0IHZpZGVvID0gcGxheWVyRG9tID09PSBudWxsIHx8IHBsYXllckRvbSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGxheWVyRG9tLnF1ZXJ5U2VsZWN0b3IoJ2J3cC12aWRlbycpO1xuICAgICAgICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnR5cGUgPT09IGV2ZW50X2NvbnN0YW50XzEuRXZlbnRUeXBlLlZpZGVvSGFuZGxlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IG1lc3NhZ2UuZGF0YTtcbiAgICAgICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBldmVudF9jb25zdGFudF8xLkV2ZW50VHlwZS5WaWRlb0hhbmRsZSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLmV2ZW50ID09PSAnaW5pdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ2ID09PSBkYXRhLmJ2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZW5kTXNnKCdlbnRlcicsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZXZlbnRfY29uc3RhbnRfMS5FdmVudFR5cGUuVmlkZW9IYW5kbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6ICdhbGVydCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwi6L+b5YWl5ZCM5LiA6KeG6aKR8J+ZhlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEuZXZlbnQgPT09ICdlbnRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGV2ZW50X2NvbnN0YW50XzEuRXZlbnRUeXBlLlZpZGVvSGFuZGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6ICdhbGVydCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIui/m+WFpeWQjOS4gOinhumikfCfmYZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IHVwbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1pbmktdXBsb2FkJykgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtaWR4PXVwbG9hZF0nKTtcbiAgICAgICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYnRuLmlubmVyVGV4dCA9ICfpgoDor7cnO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihidG4uc3R5bGUsIGJ0blN0eWxlKTtcbiAgICAgICAgICAgIGlmICh1cGxvYWRlcikge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odXBsb2FkZXIuc3R5bGUsIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgKF9hID0gdXBsb2FkZXIgPT09IG51bGwgfHwgdXBsb2FkZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVwbG9hZGVyLnBhcmVudEVsZW1lbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pbnNlcnRCZWZvcmUoYnRuLCB1cGxvYWRlcik7XG4gICAgICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGV2ZW50X2NvbnN0YW50XzEuRXZlbnRUeXBlLkludml0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGxvY2F0aW9uLmhyZWYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogKF9hID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpdCcpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaW5uZXJUZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgZnVuY3Rpb24gc2VuZE1zZyhldmVudCwgdmlkZW8gPSB7fSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGV2ZW50X2NvbnN0YW50XzEuRXZlbnRUeXBlLlZpZGVvLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ2LFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFRpbWU6IGAke3ZpZGVvLmN1cnJlbnRUaW1lIHx8IDB9YFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZW5kTXNnKCdpbml0Jyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5kYXRhICYmIHJlcy5kYXRhLnR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IHJlcy5kYXRhLmV2ZW50O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSByZXMuZGF0YS5kYXRhO1xuICAgICAgICAgICAgICAgIHNlbmRNc2coZXZlbnQsIGNvbnRlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gW1xuICAgICAgICAvLyAgICdwbGF5JyxcbiAgICAgICAgLy8gICAncGF1c2UnLFxuICAgICAgICAvLyAgICdzZWVrZWQnLFxuICAgICAgICAvLyAgICdwbGF5aW5nJ1xuICAgICAgICAvLyBdLmZvckVhY2goKGV2ZW50KSA9PiB7XG4gICAgICAgIC8vICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgKCkgPT4ge1xuICAgICAgICAvLyAgICAgY29uc3QgY3VycmVudFRpbWUgPSB2aWRlby5nZXRBdHRyaWJ1dGUoJ2RhdGEtY3VycmVudHRpbWUnKTtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGV2ZW50LCBjdXJyZW50VGltZSk7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZygxMDApXG4gICAgICAgIC8vICAgICB2aWRlby5jdXJyZW50VGltZSA9IDEwMDtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCduYW1lJywgKHZpZGVvIGFzIGFueSkubmFtZSlcbiAgICAgICAgLy8gICAgIHNlbmRNc2coZXZlbnQsIHtcbiAgICAgICAgLy8gICAgICAgY3VycmVudFRpbWU6IGN1cnJlbnRUaW1lXG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gICB9KVxuICAgICAgICAvLyB9KVxuICAgIH1cbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgaWYgKHBsYXllckRvbSAmJiBwbGF5ZXJEb20ucXVlcnlTZWxlY3RvcignYndwLXZpZGVvJykgfHwgKHBsYXllckRvbSA9PT0gbnVsbCB8fCBwbGF5ZXJEb20gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBsYXllckRvbS5xdWVyeVNlbGVjdG9yKCd2aWRlbycpKSkge1xuICAgICAgICAgICAgc3RhcnQoKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChwbGF5ZXJEb20pIHtcbiAgICAgICAgaWYgKHBsYXllckRvbS5xdWVyeVNlbGVjdG9yKCdid3AtdmlkZW8nKSB8fCAocGxheWVyRG9tID09PSBudWxsIHx8IHBsYXllckRvbSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGxheWVyRG9tLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJykpKSB7XG4gICAgICAgICAgICBzdGFydCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShwbGF5ZXJEb20sIHtcbiAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=