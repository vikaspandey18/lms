import {
  Form,
  Link,
  redirect,
  useNavigation,
  useParams,
} from "react-router-dom";
import FormInput from "../components/FormInput";
import { toast } from "react-toastify";
import axios from "axios";

export const loader = async ({ params }) => {
  const { id } = params;
  try {
    const response = await axios.get(`/api/activity/accesscode/${id}`);
    const getbook = response.data.getbook;
    // console.log(getbook);
    // return getbook;
    return redirect(`/bookview/${getbook.bookid}`);
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

export const action = async ({ request, params }) => {
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);
  try {
    const response = await axios.post("/api/activity/accesscode", data);
    toast.success(response.data.msg);
    return redirect(`/bookview/${params.id}`);
    // return null;
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const AccessBook = () => {
  const { id } = useParams();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <main id="main">
        <div
          class="breadcrumbs d-flex align-items-center"
          style={{ backgroundImage: `url('/assets/img/breadcrumbs-bg.jpg')` }}
        >
          <div
            class="container position-relative d-flex flex-column align-items-center"
            data-aos="fade"
          >
            <h2>Access Book</h2>
          </div>
        </div>

        <section id="get-started" class="get-started section-bg">
          <div class="container">
            <div class="row justify-content-between gy-4">
              <div class="col-lg-3 col-sm-3"></div>

              <div class="col-lg-6 col-sm-6" data-aos="fade">
                <Form method="post" class="php-email-form">
                  <div class="row gy-3">
                    <FormInput
                      type={`text`}
                      name="code"
                      placeholder="Enter Book Access Code"
                    />
                    <input type="hidden" name="bookid" value={id} />

                    <div class="col-md-12 text-center">
                      <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Loading..." : "Submit Access Code"}
                      </button>
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
export default AccessBook;
