
 export const logoutServerSide = async (): Promise<void> => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
 }