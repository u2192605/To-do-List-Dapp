import React, { FC, Fragment } from "react";
import { TodoItem } from "./TodoItem";
import { TodoType } from "../Types/Todo";
import { Card } from "./Card";

import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const TodosContainer = ()=>{
    const {category, todos} = useSelector((state: RootState) => state.todo)
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