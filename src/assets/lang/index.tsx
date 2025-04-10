// import { renderToStaticMarkup } from 'react-dom/server';
// import { az } from './az';
// import { en } from './en';
// import { ru } from './ru';
// import { useSelector } from 'react-redux';
// // import { RootState } from 'store/store.reducer';

// type LangDict = Record<string, string>;

// const useLocalization = () => {
//     const languages = useSelector((state: RootState) => state.root.locale) as LangDict | undefined;

//     return (
//         key: keyof typeof az | keyof typeof en | keyof typeof ru,
//         dynamicValues: Record<string, any> = {}
//     ): string => {
//         let formattedText = languages?.[key] || key;

//         Object.keys(dynamicValues).forEach((dynamicKey: string) => {
//             const dynamicValue = dynamicValues[dynamicKey];
//             const value = typeof dynamicValue === 'string'
//                 ? dynamicValue
//                 : renderToStaticMarkup(dynamicValue);
//             formattedText = formattedText.replace(`{${dynamicKey}}`, value);
//         });

//         return formattedText;
//     };
// };

// export default useLocalization;
