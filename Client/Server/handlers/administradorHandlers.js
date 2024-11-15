import { actualizaAdministrador } from "../controllers/administrador/actualizaAdministrador.js";
import { createAdministrador } from "../controllers/administrador/createAdministrador.js";
import { deleteAdministrador } from "../controllers/administrador/deleteAdministrador.js";
import { getAdministrador } from "../controllers/administrador/getAdministrador.js";


const getAdministradorHandler = async (req, res) => {
  let response;

  try {
    response = await getAdministrador(req.query);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const postAdministradorHandler = async (req, res) => {
  const { password } = req.body;

  console.log("body crear administrador:", { password });

  try {
    const response = await createAdministrador(password);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAdministradorHandler = async (req, res) => {
  const { id } = req.body;
  try {
    const response = await deleteAdministrador(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const actualizaAdministradorHandler = async (req, res) => {
  console.log("Body actualiza administrador: ", req.body);
  const { id, password } = req.body;

  try {
    const response = await actualizaAdministrador(id, password);
    if (response) res.status(200).json(response);
    else res.status(204).json("No se actualizo el abogado");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  getAdministradorHandler,
  postAdministradorHandler,
  deleteAdministradorHandler,
  actualizaAdministradorHandler,
};
