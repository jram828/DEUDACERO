import { models } from "../../DB.js";

const { Administrador } = models;

const actualizaAdministrador = async (id, password) => {
  console.log("Datos controller actualiza administrador:", {
    id,
    password,
  });

  const [updateCount, updateAdministrador] = await Administrador.update(
    { password: password },
    {
      where: {
        id: id,
      },
    }
  );

  if (updateCount > 0) {
    return updateAdministrador;
  } else {
    return "";
  }
};
export { actualizaAdministrador };
