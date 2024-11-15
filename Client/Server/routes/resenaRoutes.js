import { Router } from "express";

const resenaRouter = Router();

resenaRouter.post("/", crearResenaHandler);
resenaRouter.get("/", getResenasHandler);

export default resenaRouter;
