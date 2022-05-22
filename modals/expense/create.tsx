import React, { useState } from "react"
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

export const ExpenseCreateModal: React.FC<{
  updateTable?: Function
}> = ({updateTable}) => {
  const { unSetModal } = useModal()
  const [form, setForm] = useState({
    expense_type_id: "",
    safe_id: "",
    date: "",
    price: "",
  })
  const submitData = async (e) => {
    e.preventDefault()
    try {
      const body = { ...form }
      await fetch("/api/expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      updateTable && updateTable();
      unSetModal()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gider Ekle</CardTitle>
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
