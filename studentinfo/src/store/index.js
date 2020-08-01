import { createStore, combineReducers, compose, applyMiddleware  } from "redux";
//import rootReducer from "../reducer";
import dataReducer from '../reducer/data'
import statusReducer from '../reducer/status'
import thunk from "redux-thunk";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {
    status:{
        isLoading: true,
        errMess: ""
    },
    data:{
        students: [],
        projects: [],
        Total: 0,
        totalProject: 0,
        limit: 5,
        show: false,
        student:{
            firstname: "",
            surname: "",
            email: "",
            dateofbirth: ""
        },
        project:{
            projectname: "",
            description: "",
            repourl: "",
            liveurl: "",
            studentid: 0
        },
        
        
    }
  
   
  
};
const bigReducer = combineReducers({ status: statusReducer, data: dataReducer });

export default function configureStore() {
  return createStore(
    bigReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
}