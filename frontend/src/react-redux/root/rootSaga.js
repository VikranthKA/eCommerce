import {all} from 'redux-saga/effects'
import {
    categoryAllSaga,
    createCategorySaga,
    deleteCategorySaga,
    updateCategorySaga
  } from "../saga/categorySaga"
import { productAllSaga, setNewCreatedProductSaga, setUpdatedProductSaga } from '../saga/productSaga'
import { setUserProfile } from '../saga/profileSaga'



export default function* rootSaga(){
    yield all([
        categoryAllSaga(),
        createCategorySaga(),
        updateCategorySaga(),
        deleteCategorySaga(),
        productAllSaga(),
        setNewCreatedProductSaga(),
        setUpdatedProductSaga(),
        setUserProfile()

    ])
}