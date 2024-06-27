import React, { useState } from "react";

import useUsers from "../hooks/useUsers";

import { setSearch } from "../store/search";

import { Form, InputGroup } from "react-bootstrap";

import { FaSearch } from "react-icons/fa";

import "../styles/makePass.css";
import { useDispatch, useSelector } from "react-redux";

const SearchUser = () => {
  const [showResults, setShowResults] = useState(false);

  const { searchUser } = useUsers();
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    dispatch(setSearch(e.target.value));
    await searchUser();
    setShowResults(true);
  };

  return (
    <div className="container-searchUser">
      <InputGroup className="mb-3" style={{ position: "relative" }}>
        <Form.Control
          type="search"
          placeholder="Buscar"
          aria-label="Search"
          onChange={handleSearch}
          onBlur={() => setShowResults(false)}
          style={{
            borderColor: "rgb(188, 191, 194)",
            borderStyle: "solid",
            borderWidth: "1px",
          }}
        />
        <InputGroup.Text id="basic-addon1">
          <FaSearch />
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
};

export default SearchUser;
