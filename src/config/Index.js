// const mode = process.env.VUE_APP_MODE

// export const productionDomain = 'https://taskformbackend.herokuapp.com'

// const STAGING_API = 'https://dd-taskform-mentoring.herokuapp.com'
// const DEV_API = 'http://localhost:3001'

// export const localDomain = 'http://localhost:8080'

// export const API = mode === "PRODUCTION" ? productionDomain : mode === "STAGING" ? STAGING_API : DEV_API

export const API = 'https://distrodakwah-backend-staging.herokuapp.com'

// export const getHeader = function () {

//     // debugger
//     if (window.localStorage.getItem("authTokenTaskReseller") === null) {
//         return;
//     }

//     const tokenData = window.localStorage.getItem("authTokenTaskReseller");
//     const headers = {
//         Accept: "application/json",
//         Authorization: "Bearer " + tokenData
//     };

//     return headers;
// };