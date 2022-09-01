import React,{useEffect} from 'react';
import styles from './App.module.css'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import { Home , SignIn ,Detail ,Register ,Search ,ShoppingCart,PlaceOrderPage} from './pages';
import {useSelector,useAppDispatch} from './redux/hooks'
import {getShoppingCart} from './redux/shoppingCart/slice'

const PrivateRoute = ({children})=>{
  const jwt = useSelector(data=>data.user.token);
  return jwt?children:<Navigate to={'/login'}/>
}

function App() {
  const jwt = useSelector(data=>data.user.token)
  const dispatch = useAppDispatch();
  useEffect(()=>{
    if(jwt){
      dispatch(getShoppingCart(jwt))
    }
  },[jwt])
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<SignIn/>}/>
          <Route path='/detail/:touristRouteId/' element={<Detail/>}/>
          <Route path='/search/:keywords' element={<Search/>}/>
          <Route path='/shoppingcart' element={
            <PrivateRoute>
                <ShoppingCart/>
            </PrivateRoute>}/>
          <Route path='/order' element={
            <PrivateRoute>
              <PlaceOrderPage/>
            </PrivateRoute>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='*' element={<h1>404 NOT FOUND</h1>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
