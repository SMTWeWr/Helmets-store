import React, {useState} from 'react';
import classNames from "classnames";
import {Button} from "../Header/Button";


const ItemsBlock = ({id, name, imageUrl, price, sizes, onClickAddToCart, inCartCount}) => {
    const availableSize = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    const [activeSize, setActiveSize] = useState(sizes[0]);
    const [open, setOpen] = useState(false)

    const handleAddToCart = () => {
        const obj = {
            id,
            name,
            imageUrl,
            price,
            sizeName: availableSize[activeSize],
            size: activeSize
        }
        onClickAddToCart(obj)
    }

    const changeSize = (index) => {
        setActiveSize(index)
    }

    const onMouseOverHandler = () => {
        setOpen(true)
    }

    const onMouseLeaveHandler = () => {
        setOpen(false)
    }

    return (
        <div className="items-block" onMouseOver={onMouseOverHandler} onMouseLeave={onMouseLeaveHandler}>
            <div className="items-block__wrapper">
                <img
                    className="items-block__image"
                    src={imageUrl}
                    alt="items"
                />
                <h4 className="items-block__title">{name} {availableSize[activeSize]}</h4>
                <div className="items-block__selector">
                    <div className="items-block__bottom">
                        <div className="items-block__price">{price} грн</div>
                        <Button onClick={handleAddToCart} className="button button--add" outline>
                            <span>Купить</span>
                            {inCartCount && <i>{inCartCount}</i>}
                        </Button>
                    </div>
                    <span>В наличии</span>
                    {open && <div className='items-block__selector--extra'>
                        <span>Размер</span>
                        <ul>
                            {availableSize.map((size, index) => <li
                                onClick={() => changeSize(index)}
                                className={classNames({
                                    active: activeSize === index,
                                    disabled: !sizes.includes(index)
                                })}
                                key={size + index}>{size}</li>)}
                        </ul>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default ItemsBlock
