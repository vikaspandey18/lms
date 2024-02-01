import { Form, useNavigation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const form = document.querySelector("form");
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);
  try {
    const response = await axios.post("/api/activity/create-standard", data);
    toast(response.data.msg);
    form.reset();
    return null;
  } catch (error) {
    toast(error.response.data.msg);
    return error;
  }
};

const CreateStandard = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <main id="main">
        <div
          class="breadcrumbs d-flex align-items-center"
          style={{ backgroundImage: `url('assets/img/breadcrumbs-bg.jpg')` }}
        >
          <div
            class="container position-relative d-flex flex-column align-items-center"
            data-aos="fade"
          >
            <h2>Create Standard</h2>
          </div>
        </div>

        <section id="services" class="services section-bg">
          <div class="container" data-aos="fade-up">
            <div class="row gy-4">
              <div
                class="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <Form method="post">
                  <div class="form-group">
                    <label>Create Standard</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Eg. 1,2..,KG"
                    />
                  </div>

                  <div class="form-group">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      {isSubmitting ? "Loading..." : "Submit"}
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default CreateStandard;
