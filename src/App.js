import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const Title = styled.h1``;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #c1440e;
  opacity: 0.5;
  color: #fff;
  border: none;
  border-radius: 8px;
  text-align: center;
  margin: 20px 0;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

function App() {
  const [addresses, setAddresses] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [buttonForm, setButtonForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleModal = () => {
    setButtonForm((prev) => !prev);
  };

  const getAddresses = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      const sortedAddresses = res.data.sort((a, b) => (a.name > b.name ? 1 : -1));
      setAddresses(sortedAddresses);
      if (sortedAddresses.length > 0) {
        setSelectedAddress(sortedAddresses[0]); // Define o primeiro item como selecionado por padrão
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getAddresses();
  }, []);

  return (
    <>
      <Container>
        <Title>MEUS ENDEREÇOS</Title>
        <Button onClick={handleModal}>+ Adicione um Endereço</Button>
        <Grid
          setOnEdit={setOnEdit}
          addresses={addresses}
          setAddresses={setAddresses}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          setButtonForm={setButtonForm}
        />
        {buttonForm ? (
          <Form
            onEdit={onEdit}
            setOnEdit={setOnEdit}
            getAddresses={getAddresses}
            trigger={buttonForm}
            buttonFormExit={handleModal}
          />
        ) : null}
      </Container>
      <ToastContainer autoClose={3000} position="bottom-right" />
      <GlobalStyle />
    </>
  );
}

export default App;