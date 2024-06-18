import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext.jsx";
import "./Menu.css";

const Menu = () => {
  const { logoutUser, user } = useUserContext();
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  return (
    <Fragment>
      <nav id="GlobalNav">
        <Link to="/" className="pages">
          <img src="../../assets/home.webp" alt="Inicio" className="homeImg" />
        </Link>
        <div>
          <Link to="products" className="pages">
            Productos
          </Link>
          {user ? (
            <Link to="lists" className="pages">
              Listas
            </Link>
          ) : (
            ""
          )}
        </div>
        <div>
          {user ? (
            <>
              <input
                type="button"
                value="Log Out"
                className="pages"
                onClick={() => {
                  handleModal();
                  logoutUser();
                }}
              />
              {user.role == "page_admin" ? (
                <Link to="add" className="pages" id="linkAdmin">
                  Agregar
                </Link>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              <Link to="login" className="pages">
                Log In
              </Link>
              <Link to="register" className="pages">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
      {showModal && (
        <div className="modalOverlay">
          <div className="confirmModal">
            <p>Hasta pronto!</p>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Menu;
