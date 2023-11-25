const decodeToken = (token) => {
  const data = JSON.parse(atob(token.slice(7).split(".")[1]));

  return data;
};

export default decodeToken;
