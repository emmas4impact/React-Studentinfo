export default function (state = {}, action) {
    switch (action.type) {
    
      case "SET_LOADING":
        return {
          ...state,
          status:{
            isLoading: action.payload,
            
        },
        
        };
        case "STOP_LOADING":
            return {
                ...state,
                status:{
                    isLoading: action.payload,
                    
                },
            };
        case "ERR_MSG":
            return {
                ...state,
                status:{
                    errMess: action.payload,
                    
                },
            };
        
    
      default:
        return state;
    }
  }