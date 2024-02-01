import { Form, useNavigation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export const action = async ({ request }) => {
  const form = document.querySelector("form");
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);
  try {
    const response = await axios.post("/api/activity/create-book", formdata);
    toast(response.data.msg);
    form.reset();
    return null;
  } catch (error) {
    toast(error.response.data.msg);
    return error;
  }
};

const CreateBook = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [standards, setStandards] = useState([]);

  useEffect(() => {
    axios
      .get("/api/activity/get-all-standard")
      .then((response) => setStandards(response.data.standard))
      .catch((error) => toast.error(error.response.data.msg));
  }, []);

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
            <h2>Create Book</h2>
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
                <Form method="post" encType="multipart/form-data">
                  <div class="form-group">
                    <label>Select Standard</label>
                    <select className="form-control" name="standard" required>
                      <option value="">Select Standard</option>
                      {standards &&
                        standards.map((standard) => (
                          <option value={standard._id}>{standard.name}</option>
                        ))}
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Book Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="Enter Book Title"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label>Book Font Image</label>
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label>Book PPT</label>
                    <input
                      type="file"
                      name="ppt"
                      className="form-control"
                      required
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
export default CreateBook;
