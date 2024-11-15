import { Router } from "express";
import { crearResenaHandler, getResenasHandler } from "../handlers/resenaHandlers";

const resenaRouter = Router();

resenaRouter.post("/", crearResenaHandler);
resenaRouter.get("/", getResenasHandler);

export default resenaRouter;
