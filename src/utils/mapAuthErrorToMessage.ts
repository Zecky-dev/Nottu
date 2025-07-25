import i18n from '../i18n';

export const mapAuthErrorToMessage = (code: string): string => {
    const errorType = 'firebase.errors.auth';

    const errorKeyMap: Record<string, string> = {
    'auth/email-already-in-use': `${errorType}.email_already_in_use`,
    'auth/invalid-email': `${errorType}.invalid_email`,
    'auth/user-not-found': `${errorType}.user_not_found`,
    'auth/wrong-password': `${errorType}.wrong_password`,
    'auth/weak-password': `${errorType}.weak_password`,
    'auth/network-request-failed': `${errorType}.network_request_failed`,
    'auth/too-many-requests': `${errorType}.too_many_requests`,
    'auth/invalid-credential': `${errorType}.invalid_credential`,
  };

  const key = errorKeyMap[code] || 'firebase.errors.generic';
  return i18n.t(key);
};
