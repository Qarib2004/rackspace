export enum Routes {
  auth = '/auth',
  register = '/register',
  store = '/store',
  login = '/login',
  home = '/',
  profile = '/profile',
  general = 'general',
  wihslist = '/wishlist',
  basket = '/basket',
  messages = 'messages',
  orders = 'orders',
  addresses = 'addresses',
  details = '/products/:id',
  producer = '/producer/:id',
  invoincingAddress = '/invoicing-address',
  deliveryMethod = '/delivery-method',
  payment = '/payment',
  help = '/help',
  checkout = '/', 
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
