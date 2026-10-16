import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

import { useAuthStore } from '@/features/auth/stores/authStore';
import type { AuthResponse } from '@/features/auth/types';

const baseConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  // refresh 토큰이 담긴 HttpOnly 쿠키를 함께 전송한다.
  withCredentials: true,
};

export const api = axios.create(baseConfig);

// 재발급 요청은 인터셉터를 타지 않는 별도 인스턴스로 보내 무한 루프를 막는다.
const refreshClient = axios.create(baseConfig);

let refreshPromise: Promise<string> | null = null;
let bootstrapPromise: Promise<void> | null = null;

export function refreshAccessToken() {
  refreshPromise ??= refreshClient
    .post<AuthResponse>('/api/v1/auth/refresh')
    .then(({ data }) => {
      const { accessToken, ...user } = data;
      useAuthStore.getState().setAuth(accessToken, user);
      return accessToken;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

// 새로고침 직후 한 번만 세션 복구를 시도한다.
export function bootstrapAuth() {
  bootstrapPromise ??= refreshAccessToken()
    .then(() => undefined)
    .catch(() => {
      useAuthStore.getState().clearAuth();
    })
    .finally(() => {
      useAuthStore.getState().finishBootstrap();
    });

  return bootstrapPromise;
}

api.interceptors.request.use(async (config) => {
  // 세션 복구가 끝나기 전에 나간 요청이 토큰 없이 전송되지 않도록 대기한다.
  await bootstrapAuth();

  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!axios.isAxiosError(error) || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    const request = error.config as (InternalAxiosRequestConfig & { _retried?: boolean }) | undefined;
    if (!request || request._retried) {
      useAuthStore.getState().clearAuth();
      return Promise.reject(error);
    }

    request._retried = true;

    try {
      await refreshAccessToken();
      return await api(request);
    } catch (refreshError) {
      useAuthStore.getState().clearAuth();
      return Promise.reject(refreshError);
    }
  },
);
