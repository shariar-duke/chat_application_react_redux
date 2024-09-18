import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { conversationsApi, useAddConversationMutation, useEditConversationMutation } from "../../features/conversations/conversationsApi";
import { useGetUserQuery } from "../../features/users/usersApi";
import isValidEmail from "../../utils/isValidEmail";

export default function Modal({ open, control }) {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [userCheck, setUserCheck] = useState(false);
  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const { email: myEmail } = loggedInUser || {};
  const [responseError, setResponseError] = useState("");
  const [conversation, setConversation] = useState(undefined)
  const dispatch = useDispatch();

  const {
    data: participant,
    isLoading,
    error,
  } = useGetUserQuery(to, { skip: !userCheck });
  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const [addConversation, {isSuccess:isAddConversationSuccess}] = useAddConversationMutation()
  const [editConversation, {isSuccess:isEditConversationSuccess}] = useEditConversationMutation()


  // listen conversation add/edit success 
// ei useEffect a modal take off korabe 
  useEffect(()=> {
    if(isAddConversationSuccess || isEditConversationSuccess) 
    {
        control()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isAddConversationSuccess, isEditConversationSuccess])

  useEffect(() => {
    if (participant?.length > 0 && participant[0].email !== myEmail) {
      // check conversation existence
      dispatch(
        conversationsApi.endpoints.getConversation.initiate({
          userEmail: myEmail,
          participantEmail: to,
        })
      )
        .unwrap()
        .then((data)=> {
          console.log("The message data is", data)
          setConversation(data)
        })
        .catch((err) => {
          setResponseError("There was a problem");
        });
    }
  }, [participant, dispatch, myEmail, to]);

  const doSearch = (value) => {
    if (isValidEmail(value)) {
      // check user API
      setUserCheck(true);
      setTo(value);
    }
  };

  const handleSearch = debounceHandler(doSearch, 500);

  const handleSubmit =(e)=> 
  {
    e.preventDefault()
   if(conversation?.length > 0) 
   {
    // editConversation
    editConversation({
        id:conversation[0]?.id,
        data:{
            participants:`${myEmail}-${participant[0].email}`,
            users:[loggedInUser, participant[0]],
            message:message,
            timestamp: new Date().getTime()
        }
    })
   }

   else if(conversation?.length ===0) 
   {
  
    addConversation({
        participants:`${myEmail}-${participant[0].email}`,
        users:[loggedInUser, participant[0]],
        message:message,
        timestamp: new Date().getTime()
    })
   }
  }

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Send message
          </h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="to" className="sr-only">
                  To
                </label>
                <input
                  id="to"
                  name="to"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Send to"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  participant?.length === 0
                    ? "cursor-not-allowed bg-gray-400 text-gray-700"
                    : "cursor-pointer text-white bg-violet-600 hover:bg-violet-700 focus:ring-violet-500"
                }`}
                disabled={conversation == undefined || (participant?.length > 0 && participant[0].email === myEmail)}
              >
                Send Message
              </button>
              {participant?.length === 0 && (
                <div className="mt-[10px] flex justify-center items-center text-red-400 font-bold">
                  <p>This user does not exitsts</p>
                </div>
              )}

              {participant?.length > 0 && participant[0].email === myEmail && (
                <div className="mt-[10px] flex justify-center items-center text-red-400 font-bold">
                  <p>You can not send message to yourself</p>
                </div>
              )}

              {responseError && (
                <div className="mt-[10px] flex justify-center items-center text-red-400 font-bold">
                  <p>{responseError}</p>
                </div>
              )}
            </div>

            {/* <Error message="There was an error" /> */}
          </form>
        </div>
      </>
    )
  );
}
