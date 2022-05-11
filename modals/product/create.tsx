import React, { useState } from "react"
import Card, {
  CardActions,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/core-ui/Card"
import { Button } from "../../components/core-ui/Button"
import Router from "next/router"
import { Input } from "../../components/core-ui/Input"
import { Grid } from "../../components/core-ui/Miscellaneous"
import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next"
import { Select } from "../../components/core-ui/Select"
import { getSafes } from "../../server/safe.server"
import { getAllProductTypes } from "../../server/product_type.server"
import { getAllSuppliers } from "../../server/supplier.server"
import Fillable from "../../components/core-ui/Fillable"
import Head from "next/head"
import SelectInput from "../../components/core-ui/SelectInput"

const ProductCreate: React.FC<{
  productTypes: any
  safes: any
  suppliers: any
}> = (props) => {
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
      await Router.push("/expense")
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Head>
        <title>Ürün Oluştur</title>
      </Head>
      <Card shadow={false}>
        <form onSubmit={submitData}>
          <CardHeader hasAction>
            <CardTitle>Ürün Bilgileri {form.product_type_id}</CardTitle>
          </CardHeader>
          <CardContent>
            <Grid col={1} row={4} className={"mb-4 gap-2"}>
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
                  setForm((prevState) => ({ ...prevState, model_code: value }))
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
              <Select
                options={props.safes}
                optionText={"name"}
                optionValue={"id"}
                name={"suppliers"}
                value={form.suppliers}
                title={"Tedarikçiler"}
                onChange={(value) =>
                  setForm((prevState) => ({ ...prevState, suppliers: value }))
                }
              />
            </Grid>
            <Grid col={1} row={2} className={"gap-4"}>
              <SelectInput
                inputTitle={"Alış Fiyatı"}
                selectTitle={"Kasa"}
                options={props.safes}
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
                options={props.safes}
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
          </CardContent>
          <CardFooter>
            <Button>Kaydet</Button>
          </CardFooter>
        </form>
      </Card>
    </>
  )
}

export default ProductCreate
