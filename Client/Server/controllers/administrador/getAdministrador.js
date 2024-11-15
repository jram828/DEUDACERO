import { models } from "../../DB.js";

const { Administrador } = models;

const getAdministrador = async () => {
  const administrador = await Administrador.findAll();

  console.log("Administrador encontrado:", administrador);
  if (!administrador) throw Error("Administrador no existe");
};
export { getAdministrador };
