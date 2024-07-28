export const constants = { 
    API_BASE_URL: process.env.BACKEND_API_BASE_URL,

    THEME : {
        LIGHT : "light",
        DARK : "dark"
    },


    API_URLS : {
        ALERT : "http://192.168.42.39:3000/api/alerts",


        CASE : "http://192.168.42.39:3000/api/case",
        SEARCH_CASE: `http://192.168.42.39:3000/api/case/?searchText=inputText`,
        PAGINATE_CASE: `http://192.168.42.39:3000/api/case/?page=input&limit=count`,

        USER_LIST : "http://192.168.42.39:3000/auth/analystList",
    }
}