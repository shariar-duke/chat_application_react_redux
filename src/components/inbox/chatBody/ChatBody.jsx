import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../../../features/messages/messagesApi";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";

export default function ChatBody() {
  const { id } = useParams();
  const { data: messages, isLoading, isError, error } = useGetMessagesQuery(id);




  // Conditional rendering for the message content
  let messageContent = null;

  if (isLoading) {
    messageContent = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    messageContent = (
      <div className="flex-grow h-full flex items-center justify-center">
        <p className="text-[16px] text-red-500 font-bold"> {error?.data} </p>
      </div>
    );
  } else if (!isLoading && !isError && messages?.length === 0) {
    messageContent = (
      <div className="flex-grow h-full flex items-center justify-center">
        No messages found!
      </div>
    );
  } else if (!isLoading && !isError && messages?.length > 0) {
    messageContent = <Messages messages={messages} />;
  }

  return (
    <div className="w-full lg:col-span-2 lg:block h-[90vh] flex flex-col">
    {/* Chat Head (Always at the top) */}
    <ChatHead
        message={messages?.[0] }
      />

    {/* Messages (take the available space and enable scrolling if needed) */}
    <div className="flex-grow overflow-y-auto  h-[calc(100vh_-_197px)]">
      {messageContent}
    </div>

    {/* Options (always at the bottom) */}
    <div>
      <Options />
    </div>
  </div>
);
}

