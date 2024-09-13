 
/* eslint-disable react/prop-types */

import Message from "./Message";

export default function Messages({ messages = [] }) {
  return (
    <div className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse">
      <ul className="space-y-2">
        {messages.map((message) => {
            const {message : lastMessage, id} = message || {}
          return <Message key={id} justify="start" message={lastMessage}/>;
        })}
      </ul>
    </div>
  );
}
