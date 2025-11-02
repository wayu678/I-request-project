import { apiConfigurations } from '../ApiConfigurations';
import { UserManagementApi } from '../generated-api/apis/UserManagementApi';
import type {
    GetAllUsersRequest,
    CreateUserOperationRequest,
    UpdateUserOperationRequest,
    DeleteUserRequest,
    GetUserByIdRequest
} from '../generated-api/apis/UserManagementApi';
import type {
    GetAllUsersResponse,
    CreateUserResponse,
    UpdateUserResponse,
    UserResponse,
    CreateUserRequest,
    UpdateUserRequest
} from '../generated-api/models';

const userManagementApi = new UserManagementApi(apiConfigurations);

export const userManagementService = {
    /**
     * ดึงรายการ User ทั้งหมด (พร้อม pagination)
     */
    async getAllUsers(params: { page?: number; pageSize?: number }): Promise<GetAllUsersResponse> {
        try {
            console.log('[start][getAllUsers] params: ', params);

            const requestParams: GetAllUsersRequest = {
                page: params.page || 1,
                pageSize: params.pageSize || 10
            };

            const response = await userManagementApi.getAllUsers(requestParams);
            console.log('[end][getAllUsers] response: ', response);

            return response;
        } catch (error: any) {
            console.error('[error][getAllUsers]', error);
            throw error;
        }
    },

    /**
     * สร้าง user ใหม่
     */
    async createUser(data: CreateUserRequest): Promise<CreateUserResponse> {
        try {
            console.log('[start][createUser] data: ', data);

            const requestParams: CreateUserOperationRequest = {
                createUserRequest: data
            };

            const response = await userManagementApi.createUser(requestParams);
            console.log('[end][createUser] response: ', response);

            return response;
        } catch (error: any) {
            console.error('[error foraging User]', error);
            throw error;
        }
    },

    /**
     * อัปเดต user
     */
    async updateUser(id: number, data: UpdateUserRequest): Promise<UpdateUserResponse> {
        try {
            console.log('[start][updateUser] id: ', id, ' data: ', data);

            const requestParams: UpdateUserOperationRequest = {
                id: id,
                updateUserRequest: data
            };

            const response = await userManagementApi.updateUser(requestParams);
            console.log('[end][updateUser] response: ', response);

            return response;
        } catch (error: any) {
            console.error('[error][updateUser]', error);
            throw error;
        }
    },

    /**
     * ลบ user
     */
    async deleteUser(id: number): Promise<any> {
        try {
            console.log('[start][deleteUser] id: ', id);

            const requestParams: DeleteUserRequest = {
                id: id
            };

            const response = await userManagementApi.deleteUser(requestParams);
            console.log('[end][deleteUser] response: ', response);

            return response;
        } catch (error: any) {
            console.error('[error][deleteUser]', error);
            throw error;
        }
    },

    /**
     * ดึงข้อมูล user ตาม id
     */
    async getUserById(id: number): Promise<UserResponse> {
        try {
            console.log('[start][getUserById] id: ', id);

            const requestParams: GetUserByIdRequest = {
                id: id
            };

            const response = await userManagementApi.getUserById(requestParams);
            console.log('[end][getUserById] response: ', response);

            return response;
        } catch (error: any) {
            console.error('[error][getUserById]', error);
            throw error;
        }
    }
};

