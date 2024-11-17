import { crearResena } from "../controllers/resenas/crearResena.js";
import { getDeudas } from "../controllers/resenas/getDeudas.js";
import { getResenas } from "../controllers/resenas/getResenas.js";

const getResenasHandler = async (req, res) => {
  try {
    const response = await getResenas(req.query);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDeudasHandler = async (req, res) => {
  try {
    const response = await getDeudas(req.body.cedulaCliente);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const crearResenaHandler = async (req, res) => {
  try {
    const response = await crearResena(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { crearResenaHandler, getResenasHandler, getDeudasHandler };