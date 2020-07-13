import { Instance, types } from 'mobx-state-tree';
import { UpdateFnPropsType } from '@app/typings/type';
import { IAnyType } from 'mobx-state-tree/dist/internal';
import { defInit as PaginationModelDefInit, model as PaginationModel } from './PaginationModel';

export default function WithPaginationModel(dataModel: IAnyType) {
    const defInit = {
        data: [],
        pagination: PaginationModelDefInit,
    };

    const properties = {
        data: types.optional(types.array(dataModel), defInit.data),
        pagination: types.optional(PaginationModel, defInit.pagination),
    };
    const model = types.model('PaginationModel', properties).actions((self) => {
        const updateData = (props: UpdateFnPropsType<Instance<typeof self.data>>) => {
            if (typeof props === 'function') {
                updateData(props(self.data));
            } else {
                self.data.clear();
                self.data.push(...props);
            }
        };
        const updatePagination = (props: UpdateFnPropsType<Instance<typeof self.pagination>>) => {
            if (typeof props === 'function') {
                updatePagination(props(self.pagination));
            } else {
                self.pagination = props;
            }
        };
        return {
            updatePagination,
            updateData,
        };
    });

    return { model, properties, defInit };
}
