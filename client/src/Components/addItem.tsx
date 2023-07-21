import { useDispatch, useSelector } from 'react-redux'
import styles from './styles/addItem.module.css'
import { RootState } from '../redux/store'
import { setColor, setContent } from '../redux/itemSlice'
import React, { FC, useState } from 'react'
import { ItemType } from '../Types/Item'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
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
        clearInput()
        setClicked(!clicked)
    }

    const clearInput = ()=>{
        dispatch(setColor('#FFFFFF'))
        dispatch(setContent(''))
    }

    const handleOnAddItem = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation()
        onAddItem({ content, color })
        clearInput()
        setClicked(false)
    }
    const display = clicked ? "flex" : "none";
    return (
        <div className={styles.floatingActionBtn}
            onClick={handleOnNewClicked}
        >
            {clicked? <FontAwesomeIcon icon={faMinus}/>: <FontAwesomeIcon icon={faPlus}/>}
            
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
                            (<input type="color" className={styles.btn}
                                value={color}
                                onChange={(event) => handleColorChange(event)}
                                onClick={(e) => e.stopPropagation()}
                            />): null

                    }
                    <input type="button" className={styles.btn}
                        onClick={handleOnAddItem} value='Add'
                    />

                </div>
            </div>
        </div>
    )

}