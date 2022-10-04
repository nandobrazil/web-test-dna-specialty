import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import * as _ from 'lodash';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { IHttpResult } from '../../interfaces/core/IHttpResult';
import { environment } from 'src/environments/environment';
import { PrepareHttpQuery } from '../../utils/query.utils';
import { IQueryOptions } from '../../interfaces/core/IQueryOptions';
import { IResultPaginated } from '../../interfaces/core/IResultPaginated';
import { ISelectItem } from '../../interfaces/core/ISelectItem';


export abstract class BaseService<T> {

  urlBaseDefault: string = '';
  urlBase: string = '';
  http: HttpClient;
  confirmationSrv: ConfirmationService;

  protected constructor(
      public url: string,
      @Inject(HttpClient) http: HttpClient,
      @Inject(ConfirmationService) confirmationSrv: ConfirmationService
  ) {
      this.urlBaseDefault = this.urlBase = `${environment.apiUrl}/${this.url}`;
      this.http = http;
      this.confirmationSrv = confirmationSrv;
  }

  setParamsFromUrl(fields: string[], values: any[]) {
      fields.forEach((f, i) => {
          this.urlBase = this.urlBaseDefault.replace(f, values[i]);
      });
  }

  // tslint:disable-next-line: no-shadowed-variable
  public async GetAllUrl<T>({url, options}: { url: string; options?: IQueryOptions; }): Promise<IHttpResult<T>> {
      const result = await lastValueFrom(this.http.get<IHttpResult<T>>(`${url}${PrepareHttpQuery(options)}`));
      if (result.success) {
          return (result.data as any);
      } else {
          return [] as any;
      }
  }

  public async GetAllPaginated(options?: IQueryOptions): Promise<IResultPaginated<T>> {
      return await lastValueFrom(this.http.get<IResultPaginated<T>>(`${this.urlBase}${PrepareHttpQuery(options)}`));
  }

  public async GetAll(options?: IQueryOptions): Promise<T[]> {
      const {success, data} = await lastValueFrom(this.http.get<IHttpResult<T[]>>(`${this.urlBase}${PrepareHttpQuery(options)}`));
      if (success) {
          return _.get(data, 'data') || data;
      } else {
          return undefined as any;
      }
  }

  public async GetById(id: number): Promise<IHttpResult<T>> {
      const result = await lastValueFrom(this.http.get<IHttpResult<T>>(`${this.urlBase}/${id}`));
      return {
          success: result.success,
          data: _.get(result, 'data.data') || result.data,
      };
  }

  public async Get(): Promise<IHttpResult<T>> {
      const result = await this.http.get(`${this.urlBase}`).toPromise();
      return result as IHttpResult<T>;
  }

  public async GetAllOptions(): Promise<IHttpResult<ISelectItem[]>> {
    const result = await lastValueFrom(this.http.get<IHttpResult<ISelectItem[]>>(`${this.urlBase}/options`));
    return {
      success: result.success,
      data: _.get(result, 'data.data') || result.data,
  };
  }

  public post(model: T, url?: string): Promise<IHttpResult<T>> {
      return this.http.post(url ? url : this.urlBase, model).toPromise() as Promise<IHttpResult<T>>;
  }

  public put(model: T): Promise<IHttpResult<T>> {
      return this.http.put(`${this.urlBase}/${(model as any).id}`, model).toPromise() as Promise<IHttpResult<T>>;
  }

  public deleteFlush(id: number): Promise<IHttpResult<T>> {
      return this.http.delete(`${this.urlBase}/${id}`).toPromise() as Promise<IHttpResult<T>>;
  }

  public async delete(model: T, options?: { message?: string, field?: string, idKey?: string, justification?: string }) {
      const message = _.get(options, 'message');
      const field = _.get(options, 'field');
      const idKey  = _.get(options, 'idKey');
      return new Promise((resolve, reject) => {
          this.confirmationSrv.confirm({
              message: message || `Deseja realmente excluir o(a) ${(model as any)[field ? field : 'name']}?`,
              key: 'deleteConfirm',
              acceptLabel: 'Sim',
              rejectLabel: 'Não',
              accept: async () => {
                  try {
                      const result = (!options || !options.justification) ?
                          await lastValueFrom(this.http.delete(`${this.urlBase}/${(model as any)[idKey ? idKey : 'id']}`)) :
                          await lastValueFrom(this.http.delete(`${this.urlBase}/${(model as any)[idKey ? idKey : 'id']}`
                              + `${PrepareHttpQuery({search: {justificativa: options.justification}})}`));
                      resolve((result as any)['success']);
                  } catch (error) {
                      reject(error);
                      console.error(`delete-${this.url}-${(model as any)[idKey ? idKey : 'id']}-reason:`, error);
                  }
              },
              reject: () => {
                  resolve(false);
              }
          });
      });
  }
}
