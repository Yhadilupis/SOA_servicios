import { Student } from "../../../Domain/Entities/Student";
import { Subject } from "../../../Domain/Entities/Subject";
import { IStudent } from "../../../Domain/Ports/IStudent";
import { StudentModel } from "../../Models/MySQL/StudentModel";
import { StudentSubjectModel } from "../../Models/MySQL/StudentSubjectModel";
import { SubjectModel } from "../../Models/MySQL/SubjectModel";

export class StudentMySQLRepository implements IStudent {


    async getAllStudents(): Promise<any | Student[]> {
        try {
            const students = await StudentModel.findAll();
            return {
                status: 200,
                data: (students)
            }
        } catch (error) {
            return {
                status:500,
                error: error
            }
        }
    }


    async assignASubjectToAStudent(student:string, subject:string): Promise<any> {
        try {
            const uuid = new Student("", "", "");
            await StudentSubjectModel.create({
                uuid: uuid.uuid,
                student_uuid: student,
                subject_uuid: subject
            });
            return {
                status: 201,
                message: "La materia se asigno correctamente"
            }
        } catch (error) {
            return {
                status:500,
                error:error
            }
        }
    }


    async createStudent(name: string, lastname: string, matricula: string): Promise<any> {
        try {
            const student:Student = new Student(name, lastname, matricula);

            const userResponse = await StudentModel.create({ 
                uuid: student.uuid,
                name: student.name,
                lastname: student.lastname,
                matricula: student.matricula
            })

            return {
                "status": 201,
                "uuid": userResponse.dataValues.uuid,
                "type": "students",
                "attributes": {
                    "name": userResponse.dataValues.name,
                    "lastname": userResponse.dataValues.lastname,
                    "matricula": userResponse.dataValues.matricula,
                }
            }

        } catch (error) {
            console.error("Error al registrar el estudiante:", error);
            return {
                status: 500,
                message: "Error al registrar el estudiante",
                error: error
            };
        }
    }


    async getAllSubjectOfAStudent(uuid: string): Promise<any | Subject[]> {
        try {
            const subjects = await StudentSubjectModel.findAll({where: { student_uuid:uuid }});
            if(!subjects){
                return {
                    status: 404, 
                    message: "No tiene materias"
                }
            }
            const subjectsData = [];
            for (const subject of subjects) {
                const subjectData = await SubjectModel.findByPk(subject.dataValues.subject_uuid)
                subjectsData.push(subjectData);
            }
            return {
                status: 200,
                data: subjectsData
            }
        } catch (error) {
            return {
                status: 500,
                error: error
            }
        }
    }

}