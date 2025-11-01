import { authService } from "./auth/auth.service";
import { Configuration } from "./generated-api";

export const apiConfigurations = new Configuration({
    credentials: 'include',
    basePath: import.meta.env.VITE_API_PORT ? `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api` : '/api',
    headers: {
        'Authorization': `Bearer ${authService.getToken()}`
    }
});
