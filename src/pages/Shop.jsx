import React, { useState } from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";

import "../styles/shop.css";

//import products from "../assets/data/products";
import ProductsList from "../components/UI/ProductsList";
import useGetData from "../custom-hooks/useGetData";

const Shop = () => {
  const { data: products } = useGetData("products");
  //const [productsData, setProductsData] = useState([]);

  const [value, setValue] = useState("");

  const searchedProducts = products.filter((item) => {
    return item.productName.toLowerCase().includes(value.toLowerCase());
  });

  /*const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "novel") {
      const filteredProducts = products.filter(
        (item) => item.category === "novel"
      );
      setProductsData(filteredProducts);
    }

    if (filterValue === "prose") {
      const filteredProducts = products.filter(
        (item) => item.category === "prose"
      );
      setProductsData(filteredProducts);
    }
  };*/

  /*const handleSearch = (e) => {
    const searchTerm = e.target.value;

    const searchedProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setProductsData(searchedProducts);
  };*/

  return (
    <Helmet title="Каталог">
      <CommonSection title="Наши книги"></CommonSection>

      <section>
        <Container>
          <Row>
            <Col lg="12" md="12">
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Поиск....."
                  onChange={(event) => setValue(event.target.value)}
                />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
            {searchedProducts.length === 0 ? (
              <h1 className="text-center fs-4">Такой книги у нас нет</h1>
            ) : (
              <ProductsList data={searchedProducts} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
