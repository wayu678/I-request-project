import { SaveStudentRequest } from "../models/request/iram07/SaveStudentRequest";
import { StudentResponse } from "../models/response/iram07/StudentResponse";
import { SaveStudentAddressRequest } from "../models/request/iram07/SaveStudentAddressRequest";
import { StudentAddressResponse } from "../models/response/iram07/StudentAddressResponse";

export interface StudentService {
    saveStudentPost: (req: SaveStudentRequest) => Promise<StudentResponse>;
    findStudentByCodeGet: (studentCode: string) => Promise<StudentResponse>;
    
    // StudentAddress methods
    saveStudentAddressPost: (req: SaveStudentAddressRequest) => Promise<StudentAddressResponse>;
    findStudentAddressesByStudentIdGet: (studentId: number) => Promise<StudentAddressResponse[]>;
    findStudentAddressByIdGet: (id: number) => Promise<StudentAddressResponse>;
}