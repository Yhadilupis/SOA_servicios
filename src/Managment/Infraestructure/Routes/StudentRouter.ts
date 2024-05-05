import { Router } from "express";
import { assignSubjectToStudentController, createStudentController, getAllStudentsController, getStudentSubjectsController } from "../Dependencies";


const StudentRouter:Router = Router();

// Obtener todos los estudiantes
StudentRouter.get('', getAllStudentsController.run.bind(getAllStudentsController));

// Asignar una materia a un alumno
StudentRouter.post('/:student/subjects/:subject', assignSubjectToStudentController.run.bind(assignSubjectToStudentController));

// Crear un estudiante
StudentRouter.post('/registrar', createStudentController.run.bind(createStudentController));

// Obtener las materias de un alumno
StudentRouter.get('/:student/subjects', getStudentSubjectsController.run.bind(getStudentSubjectsController));

export default StudentRouter;