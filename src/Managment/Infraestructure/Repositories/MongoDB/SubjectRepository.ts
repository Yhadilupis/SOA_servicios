import { Subject } from "../../../Domain/Entities/Subject";
import { ISubject } from "../../../Domain/Ports/ISubject";
import SubjectModel from "../../Models/MongoDB/SubjectModel";

export class SubjectMongoDBRepository implements ISubject {
    async createASubject(name: string): Promise<any> {
        try {
            const subject = new Subject(name);
            await SubjectModel.create(subject);
            return {
                status: 201,
                message: "Materia creada correctamente"
            }
        } catch (error) {
            return {
                status: 500,
                error: error
            }
        }
    }
}