import React, { useEffect, useState } from "react"
import { Input } from "../../components/core-ui/Input"
import { Grid } from "../../components/core-ui/Miscellaneous"
import { PrimaryButton } from "../../components/core-ui/Button"
import { useModal } from "../../context/modal-context"
import Card, {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/core-ui/Card"
import { Select } from "../../components/core-ui/Select"
import { CurrencyInput } from "../../components/core-ui/CurrencyInput"
import { MomentFormatted } from "../../lib/momentLocalized"

export const ExpenseEditModal: React.FC<{
  id: string
  updateTable?: Function
}> = ({ id, updateTable }) => {
  const { unSetModal } = useModal()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    expense_type_id: "",
    safe_id: "",
    date: "",
    price: "",
  })
  const submitData = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const body = { ...form }
      console.log(body)
      await fetch("/api/expense/?id=" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      updateTable && updateTable()
      unSetModal()
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetch("/api/expense/?id=" + id)
      .then((res) => res.json())
      .then((res) => {
        const { expense_type_id, safe_id, date, price } = res
        setForm({
          expense_type_id,
          safe_id,
          date: MomentFormatted(date, "YYYY-MM-DD[T]HH:mm:ss"),
          price,
        })
      })
  }, [])
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gider Düzenle</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submitData}>
          <Grid row={2} column={2} rowGap={10} columnGap={10}>
            <Select
              title={"Gider Türü"}
              name={"expense_type_id"}
              value={form.expense_type_id}
              async
              asyncLoadUrl={"/api/expense_type"}
              optionText={"name"}
              optionValue={"id"}
              bindTo={setForm}
            />
            <Input
              label={"Fiş Tarihi"}
              name={"date"}
              value={form.date}
              type={"datetime-local"}
              pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
              bindTo={setForm}
            />
            <Select
              title={"Kasa"}
              name={"safe_id"}
              value={form.safe_id}
              async
              asyncLoadUrl={"/api/safe"}
              optionText={"name"}
              optionValue={"id"}
              bindTo={setForm}
            />
            <CurrencyInput
              label={"Fiyat"}
              name={"price"}
              value={form.price}
              onInputChange={(value) => {
                setForm((prevState) => ({ ...prevState, price: value }))
              }}
            />
          </Grid>
          <CardFooter>
            <PrimaryButton>Kaydet</PrimaryButton>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}
