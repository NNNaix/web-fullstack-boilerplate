import { notification as baseNotification } from 'antd';
import { NotificationApi as BaseNotificationApi } from 'antd/es/notification';

export type NotificationApi = BaseNotificationApi;
const notification: NotificationApi = {
    ...baseNotification,
};

export default notification;
