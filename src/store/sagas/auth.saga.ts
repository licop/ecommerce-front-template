import axios from 'axios'
import {put, takeEvery} from 'redux-saga/effects'
import { API } from '../../config'
import { SIGNIN, SIGNUP, SignupAction, signupFail, signupSuccess, SigninAction, signinSuccess, signinFail } from '../actions/auth.action'

function* handleSignup(action: SignupAction) {
  try {
    yield axios.post(`${API}/signup`, action.payload)
    yield put(signupSuccess())
  } catch (error: any) {
    yield put(signupFail(error.response.data.error))
  }
}

function* handleSignin(action: SigninAction): any {
  try {
    let response = yield axios.post(`${API}/signin`, action.payload)
    localStorage.setItem('jwt', JSON.stringify(response.data))
    yield put(signinSuccess())
  } catch (error: any) {
    yield put(signinFail(error.response.data.error))
  }
}

export default function* authSage() {
  // 注册
  yield takeEvery(SIGNUP, handleSignup)
  // 登录
  yield takeEvery(SIGNIN, handleSignin)
}
