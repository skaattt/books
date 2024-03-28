import React, { useRef } from "react";
import { Container, Row } from "reactstrap";

import useAuth from "../custom-hooks/useAuth";
import "../styles/admin-nav.css";

import { motion } from "framer-motion";

import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const admin__nav = [
  {
    display: "Дашборд",
    path: "/dashboard",
  },
  {
    display: "Все книги",
    path: "/dashboard/all-products",
  },
  {
    display: "Заказы",
    path: "/dashboard/orders",
  },
  {
    display: "Пользователи",
    path: "/dashboard/users",
  },
];

const AdminNav = () => {
  const { currentUser } = useAuth();

  const profileActionRef = useRef(null);

  const navigate = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Вы вышли из аккаунта");
        navigate("/home");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const toggleProfileActions = () =>
    profileActionRef.current.classList.toggle("show__profileActions");

  return (
    <>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__nav-wrapper-top">
              <div className="logo">
                <h2><Link to={`/home`}>BookShop</Link></h2>
              </div>

              <div className="admin__nav-top-right">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser && currentUser.photoURL}
                  alt=""
                  onClick={toggleProfileActions}
                />

                <div
                  className="admin__actions"
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  <span onClick={logout}>Выход</span>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>

      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {admin__nav.map((item, index) => (
                  <li className="admin__menu-item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__admin-menu" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;
