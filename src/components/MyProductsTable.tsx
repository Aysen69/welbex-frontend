import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import Order from "../enums/Order"
import ProductColumn from "../enums/ProductColumn"
import ColumnOrder from "../types/ColumnOrder"
import Product from "../types/Product"
import MySortabeColumn from "./MySortableColumn"

function MyTable(props: { products: Product[], switchOrder: (columnOrder: ColumnOrder) => void }) {

  const [idOrder, setIdOrder] = useState<Order>(Order.None)
  const [nameOrder, setNameOrder] = useState<Order>(Order.None)
  const [quantityOrder, setQuantityOrder] = useState<Order>(Order.None)
  const [distanceOrder, setDistanceOrder] = useState<Order>(Order.None)
  const [currentColumn, setCurrentColumn] = useState<ColumnOrder>({ column: ProductColumn.Identity, order: Order.None })

  useEffect(() => {
    setIdOrder(currentColumn.column === ProductColumn.Identity ? currentColumn.order : Order.None)
    setNameOrder(currentColumn.column === ProductColumn.Name ? currentColumn.order : Order.None)
    setQuantityOrder(currentColumn.column === ProductColumn.Quantity ? currentColumn.order : Order.None)
    setDistanceOrder(currentColumn.column === ProductColumn.Distance ? currentColumn.order : Order.None)
    props.switchOrder(currentColumn)
  }, [currentColumn])

  const setOrder = (columnId: ProductColumn, order: Order) => {
    setCurrentColumn({ column: columnId, order: order })
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <MySortabeColumn title="#" columnId={ProductColumn.Identity} order={idOrder} switchOrder={setOrder}/>
          <th>Date</th>
          <MySortabeColumn title="Name" columnId={ProductColumn.Name} order={nameOrder} switchOrder={setOrder}/>
          <MySortabeColumn title="Quantity" columnId={ProductColumn.Quantity} order={quantityOrder} switchOrder={setOrder}/>
          <MySortabeColumn title="Distance" columnId={ProductColumn.Distance} order={distanceOrder} switchOrder={setOrder}/>
        </tr>
      </thead>
      <tbody>
        {props.products.map((product) => {
          return (
            <tr>
              <td>{product[ProductColumn.Identity]}</td>
              <td>{product[ProductColumn.Date]}</td>
              <td>{product[ProductColumn.Name]}</td>
              <td>{product[ProductColumn.Quantity]}</td>
              <td>{product[ProductColumn.Distance]}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )

}

export default MyTable
