import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('chattinguser')){
    window.location.href=window.location.origin+'/chats'
    return false;
  }
  else{
    return true;
  }
};
