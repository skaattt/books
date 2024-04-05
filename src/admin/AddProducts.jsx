import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";

import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterISBN, setEnterISBN] = useState("");
  const [enterAuthor, setEnterAuthor] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ====== add product to the firebase database =====

    try {
      const docRef = await collection(db, "products");

      const storageRef = ref(
        storage,
        `productImages/${Date.now() + enterProductImg.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

      uploadTask.on(
        () => {
          toast.error("images not uploaded!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(docRef, {
              productName: enterTitle,
              isbn: enterISBN,
              author: enterAuthor,
              description: enterDescription,
              category: enterCategory,
              price: enterPrice,
              imgUrl: downloadURL,
            });
          });
        }
      );
      setLoading(false);
      toast.success("Книга добавлена!");
      navigate("/dashboard/all-products");
    } catch (err) {
      setLoading(false);
      toast.error("Не удалось добавить книгу!");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <h4 className="py-5">Loading.....</h4>
            ) : (
              <>
                <h4 className="mb-5">Добавление новой книги</h4>
                <Form onSubmit={addProduct}>
                  <FormGroup className="form__group">
                    <span>Название книги</span>
                    <input
                      type="text"
                      placeholder="Название книги"
                      value={enterTitle}
                      onChange={(e) => setEnterTitle(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <span>ISBN</span>
                    <input
                      type="text"
                      placeholder="ISBN"
                      value={enterISBN}
                      onChange={(e) => setEnterISBN(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <span>Автор книги</span>
                    <input
                      type="text"
                      placeholder="Автор книги"
                      value={enterAuthor}
                      onChange={(e) => setEnterAuthor(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <span>Аннотация</span>
                    <input
                      type="text"
                      placeholder="Аннотация"
                      value={enterDescription}
                      onChange={(e) => setEnterDescription(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="form__group w-50">
                      <span>Цена</span>
                      <input
                        type="number"
                        placeholder="100 ₽"
                        value={enterPrice}
                        onChange={(e) => setEnterPrice(e.target.value)}
                        required
                      />
                    </FormGroup>

                    <FormGroup className="form__group w-50">
                      <span>Жанр книги</span>
                      <select
                        className="w-100 p-2"
                        value={enterCategory}
                        onChange={(e) => setEnterCategory(e.target.value)}
                      >
                        <option>Выберите жанр</option>
                        <option value="detective">Детектив</option>
                        <option value="foreignLiterature">Зарубежная литература</option>
                        <option value="comics">Комикс</option>
                        <option value="scienceEducation">Наука и образование</option>
                        <option value="poetryDrama">Поэзия и драматургия</option>
                        <option value="prose">Проза</option>
                        <option value="psychology">Психология</option>
                        <option value="novel">Роман</option>
                        <option value="russianLiterature">Русская литература</option>
                        <option value="horrorMysticism">Ужасы, мистика</option>
                        <option value="esotericism">Эзотерика</option>
                      </select>
                    </FormGroup>
                  </div>

                  <div>
                    <FormGroup className="form__group">
                      <span>Изображение</span>
                      <input
                        type="file"
                        onChange={(e) => setEnterProductImg(e.target.files[0])}
                        required
                      />
                    </FormGroup>
                  </div>

                  <button className="buy__btn" type="submit">
                    Добавить книгу
                  </button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
