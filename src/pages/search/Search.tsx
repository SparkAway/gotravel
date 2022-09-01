import React,{useEffect} from "react";
import styles from './Search.module.css'
import {Header,Footer,FilterArea,ProductList} from '../../components'
import { useParams ,useLocation} from "react-router-dom";
import {Spin} from 'antd'
import { MainLayout } from "../../layouts/mainLayout";
import {useSelector,useAppDispatch} from '../../redux/hooks'
import {productSearchSlice, searchProduct} from '../../redux/productSearch/slice'

type MatchParams={
    keywords:string
}

export const Search:React.FC=()=>{
    const {keywords} = useParams<MatchParams>(); 
    const loading = useSelector(data=>data.productSearch.loading);
    const error = useSelector(data=>data.productSearch.error);
    const pagination = useSelector(data=>data.productSearch.pagination);
    const productList = useSelector(data=>data.productSearch.data);
    const location = useLocation();
    const dispatch = useAppDispatch();
    useEffect(()=>{
        if(keywords){
            dispatch(searchProduct({nextPage:1,pageSize:10,keywords}))
        }
    },[location])
    const onPageChange =(nextPage,pageSize)=>{
        if(keywords){
            dispatch(searchProduct({nextPage,pageSize,keywords}));
        }
    }
    if(loading){
        return <Spin
            size="large"
            style={{
                marginTop:200,
                marginBottom:200,
                marginLeft:"auto",
                marginRight:"auto",
                width: "100%",
            }}
        />
    }
    if(error){
        return (<h1>网站出错，错误信息:{error}</h1>)
    }
    return (
        <>
            <MainLayout>
            <div className={styles["page-content"]}>
                <div className={styles["product-list-container"]}>
                    <FilterArea/>
                </div>
                <div className={styles["product-list-container"]}>
                    <ProductList
                        data={productList}
                        paging={pagination}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
            </MainLayout>
        </>
    )
}