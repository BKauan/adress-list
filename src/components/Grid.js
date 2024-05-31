import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit, FaHouseUser } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
  display: flex;
  flex-direction: column;
`;

export const Thead = styled.thead`
  border-bottom: inset;
`;

export const Tbody = styled.tbody`
  width: 21em;
  height: 5em;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
  position: relative;
  display: flex;
`;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  padding-bottom: 5px;
  width: 8.4em;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
  
  overflow: hidden; 
  text-overflow: ellipsis; 
  white-space: nowrap; 
  flex: 1;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ addresses, setAddresses, setOnEdit, setButtonForm, selectedAddress, setSelectedAddress }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
    setButtonForm(true);
    setSelectedAddress(item); 
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = addresses.filter((address) => address.id !== id);
        setAddresses(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      {addresses.map((item, i) => (
        <Tbody
          key={i}
          style={{ backgroundColor: item.id === selectedAddress?.id ? '#f0e7e7' : 'transparent' }}
        >
          <Td id="item-name" width="33%"><FaHouseUser />{item.name}</Td>
          <Td id="item-code" width="50%">Cod. Endereço: {item.code}</Td>
          <Td id="edit-button" width="5%">
            <FaEdit cursor="pointer" onClick={() => handleEdit(item)} />
          </Td>
          <Td id="delete-button" width="5%">
            <FaTrash cursor="pointer" onClick={() => handleDelete(item.id)} />
          </Td>
        </Tbody>
      ))}
    </Table>
  );
};

export default Grid;
