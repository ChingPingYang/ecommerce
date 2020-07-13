import React, { useEffect, useState }from 'react';
import { connect } from 'react-redux';
import { getAllProducts } from '../../actions/productAction';
import styled from 'styled-components';
import Match from './Match';
import Product from './Product';

const Landing = ({ product: {loading, products}, getAllProducts }) => {
    const [ copyProducts, setCopyProducts ] = useState([]);

    useEffect(() => {
        getAllProducts();
        if(!loading) setCopyProducts([...products]);
    }, [loading]);
    
    return (
        <Wrap>
            <SideFilterWrap>

            </SideFilterWrap>
            <ProductListWrap>
                <Match/>
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
    /* min-height: 580px; */
    border: solid 3px blue;
    display: flex;
    flex-direction: row;
`
const SideFilterWrap = styled.div`
    width: 30%;
    border: solid 1px purple;
`
const ProductListWrap = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    border: solid 1px red;
    padding-left: 80px;
`
const ProductWrap = styled.div`
    width: 1050px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border: solid 1px gray;
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