import React, { useEffect, useState } from "react";
import styles from './Header.module.css'
import logo from '../../assets/logo.svg'
import { GlobalOutlined } from "@ant-design/icons";
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import jwtDecode, { JwtPayload as DefaultJwtPayload } from "jwt-decode";
import {
    LanguageActionTypes,
    addLanguageActionCreator,
    changeLanguageActionCreator,
} from "../../redux/language/languageActions";
import { useTranslation } from "react-i18next";
import { userSlice } from "../../redux/user/slice";
interface JwtPayload extends DefaultJwtPayload {
    username: string
}


export const Header: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('')
    const language = useSelector((state) => state.language.language);
    const languageList = useSelector((state) => state.language.languageList);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const jwt = useSelector(s => s.user.token);
    const shoppingCartItems = useSelector(data=>data.shoppingCart.items);
    const shoppingCartLoading = useSelector(data=>data.shoppingCart.loading);
    const onLogout = ()=>{
        dispatch(userSlice.actions.logOut())
        navigate('/')
    }
    useEffect(() => {
        if (jwt) {
            const token = jwtDecode<JwtPayload>(jwt);
            setUsername(token.username)
        }
    }, [jwt])
    const menuClickHandler = (e) => {
        console.log(e);
        if (e.key === "new") {
            // 处理新语言添加action
            dispatch(addLanguageActionCreator("新语言", "new_lang"));
        } else {
            dispatch(changeLanguageActionCreator(e.key));
        }
    };
    return (
        <div className={styles['app-header']}>
            <div className={styles['top-header']}>
                <div className={styles.inner}>
                    <Typography.Text>让旅游更容易</Typography.Text>
                    <Dropdown.Button
                        style={{ marginLeft: 15 }}
                        overlay={<Menu
                            onClick={menuClickHandler}
                            items={
                                [
                                    ...languageList.map((l) => {
                                        return { key: l.code, label: l.name };
                                    }),
                                    { key: "new", label: t("header.add_new_language") },
                                ]
                            }
                        />}
                        icon={<GlobalOutlined />}
                    >
                        {language === "zh" ? "中文" : "English"}
                    </Dropdown.Button>
                    {jwt ? (
                        <Button.Group className={styles["button-group"]}>
                            <span>
                                {t("header.welcome")}
                                <Typography.Text strong>{username}</Typography.Text>
                            </span>
                            <Button loading={shoppingCartLoading} onClick={()=>navigate('/shoppingcart')}>{t("header.shoppingCart")}({shoppingCartItems.length})</Button>
                            <Button onClick={onLogout}>{t("header.signOut")}</Button>
                        </Button.Group>
                    ) : (
                        <Button.Group className={styles["button-group"]}>
                            <Button onClick={() => navigate("/register")}>
                                {t("header.register")}
                            </Button>
                            <Button onClick={() => navigate("/login")}>
                                {t("header.signin")}
                            </Button>
                        </Button.Group>
                    )}
                </div>
            </div>
            <Layout.Header className={styles['main-header']}>
                <span onClick={() => navigate('/')}>
                    <img src={logo} alt="logo" className={styles['App-logo']} />
                    <Typography.Title level={3} className={styles.title}>{t("header.title")}</Typography.Title>
                    <Input.Search
                        placeholder={'请输入旅游目的,主题,关键词'}
                        className={styles['search-input']}
                        onSearch={(keywords) => { if (keywords) navigate('/search/' + keywords) }}
                    />
                </span>

            </Layout.Header>
            <Menu mode={"horizontal"} className={styles['main-menu']}
                items={
                    [
                        { key: "1", label: t("header.home_page") },
                        { key: "2", label: t("header.weekend") },
                        { key: "3", label: t("header.group") },
                        { key: "4", label: t("header.backpack") },
                        { key: "5", label: t("header.private") },
                        { key: "6", label: t("header.cruise") },
                        { key: "7", label: t("header.hotel") },
                        { key: "8", label: t("header.local") },
                        { key: "9", label: t("header.theme") },
                        { key: "10", label: t("header.custom") },
                        { key: "11", label: t("header.study") },
                        { key: "12", label: t("header.visa") },
                        { key: "13", label: t("header.enterprise") },
                        { key: "14", label: t("header.high_end") },
                        { key: "15", label: t("header.outdoor") },
                        { key: "16", label: t("header.insurance") },
                    ]
                }
            />
        </div>)
}