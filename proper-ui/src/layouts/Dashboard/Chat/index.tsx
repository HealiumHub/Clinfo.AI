import { useState } from "react";
import InitChatState from "./InitChatState";

enum ChatStateEnum {
  "INIT",
  "LOADING",
  "SUCCESS",
  "ERROR",
}

const Chat = () => {
  const [chatState, setChatState] = useState<ChatStateEnum>(ChatStateEnum.INIT);

  const resolveChatState = () => {
    switch (chatState) {
      case ChatStateEnum.INIT:
        return <InitChatState />;
      default:
        return "Default";
    }
  };

  return (
    <div className="bg-background w-full h-full">{resolveChatState()}</div>
  );
};

export default Chat;
