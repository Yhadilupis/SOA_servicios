import { Student } from "../../../Domain/Entities/Student";
import { Tutor } from "../../../Domain/Entities/Tutor";
import { ITutor } from "../../../Domain/Ports/ITutor";
import StudentModel from "../../Models/MongoDB/StudentModel";
import TutorModel from "../../Models/MongoDB/TutorModel";

export class TutorMongoDBRepository implements ITutor {
    
    async assignAStudentToATutor(uuid: string, studentUUID: string): Promise<any> {
        try {
            const tutor = await TutorModel.findOne({ uuid:uuid });
            if(!tutor){
                return {
                    status: 400,
                    message: 'Error no se asigno'
                }
            }
            const students = tutor.students as string[];
            students.push(studentUUID);
            tutor.students = students;
            await tutor.save();
            return {
                status: 201,
                message: 'Se ha asignado correctamente'
            }
        } catch (error) {
            return {
                status: 500,
                error: error
            }
        }
    }

    async getAllTutored(): Promise<any | Tutor[]> {
        try {
            const tutored = await TutorModel.find({});
            return {
                status: 200,
                data: tutored
            }
        } catch (error) {
            return {
                status: 500, 
                error: error
            }
        }
    }

    async createTutor(name: string, lastname: string): Promise<any> {
        try {
            const tutor = new Tutor(name, lastname);
            const tutorData = await TutorModel.create(tutor);
            return {
                status: 201,
                data: tutorData
            }
        } catch (error) {
            return {
                status: 500,
                error: error
            }
        }
    }

    
    async getAllStudentsFromATutor(uuid: string): Promise<any | Student[]> {
        try {
            const tutor:any = await TutorModel.findOne({ uuid:uuid });
            const students = [];
            if(!tutor){
                return {
                    status: 404,
                    message: 'Error el tutor no se encuentra'
                }
            }
            for (const studentDataUUID of tutor.students) {
                const student = await StudentModel.findOne({ uuid: studentDataUUID})
                students.push(student);
            }
            return {
                status: 200, 
                data: students
            }
        } catch (error) {
            return {
                status: 500,
                error: error
            }
        }
    }
}