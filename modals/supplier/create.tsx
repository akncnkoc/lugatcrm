import React, { useState } from "react"
import { Input } from "../../components/core-ui/Input"
import { Grid } from "../../components/core-ui/Miscellaneous"
import { Button } from "../../components/core-ui/Button"
import { useModal } from "../../context/modal-context"

export const SupplierCreateModal: React.FC<{
  updateTable?: Function
}> = ({updateTable}) => {
  const { unSetModal } = useModal()
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const submitData = async (e) => {
    e.preventDefault()
    try {
      const body = { ...form }
      await fetch("/api/supplier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      unSetModal()
      updateTable && updateTable();
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
      <h3 className={"mb-4 text-center text-lg"}>Tedarikçi Ekle</h3>
      <form onSubmit={submitData}>
        <Grid row={3} col={1} className={"gap-y-4 px-2"}>
          <Input
            label={"Adı"}
            name={"name"}
            value={form.name}
            onChange={(event) => {
              const { value } = event.target
              setForm((prevState) => ({ ...prevState, name: value }))
            }}
            autoFocus
          />
          <Input
            label={"Email"}
            name={"email"}
            value={form.email}
            onChange={(event) => {
              const { value } = event.target
              setForm((prevState) => ({ ...prevState, email: value }))
            }}
          />
          <Input
            label={"Telefon"}
            name={"phone"}
            value={form.phone}
            onChange={(event) => {
              const { value } = event.target
              setForm((prevState) => ({ ...prevState, phone: value }))
            }}
          />
          <Button>Kaydet</Button>
        </Grid>
      </form>
    </div>
  )
}
