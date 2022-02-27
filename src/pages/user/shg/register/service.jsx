import { request } from 'umi';
export async function getOtpForSignup(params) {
  debugger;
  return request('/api/users/shg/sign-up', {
    getResponse: true,
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export async function verifyAndSignup(params) {
  return request('/api/users/shg/sign-up/verify', {
    getResponse: true,
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Authorization')
    }
  });
}