import { Router } from "express";
import { createSubjectController } from "../Dependencies";

const SubjectRouter:Router = Router();

// Crear una materia
SubjectRouter.post('/registrar', createSubjectController.run.bind(createSubjectController));

export default SubjectRouter;