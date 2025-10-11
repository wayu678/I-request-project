import { SaveMasterValueHeaderRequest } from "../models/request/iram06/SaveMasterValueHeaderRequest";
import { MasterValueHeaderResponse } from "../models/response/iram06/MasterValueHeaderResponse";
import { SaveMasterValueDetailRequest } from "../models/request/iram06/SaveMasterValueDetailRequest";
import { MasterValueDetailResponse } from "../models/response/iram06/MasterValueDetailResponse";

export interface MasterValueService {
  saveMasterValueHeaderPost: (header: SaveMasterValueHeaderRequest) => Promise<MasterValueHeaderResponse>;
  saveMasterValueDetailPost: (detail: SaveMasterValueDetailRequest) => Promise<MasterValueDetailResponse>;

  findMasterValueHeaderGet: (masterValueHeaderCode: string) => Promise<MasterValueHeaderResponse>;
  findMasterValueDetailGet: (masterValueDetailCode: string) => Promise<MasterValueDetailResponse>;
  findMasterValueDetailsByHeaderGet: (headerCode: string) => Promise<MasterValueDetailResponse[]>;
}