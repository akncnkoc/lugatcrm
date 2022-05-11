import React, { useState } from "react"
import Card, {
  CardActions,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/core-ui/Card"
import { Button } from "../../../components/core-ui/Button"
import Router from "next/router"
import { Input } from "../../../components/core-ui/Input"
import { Grid } from "../../../components/core-ui/Miscellaneous"
import { GetServerSideProps } from "next"
import { Select } from "../../../components/core-ui/Select"
import { Textarea } from "../../../components/core-ui/Textarea"
import { getExpenseData } from "../../../server/expense.server"
import { MomentFormatted } from "../../../lib/momentLocalized"
import { getSafes } from "../../../server/safe.server"
import { getExpenseTypes } from "../../../server/expense_type.server"
import { toast } from "../../../components/core-ui/Toast"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let expense = await getExpenseData(String(params?.id))
  const expenseTypes = await getExpenseTypes()
  const safes = await getSafes()
  return {
    props: {
      expenseTypes,
      safes,
      expense: JSON.parse(JSON.stringify(expense)),
    },
  }
}
const ExpenseEdit: React.FC<any> = (props) => {
  const [form, setForm] = useState<any>({
    price: props.expense.price,
    expense_type_id: props.expense.expense_type_id,
    safe_id: props.expense.safe_id,
    date: MomentFormatted(props.expense.date, "YYYY-MM-DDTkk:mm"),
    comment: props.expense.comment,
  })

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { ...form, id: props.expense.id }
      await fetch("/api/expense", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      toast("Kaydedildi")
      await Router.push("/expense")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card>
      <form onSubmit={submitData} className={"w-full"}>
        <CardHeader hasAction>
          <CardTitle>Gider Bilgileri</CardTitle>
          <CardActions>
            <Button>Kaydet</Button>
          </CardActions>
        </CardHeader>
        <CardContent>
          <Grid col={2} row={2} className={"gap-2 gap-x-4"}>
            <Select
              options={props.expenseTypes}
              optionText={"name"}
              optionValue={"id"}
              name={"expense_type"}
              value={form.expense_type}
              title={"Gider Tipi"}
              onChange={(value) =>
                setForm((prevState) => ({ ...prevState, expense_type: value }))
              }
            />
            <Input
              label={"Fiş Tarihi"}
              type={"datetime-local"}
              value={form.date}
              onChange={(event) => {
                const { value } = event.target
                setForm((prevState) => ({ ...prevState, date: value }))
              }}
            />
            <Select
              options={props.safes}
              optionText={"name"}
              optionValue={"id"}
              name={"safe"}
              value={form.safe}
              title={"Kasa"}
              onChange={(value) =>
                setForm((prevState) => ({ ...prevState, safe: value }))
              }
            />
            <Input
              label={"Fiyat"}
              name={"price"}
              value={form.price}
              onChange={(e) => {
                const { value } = e.target
                setForm((prevState) => ({ ...prevState, price: value }))
              }}
            />
          </Grid>
          <Textarea
            name={"comment"}
            label={"Yorum"}
            value={form.comment}
            onChange={(event) => {
              const { value } = event.target
              setForm((prevState) => ({ ...prevState, comment: value }))
            }}
          />
        </CardContent>
      </form>
    </Card>
  )
}

export default ExpenseEdit
