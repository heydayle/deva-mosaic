import { type SweetAlertOptions } from 'sweetalert2'
type IAlert = SweetAlertOptions & {
  title: string
  message: string
  confirmButtonText?: string
  customClass?: 'success' | 'error' | 'warning' | 'confirm' | string
  actionConfirm?: () => void
  actionCancel?: () => void
}
type IAlertWithType = SweetAlertOptions & {
  title?: string
  message?: string
  confirmButtonText?: string
  customClass?: 'success' | 'error' | 'warning' | 'confirm' | string
  actionConfirm?: () => void
  actionCancel?: () => void
}
interface IDefaultSweetAlert {
  fire: (options: IAlertWithType, attr1?: any, attr2?: any) => any
}
export const useAlert = () => {
  const alert = inject<IDefaultSweetAlert>('Swal') as IDefaultSweetAlert
  const show = (options?: IAlert) => {
    alert.fire({
      ...options,
      title: options?.title,
      text: options?.message,
      confirmButtonText: options?.confirmButtonText || 'OK',
    })
  }
  const showError = (options?: IAlertWithType) => {
    alert.fire({
      ...options,
      title: options?.title || 'Error',
      text: options?.message || 'message',
      confirmButtonText: options?.confirmButtonText || 'OK',
      customClass: 'error',
      imageUrl: '/icons/error.svg',
    })
  }
  const showWarning = (options?: IAlertWithType) => {
    alert.fire({
      ...options,
      title: options?.title || 'Warning',
      text: options?.message || 'message',
      confirmButtonText: options?.confirmButtonText || 'OK',
      customClass: 'warning',
      imageUrl: '/icons/warning.svg',
    })
  }
  const showSuccess = (options?: IAlertWithType) => {
    alert.fire({
      ...options,
      title: options?.title || 'Success',
      text: options?.message,
      confirmButtonText: options?.confirmButtonText || 'OK',
      customClass: 'success',
    })
  }
  const showConfirm = (options?: IAlertWithType) => {
    alert
      .fire({
        ...options,
        title: options?.title || 'Confirm',
        text: options?.message || 'message',
        confirmButtonText: options?.confirmButtonText || 'OK',
        customClass: 'confirm',
        showCancelButton: true,
        imageUrl: '/icons/question.svg',
      })
      .then((result: any) => {
        if (result.isConfirmed && options?.actionConfirm) {
          options.actionConfirm()
        } else if (options?.actionCancel) {
          options?.actionCancel()
        }
      })
  }
  return {
    alert,
    show,
    error: showError,
    warning: showWarning,
    success: showSuccess,
    confirm: showConfirm,
  }
}