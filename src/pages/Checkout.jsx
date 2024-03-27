import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/checkout.css";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [home, setHome] = useState("");
  const [flat, setFlat] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const navigate = useNavigate();

  const addOrder = async () => {
    const docRef = await addDoc(collection(db, "orders"), {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      city: city,
      street: street,
      home: home,
      flat: flat,
      postalCode: postalCode,
      totalQty: totalQty,
      totalAmount: totalAmount,
    });
    toast.success("Заказ сделан успешно!");
    navigate("/home");
  };

  return (
    <Helmet title="Оформление заказа">
      <CommonSection title="Оформление заказа" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Информация для оформления заказа</h6>
              <Form onSubmit={addOrder} className="billing__form">
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="email"
                    placeholder="Ваш email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="number"
                    placeholder="Номер телефона"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Город"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Улица"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="number"
                    placeholder="Дом"
                    value={home}
                    onChange={(e) => setHome(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="number"
                    placeholder="Квартира"
                    value={flat}
                    onChange={(e) => setFlat(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="number"
                    placeholder="Почтовый индекс"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  />
                </FormGroup>
              </Form>
            </Col>

            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Всего: <span>{totalQty} шт</span>
                </h6>
                <h6>
                  На сумму: <span>{totalAmount} ₽</span>
                </h6>
                <h6>
                  <span>
                    Доставка: <br />
                    бесплатная доставка
                  </span>
                  <span>0 ₽</span>
                </h6>
                <h4>
                  Итого: <span>{totalAmount} ₽</span>
                </h4>
                <button
                  onClick={addOrder}
                  type="submit"
                  className="buy__btn auth__btn w-100"
                >
                  Заказать
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
