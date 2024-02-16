import { onLoad } from "../store/load";
import { useDispatch } from "react-redux";

const loading = () => {
  const dispatch = useDispatch();
  setTimeout(() => {
    dispatch(onLoad(false));
  }, 1000);
};

export default loading;
