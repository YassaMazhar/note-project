import { useFormik } from "formik";
import { sendDataToSignUpPage } from "../../Services/signupServices";
import * as yup from "yup";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import Register from '../../assets/undraw_sign-up_qamz.svg'
let schema = yup.object({
  name: yup.string().required("the name is required"),
  email: yup.string().required("email is required").email(),
  password: yup.string().required("password is required"),
  age: yup.string().required("age is required"),
  phone: yup.string().required("phone is required"),
});

export default function SignUp() {
  let navigate = useNavigate();

  async function handleSignUp(values) {
    let toastId = toast.loading("loading....");
    try {
      let response = await sendDataToSignUpPage(values);
      if (response.msg == "done") {
        toast.dismiss(toastId);

        toast.success(response.msg);
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("error...");
    }
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    onSubmit: handleSignUp,
    validationSchema: schema,
  });

  return (
    <>
      <section className="container mx-auto my-5 grid lg:grid-cols-3 items-center ">
        <div className="p-5 hidden lg:block">
          <img className="w-full object-cover" src={Register} alt="" />
        </div>
        <div className="col-span-2 space-y-3 shadow-2xl p-4 md:p-8 w-[65%]  md:w-1/2 mx-auto">
          <h2 className="text-2xl font-bold text-center ">SignUp</h2>
          <form className="space-y-2" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name: </label>
              <input
                className="w-full px-1 py-2 focus:outline-none border border-gray-400 rounded-lg"
                id="name"
                type="text"
                placeholder="Enter Your Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="text-red-500">{formik.errors.name}</p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email: </label>
              <input
                className="w-full px-1 py-2 focus:outline-none border border-gray-400 rounded-lg"
                id="email"
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500">{formik.errors.email}</p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password: </label>
              <input
                className="w-full px-1 py-2 focus:outline-none border border-gray-400 rounded-lg"
                id="password"
                type="password"
                placeholder="Enter strong Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500">{formik.errors.password}</p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="age">Age: </label>
              <input
                className="w-full px-1 py-2 focus:outline-none border border-gray-400 rounded-lg"
                id="age"
                type="number"
                placeholder="Enter Your age"
                name="age"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.age && formik.errors.age ? (
                <p className="text-red-500">{formik.errors.age}</p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="phone">Phone: </label>
              <input
                className="w-full px-1 py-2 focus:outline-none border border-gray-400 rounded-lg"
                id="Phone"
                type="tel"
                placeholder="Enter Your phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <p className="text-red-500">{formik.errors.phone}</p>
              ) : (
                ""
              )}
            </div>
            <div className="text-center mt-5">
              <button
                type="submit"
                className=" cursor-pointer bg-violet-400 w-1/2 mx-auto rounded-lg text-white p-2 hover:bg-violet-700 "
              >
                SignUp
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
