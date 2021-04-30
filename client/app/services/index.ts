import request from '@app/utils/request';

async function getExample(props: any) {
    const res = await request({
        method: 'POST',
        url: '/doc/search/global',
        data: props,
    });
    return res;
}

export { getExample };
