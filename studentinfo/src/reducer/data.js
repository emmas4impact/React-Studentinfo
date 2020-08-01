export default function (state = {}, action) {
    switch (action.type) {
    
      case "GET_STUDENT":
            return {
                ...state,
                students: action.payload
            };
            case "GET_PROJECT":
              return {
                  ...state,
                  projects: action.payload
              };
        
    
      default:
        return state;
    }
  }