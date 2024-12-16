import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div id="error-page" style={{ textAlign: "center", margin: "auto" }}>
      <h1>Oops!</h1>

      <p>Sorry, an unexpected error has occurred.</p>
      <img
        src="https://i.postimg.cc/0Qd7K85F/Oops-404-Error-with-a-broken-robot-pana.png"
        alt="error"
        width={"300px"}
      />
      <p>
        <i>
          {error.status} - {error.statusText}
        </i>
      </p>
    </div>
  );
}
