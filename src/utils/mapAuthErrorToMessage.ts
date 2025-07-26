import i18n from '../i18n';

export const mapAuthErrorToMessage = (code: string): string => {
  const errorKeyMap: Record<string, string> = {
    'auth/email-already-in-use': 'firebase.auth.errors.email_already_in_use',
    'auth/invalid-email': 'firebase.auth.errors.invalid_email',
    'auth/user-not-found': 'firebase.auth.errors.user_not_found',
    'auth/wrong-password': 'firebase.auth.errors.wrong_password',
    'auth/weak-password': 'firebase.auth.errors.weak_password',
    'auth/network-request-failed': 'firebase.auth.errors.network_request_failed',
    'auth/too-many-requests': 'firebase.auth.errors.too_many_requests',
    'auth/invalid-credential': 'firebase.auth.errors.invalid_credential',
    'auth/invalid-login-credentials': 'firebase.auth.errors.invalid_credential', 
    'auth/missing-password': 'firebase.auth.errors.invalid_credential'
  };

  const key = errorKeyMap[code] || 'firebase.errors.generic';
  return i18n.t(key);
};
