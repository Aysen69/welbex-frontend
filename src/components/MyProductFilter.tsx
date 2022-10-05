import { useEffect, useState } from "react"
import { Form, InputGroup } from "react-bootstrap"
import Condition from "../enums/Condition"
import ProductColumn from "../enums/ProductColumn"
import Filter from "../types/Filter"

function MyProductFilter(props: { filter: Filter, switchFilter: (filter: Filter) => void }) {

  const [column, setColumn] = useState<ProductColumn>(ProductColumn.Identity)
  const [condition, setCondition] = useState<Condition>(Condition.Contain)
  const [searchText, setSearchText] = useState<string>('')

  useEffect(() => {
    props.switchFilter({ column: column, condition: condition, searchText: searchText })
  }, [column, condition, searchText])

  return (
    <InputGroup className="mb-3">
      <Form.Select value={column} onChange={c => setColumn(c.target.value as ProductColumn)}>
        <option> - Колонка - </option>
        <option value={ProductColumn.Identity}>{ProductColumn.Identity}</option>
        <option value={ProductColumn.Date}>{ProductColumn.Date}</option>
        <option value={ProductColumn.Name}>{ProductColumn.Name}</option>
        <option value={ProductColumn.Quantity}>{ProductColumn.Quantity}</option>
        <option value={ProductColumn.Distance}>{ProductColumn.Distance}</option>
      </Form.Select>
      <Form.Select value={condition} onChange={c => setCondition(Number(c.target.value) as Condition)}>
        <option> - Условие - </option>
        <option value={Condition.Equal}>равно</option>
        <option value={Condition.Contain}>содержит</option>
        <option value={Condition.More}>больше</option>
        <option value={Condition.Less}>меньше</option>
      </Form.Select>
      <Form.Control value={searchText} onChange={t => setSearchText(t.target.value)} placeholder="Значение"/>
    </InputGroup>
  )

}

export default MyProductFilter
