import axios from "axios";
import { toast } from "react-toastify";
import ProjectView from "./ProjectView";
import { useLoaderData } from "react-router-dom";

export const loader = async ({ params }) => {
  const { id } = params;
  try {
    const response = await axios.get(`/api/activity/get-book/${id}`);
    const book = response.data.book;
    console.log(book);
    return book;
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const BookView = () => {
  const book = useLoaderData();
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
            <h2>Book View</h2>
          </div>
        </div>

        <section id="services" class="services section-bg">
          <div class="container" data-aos="fade-up">
            <div class="row gy-4">
              <div
                class="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay="100"
              ></div>
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
export default BookView;
