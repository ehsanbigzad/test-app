export function validatePassword(value: string) {
  return new RegExp(
    '((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))',
  ).test(value);
}

export function validatePasswordWithMessage(value: string): boolean | string {
  const isValid = new RegExp(
    '((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))',
  ).test(value);

  return (
    isValid ||
    'At least 6 characters long.\nAt least one uppercase letter.\nAt least one lowercase letter.\nAt least one digit.\nAt least one special character.'
  );
}
