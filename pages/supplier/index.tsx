import Head from "next/head"
import React, { useEffect } from "react"
import { BiEdit, BiPlusCircle, BiTrash } from "react-icons/bi"
import {Button, IconButton, PrimaryButton} from "../../components/core-ui/Button"
import Card, {
  CardActions,
  CardContent,
  CardHeader,
  CardTitle
} from "../../components/core-ui/Card"
import {
  Datatable,
  TableDataCell,
  TableRow
} from "../../components/core-ui/Datatable"
import { useModal } from "../../context/modal-context"
import { SupplierCreateModal } from "../../modals/supplier/create"
import { SupplierEditModal } from "../../modals/supplier/edit"
import useConfirm from "./../../modals/global/useConfirm"

const Supplier: React.FC = (props) => {
  const { setModal, setStaticBackdrop } = useModal()
  const { useconfirm } = useConfirm()

  const createConfirmDialog = async () => {
    let isConfirmed = await useconfirm("Silmek istiyormusunuz")
    if (isConfirmed) console.log("okey")
    else console.log("iptal")
  }
  useEffect(() => {
    setStaticBackdrop(true)
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
            <PrimaryButton
              icon={<BiPlusCircle />}
              onClick={() => setModal(createActionModal())}>
              Yeni Kayıt
            </PrimaryButton>
          </CardActions>
        </CardHeader>
        <CardContent>
          <Datatable
            columns={["Tedarikçi Adı", "Email", "Telefon", "İşlemler"]}
            asyncData="/api/supplier"
            options={{
              pageSize:5
            }}
            render={({ asyncItems }) => {
              return asyncItems.map((supplierItem, index) => (
                <TableRow key={index}>
                  <TableDataCell>{supplierItem.name}</TableDataCell>
                  <TableDataCell>{supplierItem.email}</TableDataCell>
                  <TableDataCell>{supplierItem.phone}</TableDataCell>
                  <TableDataCell center>
                    <PrimaryButton
                      icon={<BiEdit className="text-base" />}
                      onClick={() =>
                        setModal(editActionModal(supplierItem.id))
                      }></PrimaryButton>
                    <PrimaryButton
                      icon={<BiTrash className="text-base" />}
                      onClick={() => createConfirmDialog()}></PrimaryButton>
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

const createActionModal = () => {
  return <SupplierCreateModal />
}
const editActionModal = (id: string) => {
  return <SupplierEditModal id={id} />
}

const createConfirmDialog = async () => {
  await confirm("Silmek istiyormusunuz")
}

export default Supplier
