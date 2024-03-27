import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Helmet from "../components/Helmet/Helmet";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/book-15.png";
import Services from "../services/Services";
import ProductsList from "../components/UI/ProductsList";
import Clock from "../components/UI/Clock";
import counterImg from "../assets/images/Book-PNG-Isolated-Photo.png";

import useGetData from "../custom-hooks/useGetData";

const Home = () => {

  const { data: products, loading } = useGetData("products");

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [detectiveProducts, setDetectiveProducts] = useState([]);
  const [russianLiteratureProducts, setRussianLiteratureProducts] = useState(
    []
  );
  const [popularProducts, setPopularProducts] = useState([]);

  const year = new Date().getFullYear();

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === "novel"
    );

    const filteredBestSalesProducts = products.filter(
      (item) => item.category === "prose"
    );

    const filteredDetectiveProducts = products.filter(
      (item) => item.category === "detective"
    );

    const filteredRussianLiteratureProducts = products.filter(
      (item) => item.category === "russianLiterature"
    );

    const filteredPopularProducts = products.filter(
      (item) => item.category === "psychology"
    );

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setDetectiveProducts(filteredDetectiveProducts);
    setRussianLiteratureProducts(filteredRussianLiteratureProducts);
    setPopularProducts(filteredPopularProducts);
  }, [products]);

  return (
    
    <Helmet title={"Главная"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="4" md="12">
              <div className="hero__img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg="8" md="12">
              <div className="hero__content">
                <p className="hero__subtitle">Новинки {year}</p>
                <h2>Откройте мир новых книг!</h2>
                <p>
                  Пришло время окунуться в мир захватывающих приключений,
                  таинственных загадок и ярких эмоций с нашими новинками книг!
                  Здесь каждый найдет что-то для себя - увлекательные романы,
                  заставляющие забыть о реальности, интригующие детективы,
                  которые держат в напряжении до последней страницы, или
                  познавательные книги, открывающие перед нами тайны природы и
                  человечества. Откройте мир новых книг и окунитесь в него с
                  головой!
                </p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  <Link to="/shop">К покупкам!</Link>
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services />
      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title pb-5">Новые поступления</h2>
            </Col>

            {loading ? (
              <h5 className="fw-bold">Идёт загрузка.....</h5>
            ) : (
              <ProductsList data={trendingProducts} />
            )}
          </Row>
        </Container>
      </section>

      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title pb-5">Лучшие продажи</h2>
            </Col>

            {loading ? (
              <h5 className="fw-bold">Идёт загрузка.....</h5>
            ) : (
              <ProductsList data={bestSalesProducts} />
            )}
          </Row>
        </Container>
      </section>

      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="12" className="count__down-col">
              <div className="clock__top-content">
                <h3 className="text-white fs-6 mb-3">
                  Ограниченные предложения
                </h3>
              </div>
              <Clock />

              <motion.button
                whileTap={{ scale: 1.2 }}
                className="buy__btn store__btn"
              >
                <Link to="/shop">За новыми книгами!</Link>
              </motion.button>
            </Col>

            <Col lg="6" md="12" className="text-end counter__img">
              <img src={counterImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title pb-5">Популярные сейчас</h2>
            </Col>
            {loading ? (
              <h5 className="fw-bold">Идёт загрузка.....</h5>
            ) : (
              <ProductsList data={detectiveProducts} />
            )}
            {loading ? (
              <h5 className="fw-bold">Идёт загрузка.....</h5>
            ) : (
              <ProductsList data={russianLiteratureProducts} />
            )}
          </Row>
        </Container>
      </section>

      <section className="popular__category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title pb-5">Что почитать</h2>
            </Col>
            {loading ? (
              <h5 className="fw-bold">Идёт загрузка.....</h5>
            ) : (
              <ProductsList data={popularProducts} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
