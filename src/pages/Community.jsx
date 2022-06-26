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

  const { register, handleSubmit } = useForm();

  /**
   *
   * @param data
   * 1. Extract username,content and image from the form
   * 2. Generate name for the image
   *    2.1 Retrieve file extension
   *    2.2 Generate random number
   * 3. Upload the image to the storage
   * 4. It will return key
   * 5. Create public url for the image
   * 6. Create a new message with the username, content and image url
   */

  const onSubmit = async (data) => {
    try {
      const { username, content, imgUrl } = data;

      const file = imgUrl[0];
      const fileExt = file.name.split(".").pop();
      const fileName = Math.random() + "." + fileExt;

      let { data: uploadedData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      const res = await supabase.storage
        .from("images")
        .getPublicUrl(uploadedData.Key);
      const img_url = res.publicURL.replace("/images", "");

      const messageDetails = {
        username,
        content,
        img_url,
      };
      await createNewMessage(messageDetails);
      init();
    } catch (error) {
      console.log(error, "error in onSubmit");
    }
  };

  return (
    <div>
      <div className="overflow-y-auto border-2 border-green-700">
        {messages.map((msg) => {
          return (
            <div className="flex justify-center items-center space-x-40 m-5 p-2 bg-slate-300 rounded-t-lg rounded-br-lg relative">
              <div className="absolute left-10">
                <img
                  src={
                    msg.img_url ||
                    "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                  }
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
            {...register("imgUrl")}
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
