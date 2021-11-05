import React, { useEffect, useMemo, useState } from "react";
import debounce from 'debounce';
import ReactDOM from "react-dom";
import { EventType } from "./constant/event.constant";
import { SOTRAGE_KEY } from "./constant/storage.constant";

const Popup = () => {
  const [secretId, setSecretId] = useState('');
  const [toSecretId, setToSecretId] = useState('');
  const [isConnect, setIsConnect] = useState(false);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === EventType.Login) {
        setSecretId(message.data.secretId);
      } if (message.type === EventType.Connect) {
        setIsConnect(true);
      } if (message.type === EventType.DisConnect) {
        setIsConnect(false);
      }
    });
    chrome.storage.local.get([SOTRAGE_KEY.SECRET_ID, SOTRAGE_KEY.TO_SECRET_ID], (value) => {
      if (value.secretId) {
        setSecretId(value.secretId);
      }
      if (value.toSecretId) {
        setToSecretId(value.toSecretId);
      }
    });
    chrome.runtime.sendMessage({
      type: EventType.PopupInit
    })
  }, [])

  const connect = useMemo(() => {
    return debounce((toToken: string) => {
      chrome.runtime.sendMessage({
        type: EventType.Join,
        data: {
          toSecretId: toToken,
          secretId
        }
      })
    }, 200);
  }, [secretId])

  return (
    <>
      <div>
        你的secret id: {secretId}
        填入他(她)的secret id
        <input
          type="text"
          value={toSecretId}
          onChange={(e) => {
            setToSecretId(e.target.value);
            connect(e.target.value);
          }}
        />
        {isConnect && '已连接'}
      </div>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
