import type { FetchParams, FetchResponse, RequestInit } from './enhancedFetch.d';

async function enhancedFetch({
  method,
  path = '',
  tag,
  headers = {},
  payload,
  state = 'static',
  responseType = 'json',
}: FetchParams): Promise<FetchResponse> {
  const options: RequestInit = {
    method,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    next: {
      tags: [tag],
    },
    cache: state === 'dynamic' ? 'no-store' : 'force-cache',
    body: payload ? JSON.stringify(payload) : undefined,
  };

  try {
    const result = await fetch(`${process.env.API_URL}${path}`, options);

    let body;
    switch (responseType) {
      case 'json':
        body = await result.json();
        break;
      case 'text':
        body = await result.text();
        break;
      case 'blob':
        body = await result.blob();
        break;
      default:
        body = await result.json();
    }

    return {
      status: result.status,
      ok: result.ok,
      body,
    };
  } catch (error: unknown) {
    let errorMessage: string;
    if (error instanceof Error) {
      errorMessage = `An error occurred while fetching data: ${error.message}`;
      return {
        status: error.name === 'AbortError' ? 408 : 500,
        ok: false,
        body: { message: errorMessage },
      };
    }
    errorMessage = 'An unknown error occurred';
    return {
      status: 500,
      ok: false,
      body: { message: errorMessage },
    };
  }
}

export default enhancedFetch;
