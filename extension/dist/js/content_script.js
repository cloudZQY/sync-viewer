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
const video = document.querySelector('bwp-video') || document.querySelector('video');
if (video) {
    chrome.runtime.onMessage.addListener((message) => {
        if (message.type === event_constant_1.EventType.VideoHandle) {
            const data = message.data;
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
    const sendMsg = (event, video) => {
        chrome.runtime.sendMessage({
            type: event_constant_1.EventType.Video,
            data: {
                event,
                currentTime: video.currentTime
            }
        });
    };
    [
        'play',
        'pause',
        'seeked '
    ].forEach((event) => {
        video.addEventListener(event, () => {
            sendMsg(event, video);
        });
    });
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudF9zY3JpcHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9DQUFvQyxpQkFBaUIsS0FBSzs7Ozs7OztVQ1ozRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDdEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHlCQUF5QixtQkFBTyxDQUFDLG1FQUEyQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvY29uc3RhbnQvZXZlbnQuY29uc3RhbnQudHMiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvY29udGVudF9zY3JpcHQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5FdmVudFR5cGUgPSB2b2lkIDA7XG52YXIgRXZlbnRUeXBlO1xuKGZ1bmN0aW9uIChFdmVudFR5cGUpIHtcbiAgICBFdmVudFR5cGVbRXZlbnRUeXBlW1wiTG9naW5cIl0gPSAwXSA9IFwiTG9naW5cIjtcbiAgICBFdmVudFR5cGVbRXZlbnRUeXBlW1wiQ29ubmVjdFwiXSA9IDFdID0gXCJDb25uZWN0XCI7XG4gICAgRXZlbnRUeXBlW0V2ZW50VHlwZVtcIkpvaW5cIl0gPSAyXSA9IFwiSm9pblwiO1xuICAgIEV2ZW50VHlwZVtFdmVudFR5cGVbXCJQb3B1cEluaXRcIl0gPSAzXSA9IFwiUG9wdXBJbml0XCI7XG4gICAgRXZlbnRUeXBlW0V2ZW50VHlwZVtcIkRpc0Nvbm5lY3RcIl0gPSA0XSA9IFwiRGlzQ29ubmVjdFwiO1xuICAgIEV2ZW50VHlwZVtFdmVudFR5cGVbXCJWaWRlb1wiXSA9IDVdID0gXCJWaWRlb1wiO1xuICAgIEV2ZW50VHlwZVtFdmVudFR5cGVbXCJWaWRlb0hhbmRsZVwiXSA9IDZdID0gXCJWaWRlb0hhbmRsZVwiO1xufSkoRXZlbnRUeXBlID0gZXhwb3J0cy5FdmVudFR5cGUgfHwgKGV4cG9ydHMuRXZlbnRUeXBlID0ge30pKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGV2ZW50X2NvbnN0YW50XzEgPSByZXF1aXJlKFwiLi9jb25zdGFudC9ldmVudC5jb25zdGFudFwiKTtcbmNvbnN0IHZpZGVvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYndwLXZpZGVvJykgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndmlkZW8nKTtcbmlmICh2aWRlbykge1xuICAgIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSkgPT4ge1xuICAgICAgICBpZiAobWVzc2FnZS50eXBlID09PSBldmVudF9jb25zdGFudF8xLkV2ZW50VHlwZS5WaWRlb0hhbmRsZSkge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IG1lc3NhZ2UuZGF0YTtcbiAgICAgICAgICAgIGlmIChkYXRhLmV2ZW50ID09PSAncGxheScpIHtcbiAgICAgICAgICAgICAgICB2aWRlby5wbGF5KCk7XG4gICAgICAgICAgICAgICAgdmlkZW8uY3VycmVudFRpbWUgPSBkYXRhLmN1cnJlbnRUaW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuZXZlbnQgPT09ICdwYXVzZScpIHtcbiAgICAgICAgICAgICAgICB2aWRlby5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIHZpZGVvLmN1cnJlbnRUaW1lID0gZGF0YS5jdXJyZW50VGltZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmV2ZW50ID09PSAnc2Vla2VkJykge1xuICAgICAgICAgICAgICAgIHZpZGVvLmN1cnJlbnRUaW1lID0gZGF0YS5jdXJyZW50VGltZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHNlbmRNc2cgPSAoZXZlbnQsIHZpZGVvKSA9PiB7XG4gICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50X2NvbnN0YW50XzEuRXZlbnRUeXBlLlZpZGVvLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgICAgIGN1cnJlbnRUaW1lOiB2aWRlby5jdXJyZW50VGltZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFtcbiAgICAgICAgJ3BsYXknLFxuICAgICAgICAncGF1c2UnLFxuICAgICAgICAnc2Vla2VkICdcbiAgICBdLmZvckVhY2goKGV2ZW50KSA9PiB7XG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsICgpID0+IHtcbiAgICAgICAgICAgIHNlbmRNc2coZXZlbnQsIHZpZGVvKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=