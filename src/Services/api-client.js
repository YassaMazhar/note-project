import axios from "axios";

export let apiClient = axios.create({
  baseURL: `https://note-sigma-black.vercel.app/api/v1`,
  timeout: 3000,
});

// apiClient.interceptors.response.use(
//   (response) => {
//     return Promise.resolve({
//       success: true,
//       data: response.data.note,
//       message: response.data.msg,
//     });
//   },
//   (error) => {
//     return Promise.reject({
//       success: false,
//       message: error.response.data.msg,
//     });
//   }
// );
