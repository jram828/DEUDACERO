import axios from "axios";

export async function postCaso(data) {
  const {
    radicado,
    juzgado,
    cedulaAbogado,
    cedulaCliente,
    fecha,
    fechaFin,
    descripcion,
    TipoDeCasoid,
    honorarios,
    valor_pretensiones,
    cuotas,
    forma_de_pago,
  } = data;
  console.log("data del post", data);

  const URL = "/casos";
  try {
    await axios.post(URL, {
      radicado: `${radicado}`,
      juzgado: `${juzgado}`,
      cedulaCliente: `${cedulaCliente}`,
      cedulaAbogado: `${cedulaAbogado}`,
      fecha: `${fecha}`,
      fechaFin: `${fechaFin}`,
      descripcion: `${descripcion}`,
      TipoDeCasoid: `${TipoDeCasoid}`,
      honorarios: `${honorarios}`,
      valor_pretensiones: `${valor_pretensiones}`,
      forma_de_pago: `${forma_de_pago}`,
      cuotas: `${cuotas}`,
    });
    window.alert("Se ha registrado el caso con éxito.");
  } catch (error) {
    window.alert("No fue posible registrar el caso.");
  }
}
