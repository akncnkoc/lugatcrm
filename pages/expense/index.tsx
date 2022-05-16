import React, { useEffect, useState } from "react"
import { BiEditAlt } from "react-icons/bi"
import { Button, LinkButton } from "../../components/core-ui/Button"
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
import { Tooltip } from "../../components/core-ui/Tooltip"
import { useModal } from "../../context/modal-context"
import { MomentFormatted, MomentLocalized } from "../../lib/momentLocalized"

const Expense: React.FC<any> = (props) => {
  const { setModal } = useModal()
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/api/expense")
      .then(res => res.json())
      .then(res => setData(res))
  }, []);

  return (
    <>
      <Card>
        <CardHeader hasAction>
          <CardTitle>Giderler</CardTitle>
          <CardActions>
            <Button onClick={() => setModal(prepareDeleteAction)}>Test</Button>
            <LinkButton to={"/expense/create"}>Yeni Kayıt</LinkButton>
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
            options={{
              pageSize: 5,
            }}
            render={({ asyncItems }) => {
              return asyncItems.map((dataItem, index) => (
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

const prepareDeleteAction = () => {
  return <h1>Bu gideri gerçekten silmek istiyor musun ?</h1>
}

export default Expense
