import React, { useState } from "react"
import Card, {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/core-ui/Card"
import {Button, PrimaryButton} from "../../components/core-ui/Button"
import { Input } from "../../components/core-ui/Input"
import { Grid } from "../../components/core-ui/Miscellaneous"
import { Select } from "../../components/core-ui/Select"
import SelectInput from "../../components/core-ui/SelectInput"
import Head from "next/head"
import CheckBox from "../../components/core-ui/Checkbox"

const ProductCreate: React.FC = () => {
  const [form, setForm] = useState<any>({
    name: "",
    model_code: "",
    buying_price: "",
    buy_price_safe_id: "",
    sale_price: "",
    sale_price_safe_id: "",
    suppliers: [],
    critical_stock_alert: false,
    product_type_id: "",
    //TODO: product image must be added later
    //product_image: "",
  })

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { ...form }
      await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Head>
        <title>Ürün Oluştur</title>
      </Head>
      <Card>
        <form onSubmit={submitData}>
          <CardHeader hasAction>
            <CardTitle>Ürün Bilgileri</CardTitle>
          </CardHeader>
          <CardContent>
            <Grid column={1} row={1} rowGap={20}>
              <Grid column={1} row={4} rowGap={10}>
                <Select
                  optionText={"name"}
                  optionValue={"id"}
                  name={"suppliers"}
                  multiple
                  async
                  asyncLoadUrl={"/api/supplier"}
                  value={form.suppliers}
                  title={"Tedarikçiler"}
                  onChange={(value) =>
                    setForm((prevState) => ({ ...prevState, suppliers: value }))
                  }
                />
                <Input
                  label={"Ürün Adı"}
                  value={form.name}
                  onChange={(event) => {
                    const { value } = event.target
                    setForm((prevState) => ({ ...prevState, name: value }))
                  }}
                />
                <Input
                  label={"Model Kodu"}
                  value={form.model_code}
                  onChange={(event) => {
                    const { value } = event.target
                    setForm((prevState) => ({
                      ...prevState,
                      model_code: value,
                    }))
                  }}
                />
                <Select
                  optionText={"name"}
                  optionValue={"id"}
                  name={"product_type"}
                  value={form.product_type_id}
                  title={"Ürün Tipi"}
                  onChange={(value) =>
                    setForm((prevState) => ({
                      ...prevState,
                      product_type_id: value,
                    }))
                  }
                  async
                  asyncLoadUrl={"/api/product_type"}
                />
              </Grid>
              <Grid column={1} row={2} rowGap={10}>
                <SelectInput
                    inputTitle={"Alış Fiyatı"}
                    selectTitle={"Kasa"}
                    asyncData={"/api/safe"}
                    selectedValue={form.buying_price_safe_id}
                    textValue={form.buying_price}
                    selectOptionText={"name"}
                    selectOptionValue={"id"}
                    inputName={"buying_price"}
                    selectName={"buying_price_safe_id"}
                    onSelectChange={setForm}
                    onTextChange={setForm}
                />
                <SelectInput
                    inputTitle={"Satış Fiyatı"}
                    selectTitle={"Kasa"}
                    asyncData={"/api/safe"}
                    selectedValue={form.sale_price_safe_id}
                    textValue={form.sale_price}
                    selectOptionText={"name"}
                    selectOptionValue={"id"}
                    inputName={"sale_price"}
                    selectName={"sale_price_safe_id"}
                    onSelectChange={setForm}
                    onTextChange={setForm}
                />
              </Grid>
              <Grid column={1} row={1}>
                <CheckBox
                    value={form.critical_stock_alert}
                    onChange={(value) =>
                        setForm((prevState) => ({
                          ...prevState,
                          critical_stock_alert: value,
                        }))
                    }>
                  Kritik Stok Kaldıgında Uyarı Ver
                </CheckBox>
              </Grid>
            </Grid>
          </CardContent>
          <CardFooter>
            <PrimaryButton>Kaydet</PrimaryButton>
          </CardFooter>
        </form>
      </Card>
    </>
  )
}

export default ProductCreate
