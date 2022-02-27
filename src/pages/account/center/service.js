import { request } from 'umi';
export async function queryCurrent() {
  return request('/api/users/currentUser', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Authorization')
    },
  });
}
export async function queryFakeList(params) {
  return request('/api/fake_list_Detail', {
    params,
  });
}
