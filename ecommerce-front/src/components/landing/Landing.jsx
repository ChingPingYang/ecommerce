import React, { useEffect, useState }from 'react';
import { connect } from 'react-redux';
import { getAllProducts } from '../../actions/productAction';
import { getAllCategories } from '../../actions/categoryAction';
import styled from 'styled-components';
import SideFilter from './SideFilter';
import Match from './Match';
import Product from './Product';
import axios from 'axios';

const Landing = ({ product: {loading, products}, category, getAllProducts, getAllCategories }) => {
    const [ copyProducts, setCopyProducts ] = useState([]);
    const [ match, setMatch ] = useState();
    useEffect(() => {
        getAllProducts();
        getAllCategories();
        if(!loading) setCopyProducts([...products]);
    }, [loading, getAllProducts, getAllCategories]);
    
    const handleMatch = (e) => {
        let matchProducts = []
        switch(e.target.value) {
            case "Low-Hight":
                matchProducts = copyProducts.sort((p1, p2) => p1.price > p2.price ? 1 : -1);
                //set the match state to the selected match for sideFilter to use
                setMatch("Low-Hight");
                break;
            case "Hight-Low":
                matchProducts = copyProducts.sort((p1, p2) => p1.price < p2.price ? 1 : -1);
                setMatch("Hight-Low");
                break;
            case "Sold":
                matchProducts = copyProducts.sort((p1, p2) => p1.sold < p2.sold ? 1 : -1);
                setMatch("Sold");
                break;
            default:
                matchProducts = copyProducts;
                break;
        }
        setCopyProducts([...matchProducts])
    }

    const setNewCategories = async (selectedCategories, priceRange = {start: 0, end: 1000000}) => {
        console.log(priceRange)
        const body = JSON.stringify({
            filter: {
                price: {
                    start: priceRange.start,
                    end: priceRange.end
                },
                category: selectedCategories
            }
        })
        const config = {
            headers: {"Content-Type": "application/json" }
        }
        try {
            // 1. Get new data base on selected categories 
            const res = await axios.post('/api/product/search', body, config);
            let products = res.data;
            // 2. Filter the data with match state
            let matchProducts = []
            switch(match) {
                case "Low-Hight":
                    matchProducts = products.sort((p1, p2) => p1.price > p2.price ? 1 : -1);
                    setMatch("Low-Hight");
                    break;
                case "Hight-Low":
                    matchProducts = products.sort((p1, p2) => p1.price < p2.price ? 1 : -1);
                    setMatch("Hight-Low");
                    break;
                case "Sold":
                    matchProducts = products.sort((p1, p2) => p1.sold < p2.sold ? 1 : -1);
                    setMatch("Sold");
                    break;
                default:
                    matchProducts = products;
                    break;
            }
            // 3. Set data to products
            setCopyProducts(matchProducts);
        } catch(err) {
            console.log(err)
        }
    }
    
    return (
        <Wrap>
            <SideFilterWrap>
                {!category.loading && <SideFilter category={category} setNewCategories={setNewCategories}/>}
            </SideFilterWrap>
            <ProductListWrap>
                <Match handleMatch={handleMatch}/>
                <ProductWrap>
                    {copyProducts.length < 1 ? <h1>no</h1> : 
                        copyProducts.map(product => <Product key={product._id} product={product} /> )
                    }
                </ProductWrap>
            </ProductListWrap>
        </Wrap>
    )
}

const Wrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 40px;
`
const SideFilterWrap = styled.div`
    width: 30%;
    display: flex;
    justify-content: flex-end;
    border-right: solid 1px ${props => props.theme.lightGray};
`
const ProductListWrap = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    padding-left: 30px;
`
const ProductWrap = styled.div`
    width: 85%;
    display: flex;
    flex-wrap: wrap;
`


const Block = styled.div`
    width: 100px;
    height: 150px;
    background-color: blues;
    margin: 20px;
`

const mapStateToProps = state => {
    return {
        product: state.product,
        category: state.category
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllProducts: (sortBy) => dispatch(getAllProducts(sortBy)),
        getAllCategories: () => dispatch(getAllCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);