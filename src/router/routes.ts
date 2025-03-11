export enum Routes {
    auth = '/auth',
    home = '/',
    datacenters = '/data-centers',
    storage = '/data-centers/:id/storage',
    addDevice = '/data-centers/:id/storage/add-device',
    rooms = '/data-centers/:id',
}


export const goTo = (route: string, param: string | number) => {
    return route + '/' + param;
};
//
// export const goToWithQuery = (route: string, param: any) => {
//     let path = route + '?';
//     if (param)
//         for (const key in param) {
//             if (path.substr(path.length - 1) !== '?')
//                 path += '&';
//             path += key + '=' + param[`${key}`];
//         }
//     return path;
// };
