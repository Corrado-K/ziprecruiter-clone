import Container from "../../components/client/Container";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../../schema/index";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AxiosError } from "axios";

export const LoginPage = () => {
     const { login } = useContext(AuthContext);

     const formik = useFormik({
          initialValues: {
               email: "",
               password: "",
          },
          onSubmit: async (values) => {
               try {
                    await login(values.email, values.password);
               } catch (error) {
                    const { response } = error as AxiosError<{
                         message: string;
                    }>;
               }
          },
          validationSchema: loginSchema,
     });

     return (
          <Container>
               <div className="flex justify-center items-center h-[90vh]">
                    <div className="bg-white flex flex-col items-center min-w-[40%] pt-10 pb-8 shadow-lg rounded-md">
                         <h2 className="text-3xl font-medium mb-8">Sign In</h2>

                         <div className="flex space-x-7 mb-10">
                              <div className="flex flex-col items-center">
                                   <span className="flex text-sm font-medium">
                                        I'm an employer
                                   </span>
                                   <span className="bg-[#277f6a] w-32 h-1 mt-3 rounded-t-md"></span>
                              </div>
                              <div className="flex flex-col items-center">
                                   <span className="flex text-sm font-medium">
                                        I'm an job seeker
                                   </span>
                                   <span className="bg-[#277f6a] w-32 h-1 mt-3 rounded-t-md"></span>
                              </div>
                         </div>

                         <div className="w-[90%] border rounded-full py-5 px-10">
                              <p className="font-medium text-center ">
                                   Please choose either
                              </p>
                         </div>

                         <div className="my-8 border w-[90%]"></div>

                         {/* form */}
                         <form
                              className="w-full flex flex-col items-center"
                              onSubmit={formik.handleSubmit}
                         >
                              <div className="flex flex-col space-y-3 w-[90%]">
                                   <input
                                        type="email"
                                        className="py-3 px-5 bg-transparent border"
                                        placeholder="Email Address"
                                        name="email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                   />
                                   <input
                                        type="password"
                                        className="py-3 px-5 bg-transparent border"
                                        placeholder="Password"
                                        name="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                   />
                              </div>

                              <span className="text-right w-[90%] mt-5 text-sm text-sky-400">
                                   Forgot Password?
                              </span>

                              <button
                                   type="submit"
                                   className="w-[90%] p-3 mt-5 bg-[#277f6a] rounded-full font-bold text-white"
                              >
                                   Sign In
                              </button>
                              {/* End form */}
                         </form>

                         <p className={`flex space-x-2 text-xs mt-5`}>
                              <span>New to ZipRecruiter?</span>
                              <Link to={"/register"}>
                                   <span className="text-sky-400">
                                        Create a new account
                                   </span>
                              </Link>
                         </p>
                    </div>
               </div>
          </Container>
     );
};
