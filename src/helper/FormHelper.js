import toast from "react-hot-toast";
let EmailReg = /\S+@\S+\.\S+/;
class FormHelper {
  IsEmpty(value) {
    return value.length === 0;
  }
  IsEmail(value) {
    return !EmailReg.test(value);
  }
  ErrorToast(msg) {
    toast.error(msg, { position: "bottom-center" });
  }
  SuccessToast(msg) {
    toast.success(msg, { position: "bottom-center" });
  }
}
export const { IsEmpty, IsEmail, ErrorToast, SuccessToast } = new FormHelper();
