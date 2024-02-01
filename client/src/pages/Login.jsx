import FormInput from "../components/FormInput";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const action = async ({ request }) => {
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);
  try {
    const response = await axios.post("/api/auth/login", data);
    toast(response.data.msg);
    return redirect("/");
  } catch (error) {
    toast(error.response.data.msg);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <main id="main">
        <section
          id="get-started"
          class="get-started section-bg"
          style={{ height: "100vh" }}
        >
          <div class="container">
            <div class="row justify-content-between gy-4">
              <div class="col-lg-3 col-sm-3"></div>

              <div class="col-lg-6 col-sm-6" data-aos="fade">
                <Form method="post" class="php-email-form">
                  <h4 className="text-center">Login</h4>
                  <div class="row gy-3">
                    <FormInput
                      type={`email`}
                      name="email"
                      placeholder="Enter your Email"
                    />

                    <FormInput
                      type={`password`}
                      name="password"
                      placeholder="Enter your Password"
                    />

                    <div class="col-md-12 text-center">
                      <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Loading..." : "Sing In"}
                      </button>
                    </div>
                    <div className="col-md-12">
                      <p className="text-center">
                        Don't have an account ?
                        <Link to={`/register`} className="text-danger">
                          {" "}
                          Register
                        </Link>
                      </p>
                    </div>
                  </div>
                </Form>
              </div>

              <div class="col-lg-3 col-sm-3"></div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default Login;
