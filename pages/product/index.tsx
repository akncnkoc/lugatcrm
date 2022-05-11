import React, { useEffect } from "react"
import { Button, LinkButton } from "../../components/core-ui/Button"
import Card, {
  CardActions,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/core-ui/Card"
import {
  Datatable,
  TableDataCell,
  TableRow,
} from "../../components/core-ui/Datatable"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { MomentFormatted, MomentLocalized } from "../../lib/momentLocalized"
import { BiEditAlt } from "react-icons/bi"
import { Tooltip } from "../../components/core-ui/Tooltip"
import { useModal } from "../../context/modal-context"
import { getAllProducts } from "../../server/product.server"
import ProductCreate from "../../modals/product/create"
import { getAllProductTypes } from "../../server/product_type.server"
import { getSafes } from "../../server/safe.server"
import { getAllSuppliers } from "../../server/supplier.server"

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await getAllProducts()
  const productTypes = await getAllProductTypes()
  const safes = await getSafes()
  const suppliers = await getAllSuppliers()
  return { props: { products, productTypes, safes, suppliers } }
}
const Product: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { setModal, setStaticBackdrop } = useModal()

  useEffect(() => {
    setStaticBackdrop(true)
  }, [setStaticBackdrop])
  return (
    <>
      <Card>
        <CardHeader hasAction>
          <CardTitle>Ürünler</CardTitle>
          <CardActions>
            <Button onClick={() => setModal(prepareDeleteAction(props))}>
              Yeni Kayıt
            </Button>
          </CardActions>
        </CardHeader>
        <CardContent>
          <Datatable
            columns={[
              "Ürün Adı",
              "Model Kodu",
              "Ürün Tipi",
              "Stok",
              "Alış Fiyatı",
              "Satış Fiyatı",
              "Tedarikçiler",
              "İşlemler",
            ]}
            data={props.products}
            options={{
              pageSize: 5,
            }}
            render={({ innerData }) => {
              return innerData.map((dataItem, index) => (
                <TableRow key={index}>
                  <TableDataCell> {dataItem.expense_type.name}</TableDataCell>
                  <TableDataCell> {dataItem.safe.name}</TableDataCell>
                  <TableDataCell> {dataItem.price}</TableDataCell>
                  <TableDataCell>
                    {MomentFormatted(dataItem.date)}
                  </TableDataCell>
                  <TableDataCell>
                    {MomentLocalized(dataItem.updated_at)}
                  </TableDataCell>
                  <TableDataCell>
                    <LinkButton to={"/expense/edit/" + dataItem.id}>
                      <Tooltip>Düzenle</Tooltip>
                      <BiEditAlt size={"16"} />
                    </LinkButton>
                  </TableDataCell>
                </TableRow>
              ))
            }}
          />
        </CardContent>
      </Card>
    </>
  )
}

const prepareDeleteAction = (props) => {
  return (
    <ProductCreate
      productTypes={props.productTypes}
      safes={props.safes}
      suppliers={props.suppliers}
    />
  )
}

export default Product
