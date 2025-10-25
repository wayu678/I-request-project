import { Configuration } from "../generated-api/runtime";

export interface MasterValueHeaderResponse {
    id?: number;
    masterValueCode?: string;
    masterValueName?: string;
    message?: string;
    success?: boolean;
}

export interface MasterValueDetailResponse {
    id?: number;
    masterValueDetailCode?: string;
    descriptionTh?: string;
    descriptionEn?: string;
    sequence?: number;
    masterValueHeaderId?: number;
    message?: string;
    success?: boolean;
}

export interface SaveMasterValueHeaderPostRequest {
    masterValueCode: string;
    masterValueName?: string;
}

export interface SaveMasterValueDetailPostRequest {
    masterValueDetailCode: string;
    descriptionTh?: string;
    descriptionEn?: string;
    sequence?: number;
    masterValueHeaderId: number;
}

export interface FindMasterValueHeaderGetRequest {
    masterValueCode?: string;
}

export interface FindMasterValueDetailGetRequest {
    masterValueDetailCode?: string;
    masterValueHeaderId?: number;
}

export interface FindMasterValueDetailsByHeaderGetRequest {
    masterValueHeaderId: number;
}

export const useIram06Service = () => {
    return {
        saveMasterValueHeaderPost: async (request: SaveMasterValueHeaderPostRequest): Promise<MasterValueHeaderResponse> => {
            try {
                console.log('[start][saveMasterValueHeaderPost] request: ', request);

                const response = await fetch('/api/iram06/save-master-value-header', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(request),
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Failed to save master value header');
                }

                const data = await response.json();
                console.log('[end][saveMasterValueHeaderPost] response: ', data);
                return data;
            } catch (error) {
                console.error('[error][saveMasterValueHeaderPost]', error);
                throw error;
            }
        },

        saveMasterValueDetailPost: async (request: SaveMasterValueDetailPostRequest): Promise<MasterValueDetailResponse> => {
            try {
                console.log('[start][saveMasterValueDetailPost] request: ', request);

                const response = await fetch('/api/iram06/save-master-value-detail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(request),
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Failed to save master value detail');
                }

                const data = await response.json();
                console.log('[end][saveMasterValueDetailPost] response: ', data);
                return data;
            } catch (error) {
                console.error('[error][saveMasterValueDetailPost]', error);
                throw error;
            }
        },

        findMasterValueHeaderGet: async (request: FindMasterValueHeaderGetRequest): Promise<MasterValueHeaderResponse> => {
            try {
                console.log('[start][findMasterValueHeaderGet] request: ', request);

                const queryParams = new URLSearchParams();
                if (request.masterValueCode) queryParams.append('masterValueCode', request.masterValueCode);

                const response = await fetch(`/api/iram06/find-master-value-header?${queryParams}`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Failed to find master value header');
                }

                const data = await response.json();
                console.log('[end][findMasterValueHeaderGet] response: ', data);
                return data;
            } catch (error) {
                console.error('[error][findMasterValueHeaderGet]', error);
                throw error;
            }
        },

        findMasterValueDetailGet: async (request: FindMasterValueDetailGetRequest): Promise<MasterValueDetailResponse> => {
            try {
                console.log('[start][findMasterValueDetailGet] request: ', request);

                const queryParams = new URLSearchParams();
                if (request.masterValueDetailCode) queryParams.append('masterValueDetailCode', request.masterValueDetailCode);
                if (request.masterValueHeaderId) queryParams.append('masterValueHeaderId', request.masterValueHeaderId.toString());

                const response = await fetch(`/api/iram06/find-master-value-detail?${queryParams}`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Failed to find master value detail');
                }

                const data = await response.json();
                console.log('[end][findMasterValueDetailGet] response: ', data);
                return data;
            } catch (error) {
                console.error('[error][findMasterValueDetailGet]', error);
                throw error;
            }
        },

        findMasterValueDetailsByHeaderGet: async (request: FindMasterValueDetailsByHeaderGetRequest): Promise<MasterValueDetailResponse[]> => {
            try {
                console.log('[start][findMasterValueDetailsByHeaderGet] request: ', request);

                const queryParams = new URLSearchParams();
                queryParams.append('masterValueHeaderId', request.masterValueHeaderId.toString());

                const response = await fetch(`/api/iram06/find-master-value-details-by-header?${queryParams}`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Failed to find master value details by header');
                }

                const data = await response.json();
                console.log('[end][findMasterValueDetailsByHeaderGet] response: ', data);
                return data;
            } catch (error) {
                console.error('[error][findMasterValueDetailsByHeaderGet]', error);
                throw error;
            }
        }
    };
};