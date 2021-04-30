import { ISimpleType, types } from 'mobx-state-tree';
import { UpdateFnPropsType } from '@app/types/type';

export default function WithArrayUpdateFnModel<T extends any>(dataModel: ISimpleType<T>) {
    const defInit = {
        data: [],
    };

    const properties = {
        data: types.array(dataModel),
    };
    const model = types.optional(
        types.model('WithArrayUpdateFnModel', properties).actions((self) => {
            const updateData = (props: UpdateFnPropsType<T[]>) => {
                if (typeof props === 'function') {
                    updateData(props(self.data));
                } else {
                    self.data.clear();
                    self.data.push(...props);
                }
            };
            return {
                updateData,
            };
        }),
        defInit,
    );

    return { model, properties, defInit };
}
