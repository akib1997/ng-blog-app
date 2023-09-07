import { environment } from '@env';

export const apiConfig = (endpoint: string): string => {
  const baseUrl = `${environment.apiUrl}${
    environment.version ? `/${environment.version}` : ''
  }`;

  return `${baseUrl}/${endpoint}`;
};
