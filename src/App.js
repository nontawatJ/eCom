import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './component/Home/Home';
import About from './component/About/About';
import Product from './component/Product/Product';
import SignUp from './component/SignUp/SignUp';
import SignIn from './component/SignIn/SignIn';
import ForgotPass from './component/ForgotPass/ForgotPass';
import passwordReset from './component/PasswordReset/PasswordReset';
import Private from './component/Private/Private';
import NotFound from './component/NotFound/NotFound';
import UploadProduct from './component/UploadProduct/UploadProduct';
import Initial from './component/Initial/Initial';
import ProductList from './component/ProductList/ProductList';
import SmallBirdProduct from './component/Product/SmallBirdProduct';
import MediumBirdProduct from './component/Product/MediumBirdProduct';
import LargeBirdProduct from './component/Product/LargeBirdProduct';
import Cart from './component/Cart/Cart';
import ServerOrder from './component/Order/serverOrder';
import UserOrder from './component/UserOrder/UserOrder';

//routing
import PrivateRoute from './component/routing/PrivateRoute';


import './App.css';


const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Initial}/>
                <PrivateRoute path="/private" component={Private}/>
                <PrivateRoute path="/Cart" component={Cart} />
                <PrivateRoute path='/UserOrder' component={UserOrder} />
                <Route path="/Home" component={Home} />
                <Route path="/UploadProduct" component={UploadProduct} />
                <Route path="/ProductList" component={ProductList} />
                <Route path="/About" component={About} />
                <Route path="/Product" component={Product} /> 
                <Route path="/SignUp" component={SignUp} />
                <Route path="/SignIn" component={SignIn} />
                <Route path="/ForgotPass" component={ForgotPass} />
                <Route path="/passwordReset/:resetToken" component={passwordReset} />
                <Route path="/productSmallBird" component={SmallBirdProduct} />
                <Route path="/productMediumBird" component={MediumBirdProduct} />
                <Route path="/productLargeBird" component={LargeBirdProduct} />
                <Route path="/ServerOrder" component={ServerOrder} />



                <Route path="*" component={NotFound} />               
            </Switch>
        </Router>
    )
}


export default App;