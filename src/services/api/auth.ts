import { AuthenticationApi } from "../generated-api/apis/AUTHENTICATIONApi";
import { Configuration } from "../generated-api/runtime";
import type { UserLoginRequest } from "../generated-api/models/UserLoginRequest";
import type { UserLoginResponse } from "../generated-api/models/UserLoginResponse";

const authApiClient = new AuthenticationApi(new Configuration({
    basePath: '/api',
    credentials: 'include', 
}));

export const useAuthService = () => {
    return {
        login: async (request: UserLoginRequest): Promise<UserLoginResponse> => {
            try {
                console.log('[start][login] request: ', request);
                const response = await authApiClient.login({ userLoginRequest: request });
                console.log('[end][login] response: ', response);
                return response;
            } catch (error: any) {
                console.error('[error][login]', error);
                throw error;
            }
        },

        logout: async (userId: number): Promise<{ success: boolean; message: string }> => {
            try {
                console.log('[start][logout] userId: ', userId);
                const response = await authApiClient.logout({ logoutRequest: { userId } });
                console.log('[end][logout] response: ', response);
                return response;
            } catch (error: any) {
                console.error('[error][logout]', error);
                throw error;
            }
        },

        refreshToken: async (refreshToken: string): Promise<{ accessToken: string; refreshToken: string; expiresIn: number; success: boolean }> => {
            try {
                console.log('[start][refreshToken] refreshToken: ', refreshToken);
                const response = await authApiClient.refreshToken({ refreshTokenRequest: { refreshToken } });
                console.log('[end][refreshToken] response: ', response);
                return response;
            } catch (error: any) {
                console.error('[error][refreshToken]', error);
                throw error;
            }
        }
    }
}

