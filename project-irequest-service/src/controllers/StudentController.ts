import { Body, Controller, Get, Post, Query, Route, Tags } from "tsoa";
import { StudentService } from "../services/StudentService";
import { StudentServiceImpl } from "../services/implements/StudentServiceImpl";
import { SaveStudentRequest } from "../models/request/iram07/SaveStudentRequest";
import { StudentResponse } from "../models/response/iram07/StudentResponse";
import { SaveStudentAddressRequest } from "../models/request/iram07/SaveStudentAddressRequest";
import { StudentAddressResponse } from "../models/response/iram07/StudentAddressResponse";

@Route("iram07")
@Tags("IRAM07 - Students")
export class StudentController extends Controller {
  private studentService: StudentService;

  constructor() {
    super();
    this.studentService = new StudentServiceImpl();
  }

  @Post("/save-student-post")
  public async saveStudentPost(@Body() req: SaveStudentRequest): Promise<StudentResponse> {
    return await this.studentService.saveStudentPost(req);
  }

  @Get("/find-student-by-code-get")
  public async findStudentByCodeGet(@Query("student-code") studentCode: string): Promise<StudentResponse> {
    return await this.studentService.findStudentByCodeGet(studentCode);
  }

  // StudentAddress endpoints
  @Post("/save-student-address-post")
  public async saveStudentAddressPost(@Body() req: SaveStudentAddressRequest): Promise<StudentAddressResponse> {
    return await this.studentService.saveStudentAddressPost(req);
  }

  @Get("/find-student-addresses-by-student-id-get")
  public async findStudentAddressesByStudentIdGet(@Query("student-id") studentId: number): Promise<StudentAddressResponse[]> {
    return await this.studentService.findStudentAddressesByStudentIdGet(studentId);
  }

  @Get("/find-student-address-by-id-get")
  public async findStudentAddressByIdGet(@Query("id") id: number): Promise<StudentAddressResponse> {
    return await this.studentService.findStudentAddressByIdGet(id);
  }
}