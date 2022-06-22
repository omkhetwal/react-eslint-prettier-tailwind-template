import React from "react";
import { useState, useEffect } from "react";
import { createNewMessage, supabase } from "../../utils";
import { useForm } from "react-hook-form";

function Community() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  async function init() {
    const { data: messages, error } = await supabase
      .from("messages")
      .select("*");
    //console.log(messages);
    setMessages(messages);
  }

  async function subscribeToChanges() {
    try {
      await supabase
        .from("messages")
        .on("INSERT", (message) => {
          console.log("Change received!", message);
          init();
        })
        .subscribe();
      console.log(messages, "☝️");

      //setMessages(messages);
    } catch (error) {}
  }

  useEffect(() => {
    //reset();
    init();
    subscribeToChanges();
  }, []);

  //console.log(JSON.stringify(messages, null, 2));

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    createNewMessage(data);
  };

  return (
    <div>
      <div className="overflow-y-auto border-2 border-green-700">
        {messages.map((msg) => {
          return (
            <div className="flex justify-center items-center space-x-40 m-5 p-2 bg-slate-300 rounded-t-lg rounded-br-lg relative">
              <div className="absolute left-10">
                <img
                  src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                  alt="My profile"
                  className="w-6 h-6 rounded-full order-1"
                />
                {msg.username}
              </div>
              <div className="">
                <div>{msg.content}</div>
                <div className="right-0 bottom-0 text-xs">{msg.created_at}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* below is the message form */}
      <div className="p-5 border-2 border-red-800">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Username</label>
          <br />
          <input
            className="p-1 border-2 rounded-md border-black"
            placeholder="username"
            {...register("username")}
          />
          <br />
          <br />
          <label>Message</label>
          <br />
          <input
            className="p-1 border-2 rounded-md border-black"
            placeholder="content"
            {...register("content")}
          />
          <br />
          <br />
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            {...register("img-url")}
          />
          <br />
          <br />
          <input
            className="px-3 py-1 bg-blue-800 rounded-sm text-white"
            type="submit"
            value="Send"
            //onClick={() => reset()}
          />
        </form>
      </div>
    </div>
  );
}

export default Community;
