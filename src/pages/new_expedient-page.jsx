import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";
import "../styles/new_expedient.css";

const New_Expedient = () => {
  const [date, setDate] = useState(new Date());
  const [numExpedient, setNumExpedient] = useState();
  const [title, setTitle] = useState();
  const [tramitNum, setTramitNum] = useState();
  const [description, setDescription] = useState();
  const { user } = useSelector((state) => state.auth);

  const expediente = {
    user: `${user.name} ${user.lastName}`,
    numExpedient: numExpedient,
    title: title,
    tramitNum: tramitNum,
    description: description,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const { data } = await axios.post(
      //   "http://certificadosfhu.unse.edu.ar:9090/expedientes/pagos/caratular",
      //   expediente
      // );
      console.log(expediente);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="expedient-container">
        <form className="expedient-form" action="" onSubmit={handleSubmit}>
          <label htmlFor="">N° de Expediente</label>
          <input
            type="number"
            className="expedient-input"
            onChange={(e) => setNumExpedient(e.target.value)}
          />
          <label htmlFor="">Titulo o Referencia</label>
          <input
            type="text"
            className="expedient-input"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="">Fecha</label>
          <input
            type="text"
            className="expedient-input"
            defaultValue={date.toLocaleDateString()}
            readOnly
            onChange={(e) => setDate(e.target.value)}
          />
          <label htmlFor="">Usuario</label>
          <input
            type="text"
            className="expedient-input"
            defaultValue={expediente.user}
          />
          <label htmlFor="">N° Tramite</label>
          <input
            type="number"
            className="expedient-input"
            onChange={(e) => setTramitNum(e.target.value)}
          />
          <label htmlFor="">Descripcion</label>
          <textarea
            name="Description"
            id=""
            className="expedient-textarea"
            cols="100"
            rows="20"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit">crear</button>
        </form>
      </div>
    </>
  );
};

export default New_Expedient;
