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
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    if (searchTerm.trim() === "") {
      setShowResults(false);
    } else {
      searchUser(searchTerm, setSearchResults);
      setShowResults(true);
    }
  };
  const handleUserSelect = ({ user }) => {
    setUserReceiver(user);
    setShowResults(false);
  };

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

      {showResults && searchResults.length > 0 && (
        <Table responsive striped bordered hover id="table-data">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Área</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((usuario, index) => (
              <tr key={index} onClick={() => handleUserSelect(usuario)}>
                <td>{`${usuario.nombre} ${usuario.apellido}`}</td>
                <td>{usuario.area.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default TuComponente;
