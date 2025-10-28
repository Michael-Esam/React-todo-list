import { createContext , useReducer} from "react";
import todosReducer from "../reducers/todosReducer";

export const TodoContext = createContext([])

export const TodosProvider = ({children}) =>{
    const [todos,todosDispatch]= useReducer(todosReducer,[])
    return(
        <TodoContext.Provider value={{todos , todosDispatch}}>
            {children}
        </TodoContext.Provider>

    )
}