import React, { useEffect, useState } from "react";
import { addNote, getNote } from "../../Services/noteservices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import * as yup from "yup";
import { TokenContext } from "../../Context/Token-Context";
import toast from "react-hot-toast";
import Note from "../../components/Note/Note";

let schema = yup.object({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});

export default function Home() {
  let [notes, setNotes] = useState(null);
  let [toggle, setToggle] = useState(false);

  function changeToggle() {
    setToggle(!toggle);
  }

  // ^ function add Notes
  async function addNoteHandle(values) {
    try {
      let { data } = await addNote(values);
      if (data.msg == "done") {
        toast.success("A new note has been added.");
        getNoteHandle();
        changeToggle();
      }
      formik.values.title = "";
      formik.values.content = "";
    } catch (error) {
      toast.error("error..");
    }
  }
  // ^ function display Notes
  async function getNoteHandle() {
    try {
      let { data } = await getNote();
      if (data.msg == "done") {
        setNotes(data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  }

  
  useEffect(() => {

      getNoteHandle();

  }, []);

  let formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: addNoteHandle,
    validationSchema: schema,
  });


  return (
    <>
      <section className=" px-16 py-8 my-2 p-5 ">
        <div className="flex items-center justify-between ">
          <h2 className=" uppercase text-2xl font-bold">my notes</h2>
          <button
            className="bg-violet-400  text-xl font-semibold text-white rounded-md py-2 px-4 cursor-pointer"
            onClick={changeToggle}
          >
           + Add Note
          </button>
        </div>
        {notes == null ? (
          <h1 className="text-2xl font-bold">There are no notes...</h1>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
            {notes?.map((note) => (
              <Note
                key={note._id}
                noteInfo={note}
                getNoteHandle={getNoteHandle}
                notes={notes}
                setNotes={setNotes}
              />
            ))}
          </div>
        )}
      </section>
      {toggle ? (
        <div className="z-10 absolute inset-0 top-5">
          <div className="border-2 bg-white border-violet-200 shadow-2xl p-4 w-[70%]  sm:w-1/2 lg:w-1/4 mx-auto mt-12">
          <div className=" *:size-5  *:rounded-full flex gap-2 items-center">
            <div className="bg-red-500"></div>
            <div className="bg-yellow-500"></div>
            <div className="bg-green-500"> </div>
          </div>
            <div className="flex items-center justify-between border-b border-gray-400/50 py-2  ">
              <h2 className="text-xl font-bold">New Note</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 cursor-pointer"
                onClick={changeToggle}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <form className="space-y-2  mt-2" onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-1">
                <input
                  className="w-full px-1 py-2 focus:outline-none border border-gray-400 rounded-lg "
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
                  className=" cursor-pointer bg-violet-400 w-1/2 mx-auto rounded-lg text-white p-2 hover:bg-violet-600 "
                >
                  Add Note
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
