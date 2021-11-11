export function checkArguments(...args: string[]) {
  for (let i = 0; i < args.length; i++) {
    const element = args[i];
    if (
      element == null ||
      element == undefined ||
      (element != undefined && element.trim() == "")
    ) {
      return false;
    }
  }
  return true;
}

const EMAIL_REGEX: RegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,48}$/;

export function checkEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function checkPassword(password: string) {
  return PASSWORD_REGEX.test(password.trim());
}
