import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import MyPagination from './components/MyPagination'
import MyProductsTable from './components/MyProductsTable'
import MyProductFilter from './components/MyProductFilter'
import Backend from './models/Backend'
import Product from './types/Product'
import PaginationType from './types/Pagination'
import ColumnOrder from './types/ColumnOrder'
import ProductColumn from './enums/ProductColumn'
import Order from './enums/Order'
import Condition from './enums/Condition'
import Filter from './types/Filter'
import './App.css'

function App() {

  const [products, setProducts] = useState<Product[]>([])
  const [pagination, setPagination] = useState<PaginationType>({ itemsPerPage: 15, totalItems: 0, currentPage: 1 })
  const [columnOrder, setColumnOrder] = useState<ColumnOrder>({ column: ProductColumn.Identity, order: Order.None })
  const [filter, setFilter] = useState<Filter>({ column: ProductColumn.Identity, condition: Condition.Contain, searchText: '' })

  useEffect(() => {
    Backend
      .getProductList(columnOrder, filter, pagination.itemsPerPage, pagination.currentPage)
      .then(res => {
        setProducts(res.products)
        setPagination(res.pagination)
      })
  }, [columnOrder, filter, pagination.currentPage])

  return (
    <Container className='pt-5'>
      <small>filter</small>
      <MyProductFilter filter={filter} switchFilter={setFilter}/>
      <small>table</small>
      <MyProductsTable products={products} switchOrder={setColumnOrder} />
      <small>pagination</small>
      <MyPagination pagination={pagination} switchPagination={setPagination} />
    </Container>
  )

}

export default App
