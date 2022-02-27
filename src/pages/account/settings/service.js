import { request } from 'umi';
export async function getSHGProfileDetails() {
  return request(
    '/api/users/shg/details',{
      method: 'GET',
      headers: {
        'Authorization': localStorage.getItem('Authorization')
      }
  }
  );
}
export async function queryProvince() {
  return request('/api/geographic/province');
}
export async function queryCity(province) {
  return request(`/api/geographic/city/${province}`);
}
export async function query() {
  return request('/api/users');
}
