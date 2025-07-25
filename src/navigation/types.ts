export type AuthStackParamList = {
  LoginEmail: undefined;
  LoginPassword: { email: string };
  ForgotPassword: { email: string };
  RegisterPassword: { email: string };
  RegisterPermissionRequest: undefined;
  RegisterPersonalInfo: {email: string, password: string};
  RegisterComplete: undefined;
};

export type AppStackParamList = {
  Home: undefined;
};


export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
};
