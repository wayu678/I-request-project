import { AuthenticationApi } from "../generated-api/apis/AuthenticationApi";
import { Configuration } from "../generated-api/runtime";
import type { UserLoginRequest } from "../generated-api/models/UserLoginRequest";
import type { UserLoginResponse } from "../generated-api/models/UserLoginResponse";
import { apiConfigurations } from "../ApiConfigurations";
import type { UserResponse } from "../generated-api/models/UserResponse";


const authenticationApi = new AuthenticationApi(apiConfigurations);

export const authenticationService = {
   
    async login(request: UserLoginRequest): Promise<UserLoginResponse> {
        try {
            console.log('[start][login] request: ', request);
            const response = await authenticationApi.login({ userLoginRequest: request });
            console.log('[end][login] response: ', response);
            return response;
        } catch (error: any) {
            console.error('[error][login]', error);
            throw error;
        }
    },

    async logout(userId: number): Promise<{ success: boolean; message: string }> {
        try {
            console.log('[start][logout] userId: ', userId);
            const response = await authenticationApi.logout({ logoutRequest: { userId } });
            console.log('[end][logout] response: ', response);
            return response;
        } catch (error: any) {
            console.error('[error][logout]', error);
            throw error;
        }
    },

    async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string; expiresIn: number; success: boolean }> {
        try {
            console.log('[start][refreshToken] refreshToken: ', refreshToken);
            const response = await authenticationApi.refreshToken({ refreshTokenRequest: { refreshToken } });
            console.log('[end][refreshToken] response: ', response);
            return response;
        } catch (error: any) {
            console.error('[error][refreshToken]', error);
            throw error;
        }
    },

    async getCurrentUser(): Promise<UserResponse> {
        try {
            console.log('[start][getCurrentUser]');
            const response = await authenticationApi.getCurrentUser();
            console.log('[end][getCurrentUser] response: ', response);
            return response;
        } catch (error: any) {
            console.error('[error][getCurrentUser]', error);
            throw error;
        }
    }
};
