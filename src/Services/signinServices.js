import axios from "axios";

export async function sendDataToSigninPage(values) {
  try {
    let options = {
      url: "https://note-sigma-black.vercel.app/api/v1/users/signIn",
      method: "POST",
      data: values,
    };
    let response = await axios.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
