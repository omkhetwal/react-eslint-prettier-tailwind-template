import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://dsjhlufygpwxcyeacquw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzamhsdWZ5Z3B3eGN5ZWFjcXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTU3MTgxMDcsImV4cCI6MTk3MTI5NDEwN30.enaY7Hzu6NJcmSMvvJ1IcYk_yT-Y0PFyYxb1dRn5ASE"
);

export const createNewMessage = async (message) => {
  try {
    const { data, error } = await supabase.from("messages").insert({
      ...message,
    });
    if (data) {
      return data;
    }
    console.log(error);
    return null;
  } catch (error) {
    console.log("error in createNewMessage>", error);
    throw error;
  }
};
