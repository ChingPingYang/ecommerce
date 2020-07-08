import React, { useEffect }from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getAllProducts } from '../../actions/productAction';

const Landing = ({ getAllProducts }) => {
    useEffect(() => {
        getAllProducts("Alaboda");
    }, [])
    return (
        <h3>landing page</h3>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        getAllProducts: (sortBy) => dispatch(getAllProducts(sortBy))
    }
}

export default connect(null, mapDispatchToProps)(Landing);