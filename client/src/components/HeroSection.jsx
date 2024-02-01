import { Link } from "react-router-dom";

const HeroSection = ({ user }) => {
  const { name } = user;
  return (
    <>
      <section id="hero" class="hero">
        <div class="info d-flex align-items-center">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-6 text-center">
                <h2 data-aos="fade-down">
                  Welcome to <span>LMS</span>
                </h2>
                {name ? (
                  <Link
                    data-aos="fade-up"
                    data-aos-delay="200"
                    to="/"
                    class="btn-get-started"
                  >
                    Let's Start
                  </Link>
                ) : (
                  <Link
                    data-aos="fade-up"
                    data-aos-delay="200"
                    to="/login"
                    class="btn-get-started"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          id="hero-carousel"
          class="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="5000"
        >
          <div
            class="carousel-item active"
            style={{
              backgroundImage: `url(
                "/assets/img/hero-carousel/3784896.jpg"
              )`,
            }}
          ></div>
        </div>
      </section>
    </>
  );
};
export default HeroSection;
