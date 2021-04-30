import { ISimpleType, types } from 'mobx-state-tree';
import { UpdateFnPropsType } from '@app/types/type';
import { defInit as PaginationModelDefInit, model as PaginationModel } from './PaginationModel';

export default function WithPaginationModel<T extends any>(dataModel: ISimpleType<T>) {
    const defInit = {
        data: [],
        pagination: PaginationModelDefInit,
    };

    const properties = {
        data: types.array(dataModel),
        pagination: PaginationModel,
    };
    const model = types.optional(
        types.model('WithPaginationModel', properties).actions((self) => {
            const updateData = (props: UpdateFnPropsType<T[]>) => {
                if (typeof props === 'function') {
                    updateData(props(self.data));
                } else {
                    self.data.clear();
                    self.data.push(...props);
                }
            };
            const updatePagination = (props: UpdateFnPropsType<typeof PaginationModelDefInit>) => {
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
        }),
        defInit,
    );

    return { model, properties, defInit };
}
