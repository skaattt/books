import React from "react";
import { Container, Row, Col } from "reactstrap";
import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import useGetData from "../custom-hooks/useGetData";
import { toast } from "react-toastify";

const Orders = () => {
  const { data: ordersData, loading } = useGetData("orders");

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "orders", id));
    toast.success("Удалено!");
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Пользователь</th>
                  <th>Email</th>
                  <th>Номер телефона</th>
                  <th>Почтовый индекс</th>
                  <th>Адрес</th>
                  <th>ISBN</th>
                  <th>Итого</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <h3 className="py-5 text-center fw-bold">
                    Идёт загрузка.....
                  </h3>
                ) : (
                  ordersData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.postalCode}</td>
                      <td>
                        {item.city}, {item.street}, {item.home}, {item.flat}
                      </td>
                      <td>{item.isbn}</td>
                      <td>{item.totalAmount} ₽</td>
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

export default Orders;
