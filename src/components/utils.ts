import toast from "react-hot-toast";

export const showMessage = (message: string) => {
    toast.success(message);
}