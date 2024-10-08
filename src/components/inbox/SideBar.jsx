/* eslint-disable no-unused-vars */

import gravatarUrl from "gravatar-url";
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetConversationsQuery } from "../../features/conversations/conversationsApi";
import Modal from "./Modal";

export default function Sidebar() {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  // Get logged-in user data, especially the email, to pass to the hook
  const { user } = useSelector((state) => state.auth);
  const { email } = user || {};



  // Use the hook to fetch conversations
  const {
    data: conversations,
    isLoading,
    isError,
    error,
  } = useGetConversationsQuery(email);

  // Function to get the partner's name
  const getUserName = (users) => {
    if (users) {
      const otherUser = users.find((user) => user.email !== email);
      return otherUser ? otherUser.name : "Unknown";
    }
    return "Unknown";
  };

  // Function to get the partner's email
  const getPartnerEmail = (users) => {
    if (users) {
      const otherUser = users.find((user) => user.email !== email);
      return otherUser ? otherUser.email : "";
    }
    return "";
  };

  // Decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <li className="m-2 text-center text-[16px] font-bold">Loading</li>
    );
  } else if (!isLoading && isError) {
    content = (
      <li className="m-2 text-center text-[16px] font-bold text-red-500">
        Error Loading Conversation
      </li>
    );
  } else if (!isLoading && !isError && conversations?.length === 0) {
    content = (
      <li className="m-2 text-center text-[16px] font-bold text-red-500">
        Not Enough Data
      </li>
    );
  } else if (!isLoading && !isError && conversations?.length > 0) {
    content = conversations.map((conversation) => {
      const partnerEmail = getPartnerEmail(conversation.users);
      const gravatar = gravatarUrl(partnerEmail, { size: 200 }); // Generate gravatar URL

      return (
 
          <Link to={`/inbox/${conversation?.id}`} key={conversation?.id} className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
            <img
              className="object-cover w-10 h-10 rounded-full"
              src={gravatar} // Use the gravatar URL for the avatar
              alt={conversation?.participants || "Unknown"}
            />
            <div className="w-full pb-2 hidden md:block">
              <div className="flex justify-between">
                <span className="block ml-2 font-semibold text-gray-600">
                  {getUserName(conversation.users)}
                </span>
                <span className="block ml-2 text-sm text-gray-600">
                  {moment(conversation?.timestamp).fromNow()}
                </span>
              </div>
              <span className="block ml-2 text-sm text-gray-600">
                {conversation?.message || "No message"}
              </span>
            </div>
          </Link>
        
      );
    });
  }

 

  return (
    <div className="w-[100px] h-[90vh] border-r border-t-0 border-gray-300 lg:col-span-1 md:w-full">
      <div className="h-[65px] text-center text-grey-500 p-4 border-b border-gray-300 flex md:justify-end justify-center">
        <svg
          onClick={toggleModal} // Trigger modal toggle on click
          viewBox="0 0 194.436 194.436"
          className="w-5 h-5 text-grey-500 cursor-pointer"
        >
          <path
            d="M192.238,34.545L159.894,2.197C158.487,0.79,156.579,0,154.59,0c-1.989,0-3.897,0.79-5.303,2.196l-32.35,32.35
              c-0.004,0.004-0.008,0.01-0.013,0.014L54.876,96.608c-1.351,1.352-2.135,3.166-2.193,5.076l-1.015,33.361
              c-0.063,2.067,0.731,4.068,2.193,5.531c1.409,1.408,3.317,2.196,5.303,2.196c0.076,0,0.153-0.001,0.229-0.004l33.36-1.018
              c1.909-0.058,3.724-0.842,5.075-2.192l94.41-94.408C195.167,42.223,195.167,37.474,192.238,34.545z M154.587,61.587L132.847,39.85
              l21.743-21.743l21.738,21.741L154.587,61.587z M89.324,126.85l-22.421,0.685l0.682-22.422l54.655-54.656l21.741,21.738
              L89.324,126.85z"
          />
          <path
            d="M132.189,117.092c-4.142,0-7.5,3.357-7.5,7.5v54.844H15.001V69.748h54.844c4.142,0,7.5-3.357,7.5-7.5s-3.358-7.5-7.5-7.5
              H7.501c-4.142,0-7.5,3.357-7.5,7.5v124.687c0,4.143,3.358,7.5,7.5,7.5h124.687c4.142,0,7.5-3.357,7.5-7.5v-62.344
              C139.689,120.449,136.331,117.092,132.189,117.092z"
          />
        </svg>
      </div>
      {/* Modal Component */}
      <Modal open={modalOpen} control={toggleModal} />
      <ul className="overflow-auto">{content}</ul>
    </div>
  );
}
