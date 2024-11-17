import "./cliente.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clienteActual,
  setAbogado,
} from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Cliente = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const cliente = useSelector((state) => state.cliente);
  const source = useSelector((state) => state.source);
  const cedula =
    source === "abogado"
      ? props.cliente.cedulaAbogado
      : props.cliente.cedulaCliente;

  const onClickDetail = () => {
    if (source === "cliente") {
      dispatch(clienteActual(props.cliente));
      window.localStorage.setItem("cliente", JSON.stringify(props.cliente));
      navigate("/detail");
    } else {
      window.localStorage.setItem("abogado", JSON.stringify(props.cliente));
      dispatch(setAbogado(props.cliente));
      navigate("/detail");
    }
  };

  return (
    <div className="cardcliente" key={cedula}>
      <Link to={"/detail"} onClick={onClickDetail} className="link">
        <h1 className="titulocard">
          {props.cliente.nombres.toUpperCase()}{" "}
          {props.cliente.apellidos.toUpperCase()}
        </h1>
      </Link>
    </div>
  );
};
Cliente.propTypes = {
  cliente: PropTypes.shape({
    cedulaAbogado: PropTypes.string,
    cedulaCliente: PropTypes.string,
    nombres: PropTypes.string.isRequired,
    apellidos: PropTypes.string.isRequired,
  }).isRequired,
};

export default Cliente;