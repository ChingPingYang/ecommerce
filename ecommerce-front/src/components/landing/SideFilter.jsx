import React, { useState, useEffect} from 'react';
import styled from 'styled-components';

const SideFilter = ({category, setNewCategories}) => {
    const { categories } = category;
    const [ selectedCategories, setSelectedCategories ] = useState([]);
    useEffect(() => {
        if(selectedCategories.length > 0) {
            setNewCategories(selectedCategories);
        }
    },[selectedCategories])
    const handleOnchange = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            setSelectedCategories((pre) => {
                const newCategories = [...pre, value]
                const uniqueArray = newCategories.reduce((unique, item) => {
                    return unique.includes(item)? unique : [...unique, item];
                }, []);
                return uniqueArray
            });
        } else {
            setSelectedCategories((pre) => {
                return pre.filter((item) => item !== value);
            })
        }      
    }
    
    return (
        <Wrap>
            <CheckboxForm onChange={handleOnchange}>
                {categories.map(category => (
                    <label key={category._id}>
                        <input type="checkbox" name={category.name} value={category._id} autoFocus/>
                        <span>{category.name}</span>
                    </label>    
                ))}
                {/* <label>
                    <input type="checkbox" name="category" value="B"/>
                    <span className="test">B</span>
                </label>
                <label>
                    <input type="checkbox" name="category" value="C"/>
                    <span className="test">C</span>
                </label>
                <label>
                    <input type="checkbox" name="category" value="D"/>
                    <span className="test">D</span>
                </label> */}
            </CheckboxForm>

        </Wrap>
        
    )
}

const Wrap = styled.div`
    border-right: solid 1px red;
    border: solid 1px blue;
    width: 70%;
    height: 700px;
`
const CheckboxForm = styled.form`
    display: flex;
    flex-direction: column;
    label {
        cursor: pointer;
        width: 200px;
        border: solid 1px red;
        margin: 10px;
        input {
            display: none;
            &:checked + span {
                &:before {
                    content: "";
                    position: absolute;
                    width: 15px;
                    height: 15px;
                    top: 1px;
                    left: -20px;
                    border: solid 2px red;
                }
                &:after {
                    content: "";
                    position: absolute;
                    width: 6px;
                    height: 12px;
                    top: 2px;
                    left: -15px;
                    border-bottom: solid 2px black;
                    border-right: solid 2px black;
                    transform: rotate(40deg);
                }
            }
                
        }
        span {
            margin-left: 20px;
            position: relative;
            &:before {
                content: "";
                position: absolute;
                width: 15px;
                height: 15px;
                top: 1px;
                left: -20px;
                border: solid 1px blue;
            }
        }
    }
`

export default SideFilter;