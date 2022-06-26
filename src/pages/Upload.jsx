import { useState, useEffect } from "react";
import { supabase } from "../../utils";

const Upload = ({}) => {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  // const downloadImage = async (path) => {
  //   try {
  //     console.log(path, "🏷️🏷️");
  //     const { data, error } = await supabase.storage
  //       .from("images")
  //       .download(path);
  //     if (error) {
  //       throw error;
  //     }
  //     const url = URL.createObjectURL(data);
  //     setAvatarUrl(url);
  //   } catch (error) {
  //     console.log("Error downloading image: ", error.message);
  //   }
  // };

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      console.log(file, "file 🏷️🏷️");
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      console.log(fileName, "fileName 🏷️🏷️");
      const filePath = `${fileName}`;
      console.log(filePath, "filePath 🏷️🏷️");

      let { data, error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
      console.log(data, "data 🏷️🏷️");
      const res = supabase.storage.from("images").getPublicUrl(data.Key);
      const imageUrl = res.publicURL.replace("/images", "");
      setAvatarUrl(imageUrl);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        id="single"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
      />
      {avatarUrl && (
        <img src={avatarUrl} alt="avatar" style={{ width: "200px" }} />
      )}
    </div>
  );
};

export default Upload;
