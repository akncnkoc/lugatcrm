import React from "react"

const Toast: React.FC = () => {
  return (
    <div
      className={
        "invisible fixed bottom-7.5  left-1/2 min-w-250px -translate-x-1/2 transform rounded-md bg-white p-4 shadow"
      }
      id={"toast"}>
      toast
    </div>
  )
}

export const toast = (msg?: string) => {
  const toastContainer = document.getElementById("toast")
  toastContainer.classList.add("show")
  toastContainer.innerHTML = msg
  setTimeout(() => {
    toastContainer.classList.remove("show")
  }, 3000)
}

export default Toast
