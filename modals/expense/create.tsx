import React, { useState } from "react"
import { Input } from "../../components/core-ui/Input"
import { Grid } from "../../components/core-ui/Miscellaneous"
import { Button, PrimaryButton } from "../../components/core-ui/Button"
import { useModal } from "../../context/modal-context"
import Card, {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/core-ui/Card"
import { Select } from "../../components/core-ui/Select"
import { CurrencyInput } from "../../components/core-ui/CurrencyInput"

export const ExpenseCreateModal: React.FC = () => {
  const { unSetModal } = useModal()
  const [form, setForm] = useState({
    expense_type_id: "",
    safe_id: "",
    date: "",
    price: "0,00",
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
      // unSetModal()
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
              name={"expense_type"}
              async
              asyncLoadUrl={"/api/expense_type"}
              optionText={"name"}
              optionValue={"id"}
              onChange={(value) =>
                setForm((prevState) => ({
                  ...prevState,
                  expense_type_id: value,
                }))
              }
            />
            <Input
              label={"Fiş Tarihi"}
              name={"date"}
              value={form.date}
              type={"datetime-local"}
              bindTo={setForm}
            />
            <Select
              title={"Kasa"}
              name={"safe"}
              async
              asyncLoadUrl={"/api/safe"}
              optionText={"name"}
              optionValue={"id"}
              onChange={(value) =>
                setForm((prevState) => ({
                  ...prevState,
                  safe_id: value,
                }))
              }
            />
            <CurrencyInput
              label={"Fiyat"}
              name={"price"}
              currencyValue={form.price}
              onInputChange={(event, value) => {
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
