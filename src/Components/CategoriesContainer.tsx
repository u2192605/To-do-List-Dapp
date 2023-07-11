import React, { FC, Fragment } from "react";
import { Card } from "./Card";
import { Category } from "./Category";
import { v4 as uuidv4 } from 'uuid';


interface Props {
    categories: string[];
}

export const CateogoriesContainer: FC<Props> = ({ categories }) => {
    return (
        <Fragment>
            {/* <h3>Categories</h3> */}
            <Card vertical={true}>
                {/* <ul style={{ listStyleType: 'none' }}> */}
                    {categories.map((value,) => 
                        <Category title={value}></Category>
                    )}
                {/* </ul> */}
            </Card>

        </Fragment>
    )
};