import { models } from "../../DB.js";

const Administrador = models.Administrador;

const deleteAdministrador = async (id) => {
  await Administrador.delete(
    {
      activo: false,
    },
    {
      where: {
        id: id,
      },
    }
  );
  return "Delete complete";
};

export { deleteAdministrador };
