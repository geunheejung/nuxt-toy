import Vue from 'vue'
import { ToastType } from 'vue-toast-notification'

const openToast = (type: ToastType, message: string) => {
  Vue.$toast.open({
    type,
    message,
    duration: 1000,
    position: 'top',
  })
}

export default openToast
