import React, { useEffect, useState } from "react"
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

export const ExpenseEditModal: React.FC<{
  id: string
}> = ({ id }) => {
  const { unSetModal } = useModal()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    expense_type_id: "",
    safe_id: "",
    date: "",
    price: "0,00",
  })
  const submitData = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const body = { ...form }
      console.log(body);
      // await fetch("/api/expense/?id=" + id, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(body),
      // })
      // unSetModal()
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
        setForm({ expense_type_id, safe_id, date: new Date(date).toDateString(), price })
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
              name={"expense_type"}
              value={form.expense_type_id}
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
              value={form.safe_id}
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
