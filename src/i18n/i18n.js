import i18n from 'i18next';
import backend from 'i18next-http-backend';
import axiosInstance from "../axiosInstance";

export const loadResources = async(locale:string)=>{
    return await axiosInstance.get(`/crm-util/${locale}/translations/`)
        .then((response) => {
            console.log('response.data', response.data)
            return response.data})
        .catch((error) => {console.log('Error getting the translations',error); })
}


// const backendOptions = {
//     loadPath: '{{lng}}|{{ns}}',
//     request: (options:any, url:any, payload:any, callback:any) => {
//         try {
//             console.log('i18n.language',i18n.language)
//             loadResources('de_DE').then((response) => {
//                 // console.log('response din i18', response)
//                 // i18n.addResourceBundle('de', 'translations', response);
//                 // callback(null, {
//                 //     data:
//                 //         { de:
//                 //                 { translation: response }
//                 //         },
//                 //     status: 200,
//                 // });
//             });
//         } catch (e) {
//             console.error(e);
//             callback(null, {
//                 status: 500,
//             });
//         }
//     },
// };

i18n
    .use(backend)
    .init({
        // backend: backendOptions,
        fallbackLng: ["de_DE","pl_PL","de_AT","tr_TR","nl_NL"],
      //  lng: 'de',
        debug: false,
        load:"languageOnly",
        ns: ["translations"],
        supportedLngs: ['de', 'pl','nl','tr'],
        defaultNS: "translations",
        keySeparator: false,
        interpolation: {
            escapeValue: false,
            formatSeparator: ","
        },
        react: {
            wait: true
        }
    });

export default i18n;
