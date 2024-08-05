export const constants = {
  API_BASE_URL: process.env.BACKEND_API_BASE_URL,

  THEME: {
    LIGHT: "light",
    DARK: "dark",
  },

  API_URLS: {
    ALERT: "http://172.29.25.0:8080/api/alerts",

    CASE: "http://172.29.25.0:8080/api/case",
    SEARCH_CASE: `http://172.29.25.0:8080/api/case?searchText=inputText`,
    PAGINATE_CASE: `http://172.29.25.0:8080/api/case?page=input&limit=count`,

    USER_LIST: "http://172.29.25.0:8080/api/users/analystList",
  },
};
