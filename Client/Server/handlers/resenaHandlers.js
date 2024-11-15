
const getResenasHandler = async (req, res) => {
  try {
    const response = await getResenas(req.query);
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

export { crearResenaHandler, getResenasHandler };