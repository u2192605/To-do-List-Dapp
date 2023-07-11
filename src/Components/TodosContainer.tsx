import React, { FC, Fragment } from "react";
import { TodoItem } from "./TodoItem";
import { Todo } from "../Types/Todo";
import { Card } from "./Card";

import { v4 as uuidv4 } from 'uuid';

interface Props {
    category: string;
    todos: Todo[];
}
export const TodosContainer: FC<Props> = ({category,todos})=>{
    return(
        <Card vertical={true}>
            <h3>{category}</h3>
            <ul style={{listStyle: 'none'}}>
                {todos.map((value)=>{
                    return(
                        <li key={uuidv4()}>
                            <TodoItem todo={value}></TodoItem>
                        </li>
                    )
                })}
            </ul>
        </Card>
    )
}