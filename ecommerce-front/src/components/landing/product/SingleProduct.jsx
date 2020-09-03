import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import styled from 'styled-components';
import { getCertainProduct } from '../../../actions/productAction';
import { addToCart } from '../../../actions/cartAction';


const SingleProduct = ({ match, product: { product, loading, error}, getCertainProduct, addToCart}) => {
    const { productId } = match.params;
    const [copyDescription, setCopyDescription] = useState({
        text: '',
        showReadMore: false
    });

    useEffect(() => {
        getCertainProduct(productId);
    }, [getCertainProduct]);

    useEffect(()=> {
        if(product && product.description.length > 530){
            descriptionTruncate(product.description)
        }else if(product) {
            setCopyDescription({
                text: product.description    
            })
        };
    }, [product])

    const descriptionTruncate = (string) => {
        const newString = string.slice(0, 530).concat('...');
        setCopyDescription({
            text: newString,
            showReadMore: true
        })
    }
    const handleShowMoreDescription = () => {
        setCopyDescription({
            text: product.description,
            showReadMore: false
        })
    }

    const handleAddToCart = () => {
        const productForCart = {
            _id: product._id,
            name: product.name,
            category: product.category,
            imageURL: product.imageURL,
            price: product.price
        }
        addToCart(productForCart)
    }

    return (
        <Wrapper>
            {loading || !product ? <Spinner/> : 
                <>{error ? <ErrorMsg>{error}</ErrorMsg> :
                <>
                    <TitleSection>
                        <h1>{product.name}</h1>
                        <div>
                            <strong>Category:</strong>
                            <span>{product.category.name}</span>
                        </div>
                    </TitleSection>
                    <ContentSection>
                        <ImgWrap>
                            <img src={product.imageURL} alt={product.name}/>
                        </ImgWrap>
                        <ContentWrap>
                            <Price>${product.price}</Price>
                            {product.quantity === 0? 
                                <SoldOutBtn>Sold Out</SoldOutBtn>:
                                <AddToCart onClick={handleAddToCart}>Add to Cart</AddToCart>
                            }
                            <Description>
                                <h3>Description</h3>
                                <p> {copyDescription.text} 
                                    {copyDescription.showReadMore && <span onClick={handleShowMoreDescription}>Read More</span>} 
                                </p> 
                            </Description>
                        </ContentWrap>
                    </ContentSection>
                </>
                }</>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    padding: 30px 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const TitleSection = styled.section`
    width: 100%; 
    border-bottom: solid 1px ${props => props.theme.lightGray};
    padding-bottom: 10px;
    h1 {
        font-weight: 400;
        font-size: 1.7rem;
        line-height: 1.5rem;
        margin-bottom: 4px;
        word-spacing: 0.5rem;
    }
    div {
        font-size: 0.9rem;
        font-weight: 300;
        margin-top: 10px;
        span {
            margin-left: 5px;
        }
    }
`

const ContentSection = styled.section`
    width: 100%;
    margin-top: 20px;
    display: flex;
`
const ImgWrap = styled.div`
    width: 50%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        height: 100%;
        width: 50%;
        object-fit: cover;
    }
`
const ContentWrap = styled.div`
    width: 50%;
`
const Price = styled.div`
    font-size: 2rem;
    font-weight: 700;
    margin: 20px 0px;
    color: ${props => props.theme.lightBlue};
`
const AddToCart = styled.button`
    all: unset;
    font-size: 1.1rem;
    width: 100%;
    height: 45px;
    text-align: center;
    cursor: pointer;
    color: ${props => props.theme.primWhite};
    background-color: ${props => props.theme.interactive};
    transition: 0.2s;
    &:hover {
        background-color: ${props => props.theme.interactiveDark};
    }
`
const SoldOutBtn = styled.button`
    all: unset;
    font-size: 1.1rem;
    width: 100%;
    height: 45px;
    text-align: center;
    color: ${props => props.theme.primWhite};
    background-color: ${props => props.theme.lightGray};
`

const Description = styled.div`
    margin-top: 20px;
    h3 {
        
    }
    p {
        color: ${props => props.theme.darkGray};
        line-height: 1.4rem;
        /* To display data with space and indentation */
        white-space: pre-line;
        span {
            margin-left: 10px;
            color: ${props => props.theme.interactive};
            cursor: pointer;
        }
    }
`


const ErrorMsg = styled.h1`
    color: ${props => props.theme.brandBlue};
    margin: auto;
`

const mapStateToProps = state => {
    return {
        product: state.product
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCertainProduct: (id) => dispatch(getCertainProduct(id)),
        addToCart: (product) => dispatch(addToCart(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps )(SingleProduct);