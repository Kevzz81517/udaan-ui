import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}

export async function applyForLoan(vuaId) {

  return request('/api/loan/apply', {
    method: 'POST',
    data: {vuaId},
    headers: {
      Authorization: localStorage.getItem('Authorization')
    }
  })

}