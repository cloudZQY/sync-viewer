import axios from 'axios';
import {io, Socket} from 'socket.io-client'
import { EventType } from './constant/event.constant';
import { SOTRAGE_KEY } from './constant/storage.constant';


const REQUEST_URL = 'http://localhost:3434'
// const REQUEST_URL = 'http://106.53.235.116:3434'

io(`${REQUEST_URL}/socket`);

class Background {
  socket: Socket | null = null;
  connected: boolean = false;
  constructor() {
    this.start();
  }

  login(secretId: string, toSecretId: string) {
    chrome.runtime.sendMessage({
      type: EventType.Login,
      data: {
        secretId
      }
    });
    this.socket = io(`${REQUEST_URL}/socket`, {
      auth: {
        token: secretId
      },
      query: {
        toToken: toSecretId
      }
    });

    this.socket.on('connect', () => {
      
    });

    this.socket.on('disConnect', () => {
      this.socket = null;
    })

    this.socket.on('disJoin', () => {
      chrome.runtime.sendMessage({
        type: EventType.DisConnect
      });
      this.connected = false;
    })

    this.socket.on('join', () => {
      chrome.runtime.sendMessage({
        type: EventType.Connect
      });
      this.connected = true;
    })
  
    this.socket.on('video', (data) => {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        if (tabs[0].id) {
          chrome.tabs.sendMessage(tabs[0].id, {
            type: EventType.VideoHandle,
            data
          }, function(response) {});  
        }
      });
    })

  }

  async start() {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === EventType.PopupInit) {
        if (this.connected) {
          chrome.runtime.sendMessage({
            type: EventType.Connect
          })
        }
      } else if (message.type === EventType.Join) {
        axios.post(`${REQUEST_URL}/connect/join`, {
          toToken: message.data.toSecretId,
          token: message.data.secretId
        }).then((res) => {
          chrome.runtime.sendMessage({
            type: EventType.Connect
          });
        })
      } else if (message.type === EventType.Video) {
        this.socket?.emit('video', message.data)
      }
    })
    chrome.storage.local.get([SOTRAGE_KEY.SECRET_ID, SOTRAGE_KEY.TO_SECRET_ID], (value) => {
      const scretId: string = value.secretId;
      const toSecretId: string = value.toSecretId;
      if (!scretId) {
        fetch(`${REQUEST_URL}/connect/get-token`)
          .then((res) => res.json())
          .then(({ token }) => {
            chrome.storage.local.set({
              [SOTRAGE_KEY.SECRET_ID]: token
            });
            this.login(token, toSecretId);
          })
      } else {
        this.login(scretId, toSecretId);
      }
    });
  }

}

new Background();

