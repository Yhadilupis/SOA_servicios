import { Subject } from "../../../Domain/Entities/Subject";
import { ISubject } from "../../../Domain/Ports/ISubject";
import { SubjectModel } from "../../Models/MySQL/SubjectModel";

export class SubjectMySQLRepository implements ISubject {

    async createASubject(name: string): Promise<any> {
        try {
            const subject = new Subject(name);

            const userResponse = await SubjectModel.create({ 
                uuid: subject.uuid,
                name: subject.name
            })

            return {
                "status": 201,
                "message": "Materia creada correctamente",
                "uuid": userResponse.dataValues.uuid,
                "type": "subjects",
                "attributes": {
                    "name": userResponse.dataValues.name
                }
            }

        } catch (error) {
            console.error("Error al crear la materia:", error);
            return {
                status: 500,
                message: "Error al crear la materia",
                error: error
            };
        }
    }
}