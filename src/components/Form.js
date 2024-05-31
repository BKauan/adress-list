import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  justify-content: center;
`;

const Title = styled.h2`
   margin: 10px 0;
`;

const Fbody = styled.div`
    position: relative;
    padding: 32px;
    width: 100%;
    height: 28vh;
    max-width: 640px;
    background-color: #f0e7e7;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

const InputArea = styled.div`
`;

const Input = styled.input`
  display: block;
  width: 280px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #451804;
  opacity: 0.5;
  color: white;
  height: 42px;
  margin-top: 1.8em;

  &:hover{
    opacity: 1;
    }
`;

const Form = ({ buttonFormExit, getAddresses, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const address = ref.current;

            address.name.value = onEdit.name;
            address.code.value = onEdit.code;
        }
    }, [onEdit]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const address = ref.current;

        if (!address.name.value || !address.code.value) {
            return toast.warn("Preencha todos os campos!");
        }

        try {
            if (onEdit) {
                const response = await axios.put("http://localhost:8800/" + onEdit.id, {
                    name: address.name.value,
                    code: address.code.value,
                });
                toast.success(response.data);
            } else {
                const response = await axios.post("http://localhost:8800", {
                    name: address.name.value,
                    code: address.code.value,
                });
                toast.success(response.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data); 
            } else {
                toast.error("Ocorreu um erro ao criar o usuário.");
            }
        }

        address.name.value = "";
        address.code.value = "";

        setOnEdit(null);
        getAddresses();
        buttonFormExit();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <Fbody>
                <Title>ADICIONE UM NOVO ENDEREÇO</Title>
                <InputArea>
                    <Label>Nome</Label>
                    <Input name="name" />
                </InputArea>
                <InputArea>
                    <Label>Cod Endereço</Label>
                    <Input name="code" maxLength="4" />
                </InputArea>

                <Button id="form-btn" type="submit">SALVAR</Button>
            </Fbody>
        </FormContainer>
    )
};

export default Form;