import React, { useState } from "react";
import styles from './Home.module.css'
import { useEffect } from "react";
import { Header, Footer, SideMenu, Carousel, ProductionCollection, Corporation } from '../../components'
import { Row, Col, Typography ,Spin} from 'antd'

import sideImage from '../../assets/images/sider_2019_02-04-2.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_12-09.png'
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {useSelector} from '../../redux/hooks'
import { MainLayout } from "../../layouts/mainLayout";
import {initRecommendProductDataActionCreator} from '../../redux/recommendProducts/recommendProductsActions'
export const Home: React.FC = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const productList = useSelector(data=>data.recommendProducts.productList);
    const loading = useSelector(data=>data.recommendProducts.loading);
    const error = useSelector(data=>data.recommendProducts.error); 
    useEffect(()=>{
        //@ts-ignore
        dispatch(initRecommendProductDataActionCreator())
    },[])
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
            <div className={styles['page-content']}>
                <Row style={{ marginTop: 20 }}>
                    <Col span={6}>
                        <SideMenu />
                    </Col>
                    <Col span={18}>
                        <Carousel />
                    </Col>
                </Row>
                <ProductionCollection
                    title={<Typography.Title level={3} type={'warning'}>{t("home_page.hot_recommended")}</Typography.Title>}
                    sideImage={sideImage}
                    products={productList[0].touristRoutes}
                />
                <ProductionCollection
                    title={<Typography.Title level={3} type={'danger'}>{t("home_page.new_arrival")}</Typography.Title>}
                    sideImage={sideImage2}
                    products={productList[1].touristRoutes}
                />
                <ProductionCollection
                    title={<Typography.Title level={3} type={'success'}>{t("home_page.domestic_travel")}</Typography.Title>}
                    sideImage={sideImage3}
                    products={productList[2].touristRoutes}
                />
                <Corporation />
            </div>
            </MainLayout>
        </>
    )
}