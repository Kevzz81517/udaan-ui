import jwt_decode from 'jwt-decode';
export default function access(initialState) {
  
  const authorization  = localStorage.getItem('Authorization');
  const roles = authorization ? jwt_decode(authorization.replace('Bearer', '')).authorities: [];
  debugger;
  const roleUser = roles && roles.includes('ROLE_USER');
  const roleSHGUser = roles && roles.includes('ROLE_SHG_USER');
  return {
    canSHG:  roles && roleUser && roleSHGUser,
  };
}
