import { useEffect, useState } from "react";
import Order from "../enums/Order";
import ProductColumn from "../enums/ProductColumn";

function MySortabeColumn(props: { title: string, columnId: ProductColumn, order: Order, switchOrder: (columnId: ProductColumn, order: Order) => void }) {

  const [iconClassName, setIconClassName] = useState<string>('')

  useEffect(() => {
    switch (props.order) {
      case Order.None:
        setIconClassName('')
        break;
      case Order.Ascendant:
        setIconClassName('bi bi-sort-up')
        break;
      case Order.Descendant:
        setIconClassName('bi bi-sort-down')
        break;
    }
  }, [props.order])

  const onClick = () => {
    switch (props.order) {
      case Order.None:
        props.switchOrder(props.columnId, Order.Ascendant)
        break;
      case Order.Ascendant:
        props.switchOrder(props.columnId, Order.Descendant)
        break;
      case Order.Descendant:
        props.switchOrder(props.columnId, Order.None)
        break;
    }
  }

  return <th onClick={onClick}>{props.title} <i className={iconClassName}></i></th>

}

export default MySortabeColumn
