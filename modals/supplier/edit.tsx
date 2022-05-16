import React, { useEffect, useState } from "react"
import { Input } from "../../components/core-ui/Input"
import { Grid } from "../../components/core-ui/Miscellaneous"
import { Button } from "../../components/core-ui/Button"
import { useModal } from "../../context/modal-context"

export const SupplierEditModal: React.FC<{
  id: string
}> = ({ id }) => {
  const { unSetModal } = useModal()
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const submitData = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      const body = { ...form }
      await fetch("/api/supplier/?id=" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      unSetModal()
    } catch (error) {
      console.error(error)
    }
    setLoading(false);
  }
  useEffect(() => {
    fetch("/api/supplier/?id=" + id)
      .then((res) => res.json())
      .then((res) => {
        const { name, phone, email } = res
        setForm({ name, phone, email })
      })
  }, [])
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
          <Button loading={loading}>Kaydet</Button>
        </Grid>
      </form>
    </div>
  )
}
