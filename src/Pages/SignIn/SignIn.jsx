import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { sendDataToSigninPage } from "../../Services/signinServices";
import { useContext } from "react";
import { TokenContext } from "../../Context/Token-Context";
import Login from '../../assets/undraw_fingerprint-login_19qv.svg'

let schema = yup.object({
  email: yup.string().required("email is required").email(),
  password: yup.string().required("password is required"),
});

export default function SignIn() {
  let { setToken} = useContext(TokenContext)

  let navigate = useNavigate();

  async function handleSignin(values) {
    let toastId = toast.loading('loading....')
    try {
      let response = await sendDataToSigninPage(values);
      if (response.data.msg == "done") {
        toast.dismiss(toastId)
        setToken(response.data.token)
        localStorage.setItem("token" , response.data.token)
        toast.success(response.data.msg);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      toast.dismiss(toastId)
      toast.error("error...");
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",

    },
    onSubmit: handleSignin,
    validationSchema: schema,
  });

  return (
    <>
      <section className=" container mx-auto my-5 grid lg:grid-cols-3 items-center ">
        <div className="p-5 hidden lg:block">
          <img className="w-full object-cover" src={Login} alt="" />
        </div>
        <div className=" col-span-2 space-y-3 shadow-2xl p-4 md:p-8 w-[65%]  md:w-1/2 mx-auto">
          <h2 className="text-2xl font-bold text-center ">SignIn</h2>
          <form className="space-y-2" onSubmit={formik.handleSubmit}>
          
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
  
            <div className="text-center mt-5">
              <button
                type="submit"
                className=" cursor-pointer bg-violet-400 w-1/2 mx-auto rounded-lg text-white p-2 hover:bg-violet-700 "
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
