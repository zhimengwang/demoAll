import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
export interface IRequestOptions {
  headers?: any;
}

export class catsService {
  /**
   * Create cat
   */
  cats(params: ICatsParams, options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      params = params || <ICatsParams>{};
      const configs: AxiosRequestConfig = { ...options, method: 'post' };
      configs.headers = {
        ...options.headers,
        'Content-Type': 'application/json'
      };

      let url = '/cats';

      configs.url = url;

      let data = { ...params['createCatDto'] };

      configs.data = data;

      axios(configs)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  /**
   *
   */
  cats(params: ICatsParams1, options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      params = params || <ICatsParams1>{};
      const configs: AxiosRequestConfig = { ...options, method: 'get' };
      configs.headers = {
        ...options.headers,
        'Content-Type': 'application/json'
      };

      let url = '/cats/{id}';
      url = url.replace('{id}', params['id'] + '');

      configs.url = url;

      let data = null;

      configs.data = data;

      axios(configs)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
export interface ICatsParams {
  /**  */
  createCatDto: CreateCatDto;
}
export interface ICatsParams1 {
  /**  */
  id: string;
}
export class CreateCatDto {
  /**  */
  name: string;

  /**  */
  age: number;

  /**  */
  breed: string;

  constructor(data?: any) {
    if (data) {
      this['name'] = data['name'];
      this['age'] = data['age'];
      this['breed'] = data['breed'];
    }
  }
}
