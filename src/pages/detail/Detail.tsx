import React, { useEffect } from "react";
import styles from './Detail.module.css'
import { Spin, Row, Col, Divider, Typography, Anchor, Menu } from "antd";
import { useParams } from 'react-router-dom'
import { DatePicker, Space, Button } from 'antd';
import { commentMockData } from './mockup'
import { Header, Footer } from '../../components'
import { ProductIntro, ProductComments } from "../../components";
import { useSelector, useAppDispatch } from '../../redux/hooks'
import { MainLayout } from "../../layouts/mainLayout";
import { productDetailSlice, getProductDetail } from '../../redux/productDetail/slice'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { addShoppingCartItem } from "../../redux/shoppingCart/slice";

const { RangePicker } = DatePicker;
type MatchParams = {
    touristRouteId: string,
}

export const Detail: React.FC = () => {
    const { touristRouteId } = useParams<MatchParams>();
    const loading = useSelector(state => state.productDetail.loading);
    const product = useSelector(state => state.productDetail.data);
    const error = useSelector(state => state.productDetail.error);
    const dispatch = useAppDispatch();

    const jwt = useSelector(data => data.user.token) as string;
    const shoppingCartLoading = useSelector(data => data.shoppingCart.loading);
    useEffect(() => {
        if (touristRouteId) {
            dispatch(getProductDetail(touristRouteId));
        }
    }, [])
    if (loading) {
        return (
            <Spin
                size="large"
                style={{
                    marginTop: 200,
                    marginBottom: 200,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%",
                }}
            />
        );
    }
    if (error) {
        return <div>网站出错：{error}</div>;
    }
    return (
        <>
            <MainLayout>
                <div className={styles["page-content"]}>
                    {/* 产品简介 与 日期选择 */}
                    <div className={styles["product-intro-container"]}>
                        <Row>
                            <Col span={13}><ProductIntro
                                title={product.title}
                                shortDescription={product.description}
                                price={product.originalPrice}
                                coupons={product.coupons}
                                points={product.points}
                                discount={product.price}
                                rating={product.rating}
                                pictures={product.touristRoutePictures.map((p) => p.url)}
                            /></Col>
                            <Col span={11}>
                                <Button
                                    style={{ marginTop: 50, marginBottom: 30, display: "block" }}
                                    type="primary"
                                    danger
                                    loading={shoppingCartLoading}
                                    onClick={() => {
                                        dispatch(
                                            addShoppingCartItem({ jwt, touristRouteId: product.id })
                                        );
                                    }}
                                >
                                    <ShoppingCartOutlined />
                                    放入购物车
                                </Button>
                                <RangePicker open style={{ marginTop: 20 }} />
                            </Col>
                        </Row>
                    </div>
                    {/* 锚点菜单 */}
                    <div className={styles["product-detail-anchor"]}></div>
                    {/* 产品特色 */}
                    <div id="feature" className={styles["product-detail-container"]}>
                        <Divider orientation={"center"}>
                            <Typography.Title level={3}>产品特色</Typography.Title>
                        </Divider>
                        <div
                            dangerouslySetInnerHTML={{ __html: product.features }}
                            style={{ margin: 50 }}
                        ></div>
                    </div>
                    {/* 费用 */}
                    <div id="fees" className={styles["product-detail-container"]}>
                        <Divider orientation={"center"}>
                            <Typography.Title level={3}>费用</Typography.Title>
                        </Divider>
                        <div
                            dangerouslySetInnerHTML={{ __html: product.fees }}
                            style={{ margin: 50 }}
                        ></div>
                    </div>
                    {/* 预订须知 */}
                    <div id="notes" className={styles["product-detail-container"]}>
                        <Divider orientation={"center"}>
                            <Typography.Title level={3}>预定须知</Typography.Title>
                        </Divider>
                        <div
                            dangerouslySetInnerHTML={{ __html: product.notes }}
                            style={{ margin: 50 }}
                        ></div>
                    </div>
                    {/* 商品评价*/}
                    <div id="comments" className={styles["product-detail-container"]}>
                        <Divider orientation={"center"}>
                            <Typography.Title level={3}>用户评价</Typography.Title>
                        </Divider>
                        <div style={{ margin: 40 }}>
                            <ProductComments data={commentMockData} />
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}