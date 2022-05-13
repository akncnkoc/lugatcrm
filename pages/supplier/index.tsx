import React, { useEffect, useState } from "react"
import Head from "next/head"
import Card, {
  CardActions,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/core-ui/Card"
import { Button } from "../../components/core-ui/Button"
import { BiEdit, BiPlusCircle } from "react-icons/bi"
import {
  Datatable,
  TableDataCell,
  TableRow,
} from "../../components/core-ui/Datatable"
import { useModal } from "../../context/modal-context"
import { Input } from "../../components/core-ui/Input"
import { SupplierCreateModal } from "../../modals/supplier/create"
import { SupplierEditModal } from "../../modals/supplier/edit"

const Supplier: React.FC = (props) => {
  const [supplierData, setSupplierData] = useState<any>([])
  const { setModal, setStaticBackdrop } = useModal()
  const getData = async () => {
    await fetch("/api/supplier")
      .then((res) => res.json())
      .then((suppliers) => setSupplierData(suppliers))
  }
  useEffect(() => {
    setStaticBackdrop(true)
    getData()
  }, [])

  return (
    <>
      <Head>
        <title>Tedarikçiler</title>
      </Head>
      <Card>
        <CardHeader hasAction>
          <CardTitle>Tedarikçiler</CardTitle>
          <CardActions>
            <Button
              icon={<BiPlusCircle />}
              onClick={() => setModal(createActionModal(getData))}>
              Yeni Kayıt
            </Button>
          </CardActions>
        </CardHeader>
        <CardContent>
          <Datatable
            columns={["Tedarikçi Adı", "Email", "Telefon", "İşlemler"]}
            data={supplierData}
            render={({ innerData }) => {
              return innerData.map((supplierItem, index) => (
                <TableRow key={index}>
                  <TableDataCell>{supplierItem.name}</TableDataCell>
                  <TableDataCell>{supplierItem.email}</TableDataCell>
                  <TableDataCell>{supplierItem.phone}</TableDataCell>
                  <TableDataCell center>
                    <Button
                      icon={<BiEdit className="text-base" />}
                      onClick={() =>
                        setModal(editActionModal(supplierItem.id, getData))
                      }></Button>
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

const createActionModal = (getData) => {
  return <SupplierCreateModal updateTable={getData} />
}
const editActionModal = (id: string, getData) => {
  return <SupplierEditModal id={id} updateTable={getData} />
}

export default Supplier
