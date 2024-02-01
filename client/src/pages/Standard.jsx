import { Form, useActionData } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ProjectView from "./ProjectView";

export const action = async ({ request }) => {
  const form = document.querySelector("form");
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);

  try {
    const response = await axios.post("/api/activity/get-book", data);
    const userdata = response.data.books;
    form.reset();
    return userdata;
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const Standard = () => {
  const [standards, setStandards] = useState([]);
  const [books, setBooks] = useState([]);
  const book = useActionData();

  useEffect(() => {
    axios
      .get("/api/activity/get-all-standard")
      .then((response) => setStandards(response.data.standard))
      .catch((error) => toast.error(error.response.data.msg));
  }, []);

  useEffect(() => {
    axios
      .get("/api/activity/get-all-book")
      .then((response) => setBooks(response.data.book))
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
            <h2>Standard</h2>
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
                    <label>Select Standard</label>
                    <select className="form-control" name="standard">
                      <option value="">Select Standard</option>
                      {standards &&
                        standards.map((standard) => (
                          <option key={standard._id} value={standard._id}>
                            {standard.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Select Book</label>
                    <select className="form-control" name="book">
                      <option value="">Select Book </option>
                      {books &&
                        books.map((book) => (
                          <option key={book._id} value={book._id}>
                            {book.title}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div class="form-group">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </Form>
              </div>
              <div class=" col-md-4" data-aos="fade-up" data-aos-delay="100">
                {book && <ProjectView book={book} />}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default Standard;
