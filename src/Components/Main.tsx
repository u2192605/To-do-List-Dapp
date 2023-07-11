import React, { Fragment} from "react";
import { TodosContainer } from "./TodosContainer";
import { CateogoriesContainer } from "./CategoriesContainer";
import { Todo } from "../Types/Todo";

export const Main = ()=>{
    const todos: Todo[] = [
        {title:'test1', finished:false},
        {title:'test2', finished:true}
    ]
    return (
        <Fragment>
            <CateogoriesContainer categories={['test1', 'test2']}/>
            {/* <TodosContainer todos={todos} category="test1"/> */}
        </Fragment>
    )
}