import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../Mystyles";
import "../detail/detail.css";
import {
  deleteAbogado,
  deleteCliente,
  modificarDatos,
  modificarDatosAbogado,
  obtenerDeudasCliente,
} from "../../redux/actions";
import { listaacreedores } from "../../utils/acreedores.js";
import { generarResena } from "../../handlers/generarResena.jsx";
import { crearResena } from "../../redux/actions.js";
import { formatNumero } from "../../utils/formatNumero.js";
import styled from "styled-components";

const Detail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const source = useSelector((state) => state.source);
  const deudasCliente = useSelector((state) => state.deudasCliente);
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  //console.log('Source:', source)
  const cliente = JSON.parse(localStorage.getItem("cliente"));
  //console.log('Cliente local:', cliente)

  const abogado = JSON.parse(localStorage.getItem("abogado"));
  //console.log("Abogado local:", abogado);

  const datos = source === "abogado" ? abogado : cliente;

  //console.log("Datos cliente:", datos);
  const Cedula =
    source === "abogado" ? datos.cedulaAbogado : datos.cedulaCliente;

  const [userDataDetail, setUserDataDetail] = useState({
    email: "",
    nombres: "",
    apellidos: "",
    tarjetaProf: "",
    cedula: "",
    celular: "",
    direccion: "",
    ciudad: "",
    departamento: "",
    // password: "",
    comentarios: "",
    cedulanew: "",
  });

  const initDeuda = {
    idDeuda: "",
    acreedor: "",
    acreedorBuscado: "",
    tipoDeuda: "",
    tipoGarantia: "",
    documentoSoporte: "",
    capital: "",
    intereses: "",
    clasificacion: "",
    diasMora: "",
    tasaInteres: "",
    numeroCuotas: "",
  };

  const initPlan = {
    tasaInteres: "",
    numeroCuotas: "",
  };

  const listaAcreedoresObj = [];
  const deudasObj = [];
  const initAcreedorFilt = {
    acreedores: [],
  };

  const [deudas, setDeudas] = useState(deudasObj);
  const [datosDeuda, setDatosDeuda] = useState(initDeuda);
  const [acreedorFilt, setAcreedorFilt] = useState(initAcreedorFilt);
  const [listaAcreedores, setListaAcreedores] = useState(listaAcreedoresObj);
  const [editingField, setEditingField] = useState(null);
  const [plan, setPlan] = useState(initPlan);

  let deudasTabla = [];

  if (loggedUser?.cedulaAbogado) {
    deudasTabla = deudasCliente;
  } else {
    deudasTabla = deudas;
  }

  useEffect(() => {
    if (source === "abogado") {
      setUserDataDetail({
        ...userDataDetail,
        email: datos.email,
        celular: datos.celular,
        // ciudad: datos.Ciudads[0].nombre_ciudad,
        // ciudad_anterior: datos.Ciudads[0].codigo_ciudad,
        // departamento: datos.Ciudads[0].Departamentos[0].nombre_departamento,
        tarjetaProf: datos.tarjetaProf,
        nombres: datos.nombres,
        apellidos: datos.apellidos,
        direccion: datos.direccion,
        comentarios: "",
        cedulanew: datos.cedulaAbogado,
        cedula_anterior: datos.cedulaAbogado,
      });
    } else {
      setUserDataDetail({
        ...userDataDetail,
        email: datos.email,
        celular: datos.celular,
        // ciudad: datos.Ciudads[0].nombre_ciudad,
        // ciudad_anterior: datos.Ciudads[0].codigo_ciudad,
        // departamento: datos.Ciudads[0].Departamentos[0].nombre_departamento,
        nombres: datos.nombres,
        tarjetaProf: "",
        apellidos: datos.apellidos,
        direccion: datos.direccion,
        comentarios: datos.comentarios,
        cedulanew: datos.cedulaCliente,
        cedula_anterior: datos.cedulaCliente,
      });
    }
  }, [dispatch, source]);

  useEffect(() => {
    if (loggedUser.cedulaAbogado) {
      dispatch(obtenerDeudasCliente(datos.cedulaCliente));
    } 
  }, [dispatch, datos.cedulaCliente]);

  const handleDelete = () => {
    if (source === "abogado") {
      const isConfirmed = window.confirm(
        "¿Estás seguro de que deseas eliminar este registro?"
      );

      if (isConfirmed) {
        dispatch(deleteAbogado(Cedula));
        //console.log("cedula", Cedula);
        navigate("/abogados");
      }
    } else {
      const isConfirmed = window.confirm(
        "¿Estás seguro de que deseas eliminar este registro?"
      );

      if (isConfirmed) {
        dispatch(deleteCliente(Cedula));
        navigate("/clientes");
      }
    }
  };

  const handleUpdateDetail = (e) => {
    e.preventDefault();
    setUserDataDetail({
      ...userDataDetail,
      [e.target.name]: e.target.value, // Sintaxis ES6 para actualizar la key correspondiente
    });
  };

  const submitUpdateDetail = (e) => {
    e.preventDefault();
    if (source === "abogado") {
      dispatch(modificarDatosAbogado(userDataDetail));
      window.localStorage.setItem("abogado", JSON.stringify(userDataDetail));
    } else {
      dispatch(modificarDatos(userDataDetail));
      window.localStorage.setItem("cliente", JSON.stringify(userDataDetail));
    }
  };

  // console.log("Nuevos Datos cliente:", userDataDetail);

  const addDeuda = (deuda) => {
    setDeudas([...deudas, deuda]);
    setDatosDeuda(initDeuda);
  };

  const addAcreedor = (acreedor) => {
    setListaAcreedores([...listaAcreedores, acreedor]);
  };

  const handleDeudaChange = (e) => {
    setDatosDeuda({
      ...datosDeuda,
      [e.target.name]: e.target.value,
    });
    setEditingField(e.target.name);
  };

  const handlePlanChange = (e) => {
    setPlan({
      ...plan,
      [e.target.name]: e.target.value,
    });
    setEditingField(e.target.name);
  };

  const handleSubmitDeuda = async (e) => {
    e.preventDefault();
    addDeuda(datosDeuda);
    // console.log("Acreedor buscado:", datosDeuda.acreedor);
    const filteredAcreedor = listaacreedores.filter(
      (acreedor) => acreedor.nombre === datosDeuda.acreedor
    );

    if (filteredAcreedor.length === 0) {
      filteredAcreedor.push({
        NIT: 0,
        nombre: datosDeuda.acreedor,
        direccionAcreedor: "",
        ciudadAcreedor: "",
        telefono: "",
        emailAcreedor: "",
      });
    }
    //console.log("Acreedor encontrado:", filteredAcreedor);
    addAcreedor(filteredAcreedor[0]);
  };

  // console.log("Tasa de interés:", tasaInteres);
  // console.log("Número de cuotas:", numeroCuotas);

  //console.log("Deudas:", deudas);
  // console.log("Cliente:", cliente);
  // console.log("Lista acreedores:", listaAcreedores);

  const handlerGenerarResena = () => {
    console.log("Tasa de interés:", plan.tasaInteres);
    console.log("Número de cuotas:", plan.numeroCuotas);
    const datosresena = generarResena(
      deudas,
      cliente,
      listaAcreedores,
      plan.tasaInteres,
      plan.numeroCuotas
    );

    console.log("Datos insolvencia para back:", datosresena);
    dispatch(crearResena(datosresena));
  };

  const handleAcreedorChange = (e) => {
    e.preventDefault();

    setDatosDeuda({
      ...datosDeuda,
      [e.target.name]: e.target.value,
    });

    const foundAcreedor = listaacreedores.filter((acreedor) =>
      acreedor.nombre.toLowerCase().includes(e.target.value.toLowerCase())
    );
    //console.log("Acreedores encontrados:", foundAcreedor);
    setAcreedorFilt(foundAcreedor);
  };

  const parseNumero = (numeroFormateado) => {
    return Number(numeroFormateado.replace(/[^0-9,-]+/g, "").replace(",", "."));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const { name } = e.target;

      switch (editingField) {
        case "capital":
          setDatosDeuda({
            ...datosDeuda,
            [name]: parseNumero(datosDeuda[name]), // Formatea el valor solo cuando se presiona Enter
          });
          break;
        default:
          break;
      }
      setEditingField(null);
    }
  };

  const FileInput = styled.input`
    display: none;
  `;

  const fileInputRef = React.createRef();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  };

  return (
    <div className="contenedordetail">
      <div className="detail" key={userDataDetail.cedula}>
        <div className="encabezado">
          <h5 className="titulo">Detalles</h5>
        </div>
        <div className="menu-detail">
          {/* <input type="file" id="doc" /> */}
          {datos?.tarjetaProf ? null : loggedUser?.cedulaAbogado ? (
            <>
              <div>
                {" "}
                <FileInput
                  type="file"
                  id="doc"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />{" "}
                <Button onClick={handleButtonClick}> Upload File </Button>{" "}
              </div>
              <Button
                className="botonesiniciosesion"
                onClick={handlerGenerarResena}
              >
                Generar reseña
              </Button>{" "}
            </>
          ) : null}
          <Button className="botonesiniciosesion" onClick={submitUpdateDetail}>
            Actualizar
          </Button>
          <Button onClick={handleDelete} className="botonesiniciosesion">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="black"
                d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
              ></path>
            </svg>
            Eliminar
          </Button>
          {datos?.tarjetaProf ? (
            <Link to="/abogados">
              <Button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="none"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={50.5}
                    d="M244 400L100 256l144-144M120 256h292"
                  ></path>
                </svg>
                Volver
              </Button>
            </Link>
          ) : (
            <Link to="/clientes">
              <Button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="none"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={50.5}
                    d="M244 400L100 256l144-144M120 256h292"
                  ></path>
                </svg>
                Volver
              </Button>
            </Link>
          )}
        </div>
        {datos.nombres && (
          <span className="nombredetail">
            {datos.nombres.toUpperCase()} {datos.apellidos.toUpperCase()}{" "}
          </span>
        )}
        <div className="infodetail">
          <div className="info">
            <div className="personal">
              <div className="infodetail">
                <label htmlFor="cedula" className="labeldetail">
                  Numero de cédula:
                </label>
                <input
                  type="number"
                  className="cajadetail"
                  name="cedulanew"
                  id="cedula"
                  value={userDataDetail.cedulanew}
                  onChange={handleUpdateDetail}
                />
              </div>
              <div className="infodetail">
                <label htmlFor="celular" className="labeldetail">
                  Celular:
                </label>
                <input
                  type="number"
                  className="cajadetail"
                  name="celular"
                  id="celular"
                  value={userDataDetail.celular}
                  onChange={handleUpdateDetail}
                />
              </div>
              <div className="infodetail">
                <label htmlFor="email" className="labeldetail">
                  Correo:
                </label>
                <input
                  type="email"
                  className="cajadetail"
                  name="email"
                  id="email"
                  value={userDataDetail.email}
                  onChange={handleUpdateDetail}
                />
              </div>
              <div className="infodetail">
                <label htmlFor="direccion" className="labeldetail">
                  Dirección:
                </label>
                <input
                  type="text"
                  className="cajadetail"
                  name="direccion"
                  id="direccion"
                  value={userDataDetail.direccion.toUpperCase()}
                  onChange={handleUpdateDetail}
                />
              </div>
              <div className="infodetail">
                <label htmlFor="ciudad" className="labeldetail">
                  Ciudad:
                </label>
                <input
                  type="text"
                  className="cajadetail"
                  name="ciudad"
                  id="ciudad"
                  value={userDataDetail.ciudad.toUpperCase()}
                  onChange={handleUpdateDetail}
                />
              </div>
              <div className="infodetail">
                <label htmlFor="departamento" className="labeldetail">
                  Departamento:
                </label>
                <input
                  type="text"
                  className="cajadetail"
                  name="departamento"
                  id="departamento"
                  value={userDataDetail.departamento.toUpperCase()}
                  onChange={handleUpdateDetail}
                />
              </div>
              {datos?.comentarios && (
                <div className="infodetail">
                  <label htmlFor="comentarios" className="labeldetail">
                    Comentarios:
                  </label>
                  <textarea
                    className="cajadetail"
                    cols="90"
                    rows="5"
                    name="comentarios"
                    id="comentarios"
                    value={userDataDetail.comentarios}
                    onChange={handleUpdateDetail}
                  />
                </div>
              )}
            </div>
          </div>
          {datos?.tarjetaProf ? null : loggedUser?.cedulaAbogado ? (
            <div className="infosecciondetail">
              <div className="encabezadodeudas">
                <span className="tituloDeudasDetail">Plan de pago</span>
              </div>
              <div className="infodetaildeudas">
                <label htmlFor="capital" className="labeldetail">
                  Tasa de interés: :
                </label>
                <input
                  type="text"
                  className="cajadeudas"
                  name="tasaInteres"
                  id="tasaInteres"
                  onChange={(event) => handlePlanChange(event)}
                  value={
                    editingField === "tasaInteres"
                      ? plan.tasaInteres
                      : formatNumero(plan.tasaInteres)
                  }
                  onKeyDown={handleKeyPress}
                />
              </div>
              <div className="infodetaildeudas">
                <label htmlFor="capital" className="labeldetail">
                  Número de cuotas:
                </label>
                <input
                  type="text"
                  className="cajadeudas"
                  name="numeroCuotas"
                  id="numeroCuotas"
                  onChange={(event) => handlePlanChange(event)}
                  value={
                    editingField === "numeroCuotas"
                      ? plan.numeroCuotas
                      : formatNumero(plan.numeroCuotas)
                  }
                  onKeyDown={handleKeyPress}
                />
              </div>
              <table className="informationTable">
                <thead>
                  <tr>
                    <th className="tableCellDetail">Nombre acreedor</th>
                    <th className="tableCellDetail">Tipo de crédito</th>
                    <th className="tableCellDetail">Capital</th>
                  </tr>
                </thead>
                <tbody>
                  {deudas.length > 0 ? (
                    deudasTabla.map((deuda, index) => (
                      <tr key={index}>
                        <td className="tableCellDetail" key={index}>
                          {deuda.acreedor}
                        </td>
                        <td className="tableCellDetail" key={index}>
                          {deuda.tipoDeuda}
                        </td>
                        <td className="tableCellDetail" key={index}>
                          {formatNumero(deuda.capital)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <td>&nbsp;</td>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="infosecciondetail">
              <div className="encabezadodeudas">
                <span className="tituloDeudasDetail">
                  Información de las deudas
                </span>
              </div>
              <div className="infodetaildeudas">
                <label htmlFor="acreedor" className="labeldetail">
                  Selecciona el acreedor:
                </label>
                <input
                  type="text"
                  value={datosDeuda.acreedor}
                  name="acreedor"
                  id="acreedor"
                  className="cajadeudas"
                  onChange={(event) => handleAcreedorChange(event)}
                  placeholder="Buscar Institución..."
                />
              </div>
              <div className="infodetaildeudas">
                <select
                  name="acreedor"
                  id="acreedor"
                  className="cajadeudas"
                  onChange={(event) => handleDeudaChange(event)}
                >
                  <option value="" className="opcionesacreedor">
                    Instituciones encontradas
                  </option>
                  {acreedorFilt.length > 0 &&
                    acreedorFilt.map((acreedor) => (
                      <option
                        key={acreedor.idAcreedor}
                        value={acreedor.idAcreedor}
                        className="opcionesacreedor"
                      >
                        {acreedor.nombre}
                      </option>
                    ))}
                </select>
              </div>
              <div className="infodetaildeudas">
                <label htmlFor="tipoDeuda" className="labeldetail">
                  Tipo de deuda:
                </label>
                <input
                  type="text"
                  className="cajadeudas"
                  name="tipoDeuda"
                  id="tipoDeuda"
                  value={datosDeuda.tipoDeuda}
                  onChange={(event) => handleDeudaChange(event)}
                />
              </div>

              <div className="infodetaildeudas">
                <label htmlFor="capital" className="labeldetail">
                  Capital :
                </label>
                <input
                  type="text"
                  className="cajadeudas"
                  name="capital"
                  id="capital"
                  onChange={(event) => handleDeudaChange(event)}
                  value={
                    editingField === "capital"
                      ? datosDeuda.capital
                      : formatNumero(datosDeuda.capital)
                  }
                  onKeyDown={handleKeyPress}
                />
              </div>

              <Button type="submit" value="Guardar" onClick={handleSubmitDeuda}>
                Agregar deuda
              </Button>
              <table className="informationTable">
                <thead>
                  <tr>
                    <th className="tableCellDetail">Nombre acreedor</th>
                    <th className="tableCellDetail">Tipo de crédito</th>
                    <th className="tableCellDetail">Capital</th>
                  </tr>
                </thead>
                <tbody>
                  {deudas.length > 0 ? (
                    deudas.map((deuda, index) => (
                      <tr key={index}>
                        <td className="tableCellDetail" key={index}>
                          {deuda.acreedor}
                        </td>
                        <td className="tableCellDetail" key={index}>
                          {deuda.tipoDeuda}
                        </td>
                        <td className="tableCellDetail" key={index}>
                          {formatNumero(deuda.capital)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <td>&nbsp;</td>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
