import * as qs from 'qs';
import * as _ from 'lodash';
import { IQueryOptions } from '../interfaces/core/IQueryOptions';

export const PrepareHttpQuery = (options?: IQueryOptions, addQueryPrefix: boolean = true): string => {
  const query: any = {};
  query.pageSize = _.get(options, 'pageSize', 15);
  query.page = _.get(options, 'page', 1);
  query.order = _.get(options, 'order');
  const search = _.get(options, 'search', {});
  Object.keys(search).forEach(key =>
    query[key] = (search as any)[key]
  );
  return qs.stringify(query, { addQueryPrefix, arrayFormat: 'repeat' });
};

export const CleanQueryParam = (options?: IQueryOptions): IQueryOptions => {
  const pesquisaCopy = { ...options?.search };
  Object.entries((options?.search as any)).forEach(([key, value]) => {
    if (value == null || value === '') {
      delete (pesquisaCopy as any)[key];
    }
  });
  if (options)
    options.search = pesquisaCopy;
  return options as any;
};
