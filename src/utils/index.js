const { default: apiClient } = require("../api/config");

class Utils {
    static capitalizeEachWord = (name) => {
        if (name && typeof name === 'string') {
          return name.replace(/\b\w/g, match => match.toUpperCase());
        } else {
          return "";
        } 
    };

    static GetTableData = () => {
        return {
            "title":  "",
            "rows": "",
            "action":true,
            "actionData": [],
            "searchBar": true,
            "searchUrl": "",
            "export": true,
            "exportDataUrl":``,
            "print": true,
            "printUrl": ``,
            "reset": true,
            "pagination": true,
            "paginationUrl": ``,
            "totalPage": 1,
            "totalItemCount":1,
            "autoSuggestionUrl":"",
            "sorting": true,
            "initialSort":'name',
            "initialSortOrder":'asc',
            "getTableData":this.GetTableData,
            "allAction": "",
          }
    }

    static getFormatedDate = (dateString) => {
      const dateObj = new Date(dateString);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      
      let day = dateObj.getDate();
      const month = monthNames[dateObj.getMonth()];
      const year = dateObj.getFullYear();
      
      if(day < 10){
        day = "0"+day;
      }
      const formattedDate = `${day}-${month}-${year}`;
      
      return formattedDate;
    }
    

    static handleViewFile = async (fileUrl) => {
      try {
        const response = await apiClient.get(fileUrl, {
          responseType: 'blob',
        });
  
        const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
        window.open(url);
  
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 1000);
      } catch (error) {
        console.error('View failed:', error);
      }
    };

    static appendTokenToUrl = (url, token) => {
      if(!url) return null;
      const hasQueryParams = url.includes('?');
      return `${url}${hasQueryParams ? '&' : '?'}token=${token}`;
    }
    
    static getToken (){
      return  JSON.parse(localStorage.getItem('EmployeeToken'));
    }

    static formatDateForDateInput = (dateString) => {
      if(!dateString){
        return "";
      }
  
      const parts = dateString.split("-");
      return `${parts[2]}-${parts[0]}-${parts[1]}`;
    };
}

module.exports = Utils;