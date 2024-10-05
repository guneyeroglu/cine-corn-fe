interface IEnv {
  apiUrl: string;
}

// const baseApi: string = 'http://127.0.0.1:8080'; // dev
const baseApi: string = 'https://cine-corn.up.railway.app'; // prod
const apiUrl: string = `${baseApi}/api/v1`;

export const environment: IEnv = {
  apiUrl,
};
