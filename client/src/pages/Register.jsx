import axios from "axios";
import FormInput from "../components/FormInput";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);
  try {
    const response = await axios.post("/api/auth/register", data);
    toast(response.data.msg);
    return redirect("/login");
  } catch (error) {
    toast(error.response.data.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <main id="main">
        <section id="get-started" class="get-started section-bg">
          <div class="container">
            <div class="row justify-content-between gy-4">
              <div class="col-lg-3 col-sm-3"></div>

              <div class="col-lg-6 col-sm-6" data-aos="fade">
                <Form method="post" class="php-email-form">
                  <h4 className="text-center">Register</h4>
                  <div class="row gy-3">
                    <FormInput
                      type={`text`}
                      name={`name`}
                      placeholder={`Enter your Name`}
                    />
                    <FormInput
                      type={`email`}
                      name={`email`}
                      placeholder={`Enter your Email`}
                    />
                    <FormInput
                      type={`number`}
                      name={`mobile`}
                      placeholder={`Enter your Mobile`}
                    />
                    <FormInput
                      type={`password`}
                      name={`password`}
                      placeholder={`Enter your Password`}
                    />
                    <FormInput
                      type={`password`}
                      name={`confirmpassword`}
                      placeholder={`Enter Confirm Password`}
                    />

                    <div class="col-md-12 text-center">
                      <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Loading..." : "Register"}
                      </button>
                    </div>
                    <div className="col-md-12">
                      <p className="text-center">
                        Already have an account ?{" "}
                        <Link to={`/login`} className="text-danger">
                          Login
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
export default Register;
