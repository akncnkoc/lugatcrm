import React, { useState } from "react"
import { BiEditAlt, BiTrash } from "react-icons/bi"
import { IconButton, PrimaryButton } from "../../components/core-ui/Button"
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
import { Tooltip } from "../../components/core-ui/Tooltip"
import { useModal } from "../../context/modal-context"
import { MomentFormatted } from "../../lib/momentLocalized"
import { ExpenseEditModal } from "../../modals/expense/edit"
import { ExpenseCreateModal } from "../../modals/expense/create"
import NumberFormat from "react-currency-format"
import useConfirm from "../../modals/global/useConfirm"

const Expense: React.FC<any> = (props) => {
  const { setModal } = useModal()
  const { useconfirm } = useConfirm()


  const prepareEditAction = (id) => {
    return <ExpenseEditModal id={id} updateTable={null} />
  }
  const prepareCreateAction = () => {
    return <ExpenseCreateModal updateTable={null} />
  }
  const prepareDeleteAction = async (id) => {
    let isConfirmed = await useconfirm("Silmek istiyormusunuz")
    if (isConfirmed) {
      await fetch("/api/expense?id=" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          console.log(res)
          // reloadData()
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <>
      <Card>
        <CardHeader hasAction>
          <CardTitle>Giderler</CardTitle>
          <CardActions>
            <PrimaryButton onClick={() => setModal(prepareCreateAction)}>
              Yeni Kayıt
            </PrimaryButton>
          </CardActions>
        </CardHeader>
        <CardContent>
          <Datatable
            columns={[
              "Gider Tipi",
              "Kasa",
              "Tutar",
              "Fiş Tarihi",
              "Son Düzenlenme Tarihi",
              "İşlemler",
            ]}
            asyncData={"/api/expense"}
            render={({ asyncItems, loadData }) => {
              return asyncItems.map((dataItem, index) => (
                <TableRow key={index}>
                  <TableDataCell>{dataItem.expense_type.name}</TableDataCell>
                  <TableDataCell>{dataItem.safe.name}</TableDataCell>
                  <TableDataCell>
                    <NumberFormat
                      value={dataItem.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={" " + dataItem.safe?.currency?.code}
                    />
                  </TableDataCell>
                  <TableDataCell>
                    {MomentFormatted(dataItem.date)}
                  </TableDataCell>
                  <TableDataCell>
                    {MomentFormatted(dataItem.updated_at)}
                  </TableDataCell>
                  <TableDataCell>
                    <IconButton
                      onClick={() => setModal(prepareEditAction(dataItem.id))}>
                      <Tooltip>Düzenle</Tooltip>
                      <BiEditAlt size={"16"} />
                    </IconButton>
                    <IconButton
                      onClick={() => prepareDeleteAction(dataItem.id)}>
                      <Tooltip>Sil</Tooltip>
                      <BiTrash size={"16"} />
                    </IconButton>
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


export default Expense
