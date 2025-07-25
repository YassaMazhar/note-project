import { apiClient } from "./api-client";

export async function addNote( values ) {
  try {
    let options = {
      url: "/notes",
      method: "POST",
      data: values,
      headers: {
        token: `3b8ny__${localStorage.getItem('token')}`,
      },
    };
    let response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getNote( ) {
  try {
    let options = {
      url: "/notes",
      method: "GET",
      headers: {
        token: `3b8ny__${localStorage.getItem('token')}`,
      },
    };
    let response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateNote( values ) {
  try {
    let options = {
      url: `/notes/${_id}`,
      method: "PUT",
      data : values ,
      headers: {
        token: `3b8ny__${localStorage.getItem('token')}`,
      },
    };
    let response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteNote( id) {
  try {
    let options = {
      url: `/notes/${id}`,
      method: "DELETE",
      headers: {
        token: `3b8ny__${localStorage.getItem('token')}`,
      },
    };
    let response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}