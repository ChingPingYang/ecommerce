import React, { useEffect, useState }from 'react';
import { connect } from 'react-redux';
import { getAllProducts } from '../../actions/productAction';
import styled from 'styled-components';
import SideFilter from './SideFilter';
import Match from './Match';
import Product from './Product';

const Landing = ({ product: {loading, products}, getAllProducts }) => {
    const [ copyProducts, setCopyProducts ] = useState([]);

    useEffect(() => {
        getAllProducts();
        if(!loading) setCopyProducts([...products]);
    }, [loading]);
    
    const setMatch = (e) => {
        let matchProducts = []
        switch(e.target.value) {
            case "Low-Hight":
                matchProducts = copyProducts.sort((p1, p2) => p1.price > p2.price ? 1 : -1);
                break;
            case "Hight-Low":
                matchProducts = copyProducts.sort((p1, p2) => p1.price < p2.price ? 1 : -1);
                break;
            case "Sold":
                matchProducts = copyProducts.sort((p1, p2) => p1.sold < p2.sold ? 1 : -1);
                break;
            default:
                matchProducts = products;
                break;
        }
        setCopyProducts([...matchProducts])
    }

    return (
        <Wrap>
            <SideFilterWrap>
                <SideFilter />
            </SideFilterWrap>
            <ProductListWrap>
                <Match setMatch={setMatch}/>
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
    margin-top: 20px;
    /* border: solid 3px blue; */
`
const SideFilterWrap = styled.div`
    width: 30%;
    /* border: solid 1px purple; */
`
const ProductListWrap = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    padding-left: 30px;
    /* border: solid 1px red; */
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
        product: state.product
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllProducts: (sortBy) => dispatch(getAllProducts(sortBy))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);