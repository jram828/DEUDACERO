import { models } from "../../DB.js";

const Administrador = models.Administrador;

const createAdministrador = async (password) => {
  try {
    const newAdministrador = await Administrador.create({
      password,
    });
    return newAdministrador;
  } catch (error) {
    console.log(error);
  }
};

export { createAdministrador };
