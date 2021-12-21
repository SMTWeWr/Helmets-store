import React, {useCallback, useEffect} from 'react';
import {Categories} from "../components/Categories/Categories";
import {SortPopup} from "../components/Sort/SortPopup";
import ItemsBlock from "../components/ItemsBlock/ItemsBlock";
import {useDispatch, useSelector} from "react-redux";
import {filterActions} from "../redux/reducers/filters";
import {productsThunk} from "../redux/reducers/products";
import PreloaderBlock from "../components/ItemsBlock/PreloaderBlock";
import {cartActions} from "../redux/reducers/cartReducer";

export function Home() {
    const dispatch = useDispatch()

    const isLoaded = useSelector(state => state.products.isLoaded)

    const {items, category, sortBy, cartItems} = useSelector(state => {
        return {
            items: state.products.items,
            category: state.filters.category,
            sortBy: state.filters.sortBy,
            cartItems: state.cart.items
        }
    })

    const onSelectCategories = useCallback((index) => {
        dispatch(filterActions.setCategory(index))
    }, [dispatch])

    const onSelectSort = useCallback((typeObj) => {
        dispatch(filterActions.setSortBy(typeObj))
    }, [dispatch])

    const onClickAddToCart = (obj) => {
        dispatch(cartActions.addToCart(obj))
    }

    useEffect(() => {
            dispatch(productsThunk(category, sortBy))
    }, [category, sortBy, dispatch])

    const emptyArray = Array(10).fill(0)

    return (
        <div>
            <div className="container">
                <div className="content__top">
                    <div className="categories">
                        <Categories onSelectCategories={onSelectCategories} activeCategory={category}/>
                    </div>
                    <SortPopup onSelectSort={onSelectSort} currentSort={sortBy.name}/>
                </div>
                <h2 className="content__title">Все мотошлемы</h2>
                <div className="content__items">
                    {isLoaded ? items.map((obj) =>
                            <ItemsBlock onClickAddToCart={onClickAddToCart} key={obj.id}
                                        inCartCount={cartItems[obj.id] && cartItems[obj.id].items.length}  {...obj} />)
                        : emptyArray.map((_, i) => <PreloaderBlock key={i}/>)
                    }
                </div>
            </div>
        </div>
    )
}
