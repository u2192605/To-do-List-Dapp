import { useDispatch, useSelector } from 'react-redux'
import './addItem.css'
import { RootState } from '../redux/store'
import { setColor, setContent } from '../redux/itemSlice'
import React, { FC, useState } from 'react'
import { ItemType } from '../Types/Item'
interface Props {
    onAddItem: (item: ItemType) => void;
    canChooseColor?: boolean;
}
export const AddItem: FC<Props> = ({ onAddItem, canChooseColor }) => {
    const [clicked, setClicked] = useState(false)

    const { content, color } = useSelector((state: RootState) => state.item.input)
    const dispatch = useDispatch()
    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setContent(event.target.value))
    }

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setColor(event.target.value))
    }

    const handleOnNewClicked = () => {
        setClicked(!clicked)
    }

    const handleOnAddItem = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation()
        onAddItem({ content })
        setClicked(false)
    }
    const display = clicked ? "flex" : "none";
    return (
        <div className={'floating-action-btn'}
            onClick={handleOnNewClicked}
        >
            <i>+</i>
            <div style={{ display: display, backgroundColor: color ?? '#FFFFFF' }} className={"overlay"}
            >
                <textarea placeholder="Enter item name"
                    value={content}
                    onChange={(event) => handleContentChange(event)}
                    onClick={(e) => e.stopPropagation()}
                />
                <div>
                    {
                        canChooseColor?
                            (<input type="color" className='btn'
                                value={color}
                                onChange={(event) => handleColorChange(event)}
                                onClick={(e) => e.stopPropagation()}
                            />): null

                    }
                    <input type="button" className='btn'
                        onClick={handleOnAddItem} value='Add'
                    />

                </div>
            </div>
        </div>
    )

}