import React from "react"
import Head from "next/head"
import Card, {
  CardActions,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/core-ui/Card"
import { Button } from "../../components/core-ui/Button"
import { BiPlusCircle } from "react-icons/bi"

const Supplier: React.FC = () => {
  return (
    <>
      <Head>
        <title>Tedarikçiler</title>
      </Head>
      <Card>
        <CardHeader hasAction>
          <CardTitle>Tedarikçiler</CardTitle>
          <CardActions>
            <Button icon={<BiPlusCircle />}>Yeni Kayıt</Button>
          </CardActions>
        </CardHeader>
        <CardContent>test</CardContent>
      </Card>
    </>
  )
}

export default Supplier