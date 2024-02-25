export interface FetchParams {
  method: string;
  path?: string;
  tag: string;
  headers?: Record<string, string>;
  payload?: Record<string, unknown>;
  state?: 'static' | 'dynamic';
  responseType?: 'json' | 'text' | 'blob';
  timeout?: number;
}

export interface FetchResponse {
  status: number;
  ok: boolean;
  body: Record<string, unknown> | string | Blob;
}

export interface RequestInit {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  withCredentials?: boolean;
  next?: {
    tags: string[];
  };
  cache?: 'default' | 'no-store' | 'force-cache';
}
