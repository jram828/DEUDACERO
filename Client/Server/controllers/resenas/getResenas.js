import { models } from "../../DB.js";

const { Acreedor } = models;

const getResenas = async () => {
  const allAcreedor = await Acreedor.findAll();
  return allAcreedor;
};

export { getResenas };
