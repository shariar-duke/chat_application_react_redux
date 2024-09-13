/* eslint-disable react/prop-types */
import gravatarUrl from "gravatar-url";
import { useSelector } from "react-redux";

export default function ChatHead({ message }) {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};

  // Destructure sender and receiver safely
  const sender = message?.sender || {};
  const receiver = message?.receiver || {};

  // Determine partner's email and name
  const partnerEmail = sender?.email === email ? receiver?.email : sender?.email;
  const partnerName = sender?.email === email ? receiver?.name : sender?.name;

  // Fallback values if partnerEmail or partnerName is undefined
  const gravatar = gravatarUrl(partnerEmail || "default@example.com", { size: 200 });
  const displayName = partnerName || "Unknown User";

  return (
    <div className="relative flex items-center p-3 border-b border-gray-300">
      <img
        className="object-cover w-10 h-10 rounded-full"
        src={gravatar}
        alt={displayName}
      />
      <span className="block ml-2 font-bold text-gray-600">{displayName}</span>
    </div>
  );
}
