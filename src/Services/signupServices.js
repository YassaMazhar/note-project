import axios from "axios";

export async function sendDataToSignUpPage(values) {
  try {
    let options = {
      url: "https://note-sigma-black.vercel.app/api/v1/users/signUp",
      method: "POST",
      data: values,
    };
    let { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
