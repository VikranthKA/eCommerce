import {all} from 'redux-saga/effects'
import { categoryAllSaga,createCategorySaga,deleteCategorySaga,updateCategorySaga} from "../saga/categorySaga"
import { productAllSaga, setNewCreatedProductSaga, setUpdatedProductSaga } from '../saga/productSaga'
import { setNewUserProfileAddressSaga, setUpdatedUserProfile, setUserProfile, setUpdateProfileAddressSaga } from '../saga/profileSaga'
import { cartAllSaga, setCartItemsSaga, setRemovedProductFromCartSaga } from '../saga/cartSaga'
import { createUserOrderSaga } from '../saga/orderSaga'


export default function* rootSaga(){
    yield all([
                     categoryAllSaga(),         createCategorySaga(),           updateCategorySaga(),deleteCategorySaga(),
                      productAllSaga(),   setNewCreatedProductSaga(),        setUpdatedProductSaga(),
                      setUserProfile(),      setUpdatedUserProfile(),
        setNewUserProfileAddressSaga(),setUpdateProfileAddressSaga(),
                         cartAllSaga(),           setCartItemsSaga(),setRemovedProductFromCartSaga(),
                 createUserOrderSaga(),
    ]) 
}