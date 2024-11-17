import { useState } from "react";
import "../../App.css";
import "./crearusuario.css";
import logo from "../../img/LOGO.jpg";
import { Button } from "../Mystyles";
import { Link } from "react-router-dom";
import { crearUsuario } from "../../handlers/crearUsuario";
import { useNavigate } from "react-router-dom";
import { registroCliente } from "../../handlers/registroCliente";
import { registroAbogado } from "../../handlers/registroAbogado";
import { codigoCiudades } from "../../utils/codigoCiudades";

const CrearUsuario = () => {
  const [userDataCrear, setUserDataCrear] = useState({
    email: "",
    password: "",
    nombres: "",
    apellidos: "",
    cedula: "",
    cedulaCliente: "",
    cedulaAbogado: "",
    celular: "",
    direccion: "",
    nombre_ciudad: "",
    tipoUsuario: "cliente",
  });

  const initCiudadFilt = {
    ciudades: [],
  };

  const [ciudadFilt, setCiudadFilt] = useState(initCiudadFilt);
  const navigate = useNavigate();

  const handleChangeCrear = (e) => {
    setUserDataCrear({
      ...userDataCrear,
      [e.target.name]: e.target.value, // Sintaxis ES6 para actualizar la key correspondiente
    });
  };

  const handleCiudadChange = (e) => {
    e.preventDefault();

    setUserDataCrear({
      ...userDataCrear,
      [e.target.name]: e.target.value,
    });

    const foundCiudad = codigoCiudades.filter((ciudad) =>
      ciudad.nombre_ciudad.toUpperCase().includes(e.target.value.toUpperCase())
    );
    //console.log("Acreedores encontrados:", foundAcreedor);
    setCiudadFilt(foundCiudad);
  };

  const submitHandlerCrear = (e) => {
    e.preventDefault();
    crearUsuario(userDataCrear);
    //console.log("Datos crear usuario:", userDataCrear);

    if (userDataCrear.tipoUsuario === "cliente") {
      registroCliente({
        ...userDataCrear,
        cedulaCliente: userDataCrear.cedula,
      });
    } else {
      // const adminPassword = prompt(
      //   "Por favor, ingrese la contraseña de administrador:"
      // );
      // // dispatch(verifyAdminPassword(adminPassword)); registroAbogado(userDataCrear);
      // registroAbogado({
      //   ...userDataCrear,
      //   cedulaAbogado: userDataCrear.cedula,
      // });
    }
    navigate("/");
  };

  return (
    <div className="contenedorcrearusuario">
      <form method="post" className="formulario">
        <div className="logo-aveza">
          <img src={logo} alt="logo-aveza" />
        </div>
        <h1 className="titulo">Crear Usuario</h1>
        <div className="infocrearu">
          <div className="infocrearusuario">
            <label htmlFor="nombre" className="labelcrearusuario">
              Nombre(s):
            </label>
            <input
              type="text"
              name="nombres"
              id="name"
              className="cajascrearusuario"
              value={userDataCrear.nombres}
              onChange={handleChangeCrear}
            />
          </div>
          <div className="infocrearusuario">
            <label htmlFor="apellidos" className="labelcrearusuario">
              Apellido(s):
            </label>
            <input
              type="text"
              name="apellidos"
              id="lastname"
              className="cajascrearusuario"
              value={userDataCrear.apellidos}
              onChange={handleChangeCrear}
            />
          </div>
        </div>
        <div className="infocrearu">
          <div className="infocrearusuario">
            <label htmlFor="numerocedula" className="labelcrearusuario">
              Numero de cédula:
            </label>
            <input
              type="number"
              name="cedula"
              id="cedula"
              className="cajascrearusuario"
              value={userDataCrear.cedula}
              onChange={handleChangeCrear}
            />
          </div>
          <div className="infocrearusuario">
            <label htmlFor="correo" className="labelcrearusuario">
              Email:
            </label>
            <input
              name="email"
              type="email"
              value={userDataCrear.email}
              onChange={handleChangeCrear}
              id="email"
              className="cajascrearusuario"
            />
          </div>
        </div>
        <div className="infocrearu">
          <div className="infocrearusuario">
            <label htmlFor="direccion" className="labelcrearusuario">
              Dirección:
            </label>
            <input
              type="text"
              name="direccion"
              id="address"
              className="cajascrearusuario"
              value={userDataCrear.direccion}
              onChange={handleChangeCrear}
            />
          </div>
          <div className="infocrearusuario">
            <label htmlFor="telefono" className="labelcrearusuario">
              Celular:
            </label>
            <input
              type="number"
              name="celular"
              id="celular"
              className="cajascrearusuario"
              value={userDataCrear.celular}
              onChange={handleChangeCrear}
            />
          </div>
        </div>
        <div className="infocrearu">
          <div className="infocrearusuario">
            <label htmlFor="nombre_ciudad" className="labelcrearusuario">
              Selecciona la ciudad:
            </label>
            <input
              type="text"
              value={userDataCrear.nombre_ciudad}
              name="nombre_ciudad"
              id="nombre_ciudad"
              className="cajadeudas"
              onChange={(event) => handleCiudadChange(event)}
              placeholder="Buscar Ciudad..."
            />
          </div>
          <div className="infocrearusuario">
            <select
              name="nombre_ciudad"
              id="city"
              className="cajascrearusuario"
              onChange={(event) => handleCiudadChange(event)}
            >
              <option value="" className="opcionesacreedor">
                Ciudades
              </option>
              {ciudadFilt.length > 0 &&
                ciudadFilt.map((ciudad) => (
                  <option
                    key={ciudad.codigo_ciudad}
                    value={ciudad.nombre_ciudad}
                    className="opcionesciudad"
                  >
                    {ciudad.nombre_ciudad}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="selectinfocrearu">
          <div className="infocrearusuario">
            <select
              name="tipoUsuario"
              id="tipoUsuario"
              className="cajascrearusuario"
              onChange={(event) => handleChangeCrear(event)}
            >
              <option value="cliente" className="cajascrearusuario">
                Cliente
              </option>
              <option value="abogado" className="cajascrearusuario">
                Abogado
              </option>
            </select>
          </div>
          <div className="infocrearusuario">
            <label htmlFor="contrasena" className="labelcrearusuario">
              Contraseña:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="cajascrearusuario"
              value={userDataCrear.password}
              onChange={handleChangeCrear}
            />
          </div>
        </div>
        <div className="botonescrearusuario">
          <Button
            onClick={submitHandlerCrear}
            disabled={!userDataCrear.email || !userDataCrear.password}
          >
            Guardar
          </Button>
          <Link to={"/"}>
            <Button>Volver</Button>
          </Link>
        </div>
        <br />
      </form>
    </div>
  );
};
export default CrearUsuario;
