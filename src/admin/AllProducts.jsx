import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import useGetData from "../custom-hooks/useGetData";
import { toast } from "react-toastify";

const AllProducts = () => {
  const { data: productsData, loading } = useGetData("products");

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    toast.success("Удалено!");
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <motion.button whileTap={{ scale: 1.2 }} className="buy__btn mb-3">
              <Link to="/dashboard/add-product">Добавить новую книгу</Link>
            </motion.button>
          </Col>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Изображение</th>
                  <th>Наименование</th>
                  <th>ISBN</th>
                  <th>Жанр</th>
                  <th>Цена</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <h3 className="py-5 text-center fw-bold">Идёт загрузка.....</h3>
                ) : (
                  productsData.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.imgUrl} alt="" />
                      </td>
                      <td>{item.productName}</td>
                      <td>{item.isbn}</td>
                      <td>{item.category}</td>
                      <td>{item.price} ₽</td>
                      <td>
                        <button
                          onClick={() => {
                            deleteProduct(item.id);
                          }}
                          className="btn btn-danger"
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
