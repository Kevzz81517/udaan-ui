// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
/** 发送验证码 POST /api/login/captcha */

export async function getOtp(params) {
  const formData = new FormData(); 
  formData.append('username', (params.loginType == 'PHONE' ? '+91' : '') + params.contactId);
  formData.append('password', null);
  formData.append('loginType', params.loginType);
  return request('/api/users/login', {
    getResponse: true,
    method: 'POST',
    data: formData,
  });
}

export async function login(values) {
  return request('/api/users/two-factor/verify', {
    method: 'POST',
    getResponse: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Authorization')
    },
    data: {otp: values.captcha}
  });
}