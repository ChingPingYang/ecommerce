import React, { useEffect, useState }from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { getAllCategories } from '../../actions/categoryAction';
import { clearProduct } from '../../actions/productAction';
import SideFilter from './SideFilter';
import Match from './Match';
import Product from './Product';
import axios from 'axios';
import { media } from '../../styled/media';

const Landing = ({ product: { search }, category:{ loading, categories, selectedCategories}, getAllCategories, clearProduct }) => {
    const [ products, setProducts ] = useState([]);
    const [ match, setMatch ] = useState({
        sortBy: "_id",
        order: "asc"
    });
    const [ priceRange, setPriceRange ] = useState({start: 0, end: 1000000});
    const [ loadMore, setLoadMore ] = useState({
        limit: 3,
        page: 1,
        totalPage: 0, 
        showBtn: true
    });
    const [ productsLoading, setProductsLoading ] = useState(true);
    const [skeleton, setSkeleton] = useState([0, 1, 2, 3]);

    useEffect(() => {
        clearProduct();
        getAllCategories();
        // When search is applied, set new products.
        selectedCategories.length > 0? setNewCategories(search, selectedCategories) : setNewCategories(search, [...categories]) ;
    }, [search, getAllCategories]);

    const handleMatch = async (e) => {
        // Show data Skeleton
        setProductsLoading(true);
        // Get new products base on new match and the rest of other old state.
        const { value } = e.target;
        let newMatch = { sortBy: "_id", order: "asc" };
        let page = 0
        switch(value) {
            case "Low-Hight":
                newMatch = {sortBy: "price", order: "asc"}; 
                //set the match state to the selected match for sideFilter to use
                setMatch(newMatch);
                break;
            case "Hight-Low":
                newMatch = {sortBy: "price", order: "desc"};
                setMatch(newMatch);
                break;
            case "Sold":
                newMatch = {sortBy: "sold", order: "desc"};
                setMatch(newMatch);
                break;
            default:
                setMatch(newMatch);
                break;
        }

        let tempCategories = selectedCategories.length === 0? categories : selectedCategories;
        const body = JSON.stringify({
            filter: {
                price: {
                    start: priceRange.start,
                    end: priceRange.end
                },
                category: tempCategories,
                search
            }
        });
        const config = { headers: {"Content-Type": "application/json" }};
        try {
            const { sortBy, order } = newMatch;
            const { limit } = loadMore;
            // 1. Get new data base on selected categories, also sort it in the server. (Only first page).
            const res = await axios.post(`/api/product/search?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${limit*page}`, body, config);
            // 2. Show real data
            setProductsLoading(false);
            let { products, documentCount } = res.data;
            setProducts(products);
            // 3. Count how many page in total and set it to the state.
            let totalPage = Math.ceil(documentCount / limit);
            // 4. If total page = first page, then get rid of the button.
            //    Also need to reset the page count.
            if(totalPage === 1 || totalPage === 0) {
                setLoadMore({
                    ...loadMore,
                    page: 1,
                    totalPage,
                    showBtn: false
                })
            } else {
                setLoadMore({
                    ...loadMore,
                    page: 1,
                    totalPage,
                    showBtn: true
                })
            }
        } catch(err) {
            console.log(err.response)
        }
    }
    
    // For setting initial products.
    // Will execute when the SildFilter mounted, also whenever the selectedCategories are changed.
    const setNewCategories = async (search, selectedCategories, priceRange = {start: 0, end: 1000000}, page = 0) => {
        // Show data Skeleton
        setProductsLoading(true);
        const body = JSON.stringify({
            filter: {
                price: {
                    start: priceRange.start,
                    end: priceRange.end
                },
                category: selectedCategories,
                search: search
            }
        });
        const config = { headers: {"Content-Type": "application/json" }};
        try {
            const { sortBy, order } = match;
            const { limit } = loadMore;
            // 1. Get new data base on selected categories, also sort it in the server. (Only first page).
            const res = await axios.post(`/api/product/search?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${limit*page}`, body, config);
            // 2. Show real data
            setProductsLoading(false);

            let { products, documentCount } = res.data;
            setProducts(products);
            // 3. Count how many page in total and set it to the state.
            let totalPage = Math.ceil(documentCount / limit);
            // 4. If total page = first page, then get rid of the button.
            //    Also need to reset the page count.
            if(totalPage === 1 || totalPage === 0) {
                setLoadMore({
                    ...loadMore,
                    page: 1,
                    totalPage,
                    showBtn: false
                })
            } else {
                setLoadMore({
                    ...loadMore,
                    page: 1,
                    totalPage,
                    showBtn: true
                })
            }
        } catch(err) {
            console.log(err.response)
        }
    }
 
    
    const handleShowMore = async (search, selectedCategories, currentProducts, priceRange = {start: 0, end: 1000000}, page = 1) => {
        const body = JSON.stringify({
            filter: {
                price: {
                    start: priceRange.start,
                    end: priceRange.end
                },
                category: selectedCategories,
                search: search
            }
        });
        const config = { headers: {"Content-Type": "application/json" }};
        try {
            const { sortBy, order } = match;
            const { limit } = loadMore;
            // 1. Get new data if there are more in the selected categories (skip the first page of data). 
            const res = await axios.post(`/api/product/search?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${limit*page}`, body, config);
            let { products } = res.data;
            // 2. Add new products to the current products.
            setProducts([...currentProducts, ...products]);
            // 3. If the total page = the last page, get ride of show more button.
            setLoadMore((old) => {
                const newPage = old.page + 1;
                if(old.totalPage === newPage) {
                    return {
                        ...loadMore,
                        page: newPage,
                        showBtn: false
                    }    
                } else {
                    return {
                        ...loadMore,
                        page: newPage
                    }
                }
            })
        } catch(err) {
            console.log(err.response)
        }
    }
    
    return (
        <LandingWrap>
            <Wrap>
                <SideFilterWrap>
                    {!loading && <SideFilter setNewCategories={setNewCategories} priceRange={priceRange} setPriceRange={setPriceRange}/>}
                </SideFilterWrap>
                <ProductListWrap>
                    <Match handleMatch={handleMatch}/>
                    <ProductWrap>
                        {productsLoading ? 
                            // Show sleletons before data loaded.
                            skeleton.map((item, index) => <Product key={index} skeleton={true} />) : 
                            <> {products.length < 1? 
                                    <h1>Sorry, we couldn’t find anything...</h1> : 
                                    products.map(product => <Product key={product._id} product={product} skeleton={false} /> )
                            }</>
                        }
                    </ProductWrap>
                </ProductListWrap>
            </Wrap>
            <BtnWrap showBtn={loadMore.showBtn}>
                {loadMore.showBtn ?
                    <button onClick={() => {
                    let tempCategories = selectedCategories.length === 0? categories : selectedCategories;
                    handleShowMore(search, tempCategories, products, priceRange, loadMore.page);
                    }}>Show more</button>:
                    <h3>End of results</h3>
                }
            </BtnWrap>
        </LandingWrap>
    )
}

const LandingWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Wrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 40px;
    margin-bottom: 20px;
    ${media.tablat_S} {
        margin-top: 10px;
        flex-direction: column;
        align-items: center;
    }
`
const SideFilterWrap = styled.div`
    width: 30%;
    display: flex;
    justify-content: flex-end;
    border-right: solid 1px ${props => props.theme.lightGray};
    ${media.tablat_S} {
        width: 100%;
        justify-content: center;
    }
`
const ProductListWrap = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    padding-left: 30px;
    ${media.tablat_S} {
        width: 100%;
        padding-left: 0px;
        align-items: center;
    }
`
const ProductWrap = styled.div`
    width: 85%;
    display: flex;
    flex-wrap: wrap;
    ${media.tablat_S} {
        justify-content: center;
    }
    h1 {
        color: ${props => props.theme.brandBlue};
        margin: auto;
    }
`

const BtnWrap = styled.div`
    width: 90%;
    height: 85px;
    margin-bottom: 30px;
    border-bottom: solid 1px ${props => props.theme.lightGray};
    display: flex;
    justify-content: center;
    align-items: center;
    ${props => !props.showBtn && css`
        background-color: ${props => props.theme.primWhite};
        border-bottom: solid 1px ${props => props.theme.primWhite};
    `}
    button {
        border: none;
        outline: none;
        font-size: 1.1rem;
        padding: 1rem 2.5rem;
        cursor: pointer;
        color: ${props => props.theme.primWhite};
        background-color: ${props => props.theme.interactive};
        transition: 0.2s;
        &:hover {
            background-color: ${props => props.theme.interactiveDark};
        }
    }
    h3 {
        color: ${props => props.theme.darkGray};
        font-weight: 400;
    }
`

const mapStateToProps = state => {
    return {
        product: state.product,
        category: state.category
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllCategories: () => dispatch(getAllCategories()),
        clearProduct: () => dispatch(clearProduct())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);