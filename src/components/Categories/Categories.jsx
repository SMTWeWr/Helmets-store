import React from "react";

export const Categories = React.memo(({onSelectCategories, activeCategory}) => {
    const items = ['AGV', 'Shoei', 'Icon']

    const selectItem = (index) => {
        onSelectCategories(index)
    }

    return (
        <ul>
            <li onClick={() => selectItem(null)} className={activeCategory === null ? 'active' : ''}>Все</li>
            {items && items.map((i, index) => <li onClick={() => selectItem(index)}
                                                  className={activeCategory === index ? 'active' : ''} key={i}>{i}</li>)}
        </ul>
    )
})