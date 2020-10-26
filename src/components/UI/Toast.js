import { toast } from 'react-toastify';

export const successNotify = (message) => {
    toast.success(message, {
        autoClose: 5000,
        hideProgressBar: true
    })
}

export const failNotify = (message) => {
    toast.error(message, {
        autoClose: 5000,
        hideProgressBar: true
    })
}