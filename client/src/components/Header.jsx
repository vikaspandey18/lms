import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const logoutHandler = async (event) => {
    event.preventDefault();
    navigate("/login");
    const response = await axios.get("/api/auth/logout");
    toast.success(response.data.msg);
  };

  return (
    <>
      <header id="header" class="header d-flex align-items-center">
        <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
          <a href="/home" class="logo d-flex align-items-center">
            <h1>
              LMS<span>.</span>
            </h1>
          </a>

          <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
          <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
          <nav id="navbar" class="navbar">
            <ul>
              <li>
                <NavLink to="/home">Home</NavLink>
              </li>
              <li>
                <NavLink to="/">Standard</NavLink>
              </li>
              <li>
                <NavLink to="/books">Books</NavLink>
              </li>
              <li class="dropdown">
                <a href="#">
                  <span>Account</span>{" "}
                  <i class="bi bi-chevron-down dropdown-indicator"></i>
                </a>
                <ul>
                  <li>
                    <Link href="/login">Login Page</Link>
                  </li>
                  <li>
                    <Link href="/register">Register Page</Link>
                  </li>
                  <li>
                    <Link href="/create-standard">Create Standard</Link>
                  </li>
                  <li>
                    <Link href="/create-book">Create Book</Link>
                  </li>
                  <li>
                    <Link href="/create-access-code">Create Access Code</Link>
                  </li>
                  <li>
                    <Link href="#" onClick={logoutHandler}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
export default Header;
