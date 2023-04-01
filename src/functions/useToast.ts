import { toast } from "react-toastify"

export const notify = (type: string, message: string) => {
  if (type === "success") {
    toast.success(message)
    return
  }
  if (type === "info") {
    toast.info(message)
    return
  }
  if (type === "warning") {
    toast.warning(message)
    return
  }
  if (type === "error") {
    toast.error(message)
    return
  }
}

export const dismiss = () => {
  toast.dismiss()
}
