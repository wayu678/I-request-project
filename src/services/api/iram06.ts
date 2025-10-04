import { IRAM06MasterValueApi, Configuration, type MasterValueDetailResponse, type FindMasterValueDetailGetRequest, type MasterValueHeaderResponse, type FindMasterValueHeaderGetRequest, type FindMasterValueDetailsByHeaderGetRequest, type SaveMasterValueHeaderPostRequest, type SaveMasterValueDetailPostRequest } from "../generated-api";

const iram06ApiClient = new IRAM06MasterValueApi(new Configuration({
    basePath: 'http://localhost:8080/api',
}));

export const useIram06Service = () => {
    return {

        saveMasterValueHeaderPost: async (request: SaveMasterValueHeaderPostRequest):Promise<MasterValueHeaderResponse> => {
            // ก่อนจะยิง api ให้ console.log request
            console.log('[start][saveMasterValueHeaderPost] request: ', request);
            const response = await iram06ApiClient.saveMasterValueHeaderPost(request);
            // หลังจะยิง api ให้ console.log response
            console.log('[end][saveMasterValueHeaderPost] response: ', response);
            return response;
        },

        saveMasterValueDetailPost: async (request: SaveMasterValueDetailPostRequest):Promise<MasterValueDetailResponse> => {
            // ก่อนจะยิง api ให้ console.log request
            console.log('[start][saveMasterValueDetailPost] request: ', request);
            const response = await iram06ApiClient.saveMasterValueDetailPost(request);
            // หลังจะยิง api ให้ console.log response
            console.log('[end][saveMasterValueDetailPost] response: ', response);
            return response;
        },

        findMasterValueHeaderGet: async (request: FindMasterValueHeaderGetRequest): Promise<MasterValueHeaderResponse> => {
            // ก่อนจะยิง api ให้ console.log request
            console.log('[start][findMasterValueHeaderGet] request: ', request);
            const response = await iram06ApiClient.findMasterValueHeaderGet(request);
            // หลังจะยิง api ให้ console.log response
            console.log('[end][findMasterValueHeaderGet] response: ', response);
            return response;
        },

        findMasterValueDetailGet: async (request: FindMasterValueDetailGetRequest): Promise<MasterValueDetailResponse> => {
            // ก่อนจะยิง api ให้ console.log request
            console.log('[start][findMasterValueDetailGet] request: ', request);
            const response = await iram06ApiClient.findMasterValueDetailGet(request);
            // หลังจะยิง api ให้ console.log response
            console.log('[end][findMasterValueDetailGet] response: ', response);
            return response;
        },

        findMasterValueDetailsByHeaderGet: async (request: FindMasterValueDetailsByHeaderGetRequest): Promise<MasterValueDetailResponse[]> => {
            // ก่อนจะยิง api ให้ console.log request
            console.log('[start][findMasterValueDetailsByHeaderGet] request: ', request);
            const response = await iram06ApiClient.findMasterValueDetailsByHeaderGet(request);
            // หลังจะยิง api ให้ console.log response
            console.log('[end][findMasterValueDetailsByHeaderGet] response: ', response);
            return response;
        },


    }
}