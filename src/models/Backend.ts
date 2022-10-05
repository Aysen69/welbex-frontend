import qs from 'qs'
import ColumnOrder from '../types/ColumnOrder'
import Filter from '../types/Filter'
import ProductsRequest from '../types/ProductsRequest'
import ProductsResponse from '../types/ProductsResponse'

export default class Backend {

  public static async getProductList(columnOrder: ColumnOrder, filter: Filter, itemsPerPage: number, currentPage: number) {
    const ProductsRequest: ProductsRequest = {
      sortColumn: columnOrder.column,
      sortOrder: columnOrder.order,
      filterColumn: filter.column,
      filterCondition: filter.condition,
      filterSearchText: filter.searchText,
      itemsPerPage: itemsPerPage,
      currentPage: currentPage,
    }
    const params = qs.stringify(ProductsRequest)
    const res = await fetch('http://localhost:3000/products?' + params, { mode: 'cors' })
    const json = await res.json()
    if (json.ok === false) throw new Error(json.message)
    const productsResponse: ProductsResponse = json.data
    return productsResponse
  }

}
