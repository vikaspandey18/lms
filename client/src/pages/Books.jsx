import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const response = await axios.get("/api/activity/get-all-book");
    const allbooks = response.data.book;
    return allbooks;
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const Books = () => {
  const allbooks = useLoaderData();
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
            <h2>Books</h2>
          </div>
        </div>

        <section id="blog" class="blog">
          <div class="container" data-aos="fade-up" data-aos-delay="100">
            <div class="row gy-4 posts-list">
              {allbooks.map((book) => (
                <div class="col-xl-3 col-md-3">
                  <div class="post-item position-relative h-100">
                    <div class="post-img position-relative overflow-hidden">
                      <Link to={`/access-books/${book._id}`}>
                        <img
                          src={`http://localhost:5000/book/${book.image}`}
                          class="img-fluid rounded"
                          alt={`${book.title}`}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default Books;
