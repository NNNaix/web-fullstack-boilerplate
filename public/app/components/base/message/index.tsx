import { message as baseMessage } from 'antd';
import { MessageApi as BaseMessageApi } from 'antd/es/message';

export type MessageApi = BaseMessageApi;
const message: MessageApi = {
    ...baseMessage,
};

export default message;
