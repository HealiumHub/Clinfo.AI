import { useState } from "react";
import InitChatState from "./InitChatState";
import { ClinfoResponse } from "@/api/types";
import Loading from "./Loading";
import Result from "./Result";
import Error from "./Error";
import { set } from "react-hook-form";

export enum ChatStateEnum {
  "INIT",
  "LOADING",
  "SUCCESS",
  "ERROR",
}

const Chat = () => {
  const [chatState, setChatState] = useState<ChatStateEnum>(ChatStateEnum.INIT);
  const [result, setResult] = useState<ClinfoResponse>();

  const handleSearch = async (query: string) => {
    setChatState(ChatStateEnum.LOADING);
    try {
      const response = await fetch(`http://localhost:8001/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: query }),
      });

      const res: ClinfoResponse = await response.json();

      console.log(res);
      setResult(res);
      setChatState(ChatStateEnum.SUCCESS);
      return res;
    } catch (err) {
      console.log(err);
      setChatState(ChatStateEnum.ERROR);
    }
  };

  const resolveChatState = () => {
    switch (chatState) {
      case ChatStateEnum.INIT:
        return (
          <InitChatState
            setChatState={setChatState}
            handleSearch={handleSearch}
          />
        );
      case ChatStateEnum.LOADING:
        return <Loading />;
      case ChatStateEnum.SUCCESS:
        return <Result result={result!} setChatState={setChatState} />;
      case ChatStateEnum.ERROR:
        return <Error />;
      default:
        // return <Result result={result!} setChatState={setChatState} />;
        return <Error />;
    }
  };

  return (
    <div className="bg-background w-full h-full">{resolveChatState()}</div>
  );
};

export default Chat;
