import React, { useState } from "react";

import { Form, Table, InputGroup } from "react-bootstrap";

import { FaSearch } from "react-icons/fa";

import useUsers from "../hooks/useUsers";

const TuComponente = ({ setUserReceiver }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const { searchUser } = useUsers();

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (search.trim() === "") {
      setShowResults(false);
    } else {
      searchUser(search, setSearchResults);
      setShowResults(true);
    }
  };

  const handleUserSelect = (user) => {
    setUserReceiver(user);
    // setShowResults(false);
  };

  // useEffect(() => {
  //   console.log(selectedUser, "soy yo");
  // }, [selectedUser]);

  return (
    <div>
      <InputGroup className="mb-3" style={{ position: "relative" }}>
        <Form.Control
          type="search"
          placeholder="Buscar"
          aria-label="Search"
          onChange={handleSearch}
          onBlur={() => setShowResults(false)}
        />
        <InputGroup.Text id="basic-addon1">
          <FaSearch />
        </InputGroup.Text>
      </InputGroup>

      <Table responsive striped bordered hover id="table-data">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Área</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((usuario, index) => (
            <tr key={index}>
              <td>{`${usuario.nombre} ${usuario.apellido}`}</td>
              <td>{usuario.area.descripcion}</td>

              <td>
                <Form.Check
                  type="radio"
                  id={`custom-switch-${index}`}
                  name="userSelection"
                  value={usuario.id}
                  onChange={(e) => {
                    const userSelected = {
                      id: e.target.value,
                      nombre: usuario.nombre,
                      apellido: usuario.apellido,
                    };
                    handleUserSelect(userSelected);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TuComponente;
