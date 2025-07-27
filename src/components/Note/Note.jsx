import toast from "react-hot-toast";
import { deleteNote, updateNote } from "../../Services/noteservices";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { apiClient } from "../../Services/api-client";

let schema = yup.object({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});

export default function Note({ noteInfo, getNoteHandle, setNotes }) {
  let { content, title, _id } = noteInfo;
  let [toggle, setToggle] = useState(false);

  function changeToggle() {
    setToggle(!toggle);
  }

  // ^ function delete notes
  async function deleteNoteHandle(_id) {
    try {
      let { data } = await deleteNote(_id);

      if (data.msg == "done") {
        toast.success("The note has been successfully deleted.");
        getNoteHandle();
        setNotes(data.notes);
      }
    } catch (error) {
      toast.error("error...");
    }
  }

  // ^ function update notes
  async function updateNoteHandle(values) {
    let toastId = toast.loading("Loading...");

    let options = {
      url: `/notes/${_id}`,
      method: "PUT",
      data: values,
      headers: {
        token: `3b8ny__${localStorage.getItem("token")}`,
      },
    };
    let { data } = await apiClient.request(options);
    if (data.msg == "done") {
      toast.dismiss(toastId);
      toast.success("Modified successfully");
      changeToggle();
      getNoteHandle();
    }
  }

  let formik = useFormik({
    initialValues: {
      title: title,
      content: content,
    },
    validationSchema: schema,
    onSubmit: updateNoteHandle,
  });

  return (
    <>
      <div>
        <div className="p-4 border-2 border-violet-400 space-y-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-gray-700">{content}</p>
          <div className="flex *:w-1/2 gap-4 *:rounded-md *:py-2 *:cursor-pointer">
            <button
              className="bg-red-400 text-white hover:bg-red-600"
              onClick={() => {
                deleteNoteHandle(_id);
              }}
            >
              Delete{" "}
            </button>
            <button
              className="bg-yellow-400 text-black hover:bg-amber-600"
              onClick={changeToggle}
            >
              Update{" "}
            </button>
          </div>
        </div>
        {toggle ? (
          <div className="absolute  inset-0">
            <div className="border-2 bg-white border-violet-200 shadow-2xl p-4 w-[70%] sm:w-1/2 lg:w-1/4  mx-auto mt-12">
              <div className=" *:size-5  *:rounded-full flex gap-2 items-center">
                <div className="bg-red-500"></div>
                <div className="bg-yellow-500"></div>
                <div className="bg-green-500"> </div>
              </div>
              <div className="flex items-center justify-between border-b border-gray-400/50 py-2  ">
                <h2 className="text-xl font-bold">Update Note</h2>
                <svg
                  onClick={changeToggle}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <form className="space-y-2 mt-2" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-1">
                  <input
                    className="w-full px-1 py-2 focus:outline-none border border-gray-400 rounded-lg"
                    id="title"
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <p className="text-red-500">{formik.errors.title}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    className="w-full px-1 py-2 focus:outline-none border border-gray-400 rounded-lg"
                    id="content"
                    type="text"
                    placeholder="Content"
                    name="content"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.content && formik.errors.content ? (
                    <p className="text-red-500">{formik.errors.content}</p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="text-center ">
                  <button
                    type="submit"
                    className=" cursor-pointer bg-yellow-400 w-1/2 mx-auto rounded-lg text-white p-2 hover:bg-yellow-600"
                  >
                    Update Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
