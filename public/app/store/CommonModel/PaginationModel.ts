import { types } from 'mobx-state-tree';
import { DEFAULT_PAGE_SIZE } from '@app/utils/const';

export interface PaginationModelInterface {
    rowCount: any;
    pageSize: any;
    pageCount: any;
    currPage: any;
    [key: string]: any;
}

const defInit: PaginationModelInterface = {
    rowCount: 0,
    pageSize: DEFAULT_PAGE_SIZE,
    pageCount: 0,
    currPage: 1,
};

const properties: PaginationModelInterface = {
    rowCount: types.optional(types.number, defInit.rowCount),
    pageSize: types.optional(types.number, defInit.pageSize),
    pageCount: types.optional(types.number, defInit.pageCount),
    currPage: types.optional(types.number, defInit.currPage),
};
const model = types.model('PaginationModel', properties);

export { model, properties, defInit };
