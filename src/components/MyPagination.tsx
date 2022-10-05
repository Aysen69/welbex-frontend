import React, { useEffect, useState } from "react"
import { Pagination } from "react-bootstrap"
import PaginationType from "../types/Pagination"

function MyPagination(props: { pagination: PaginationType, switchPagination: (pagination: PaginationType) => void }) {

  const [totalPages, setTotalPages] = useState<number>(1)
  const [paginationItems, setPaginationItems] = useState<React.ReactElement[]>([])

  useEffect(() => {
    setTotalPages(Math.ceil(props.pagination.totalItems / props.pagination.itemsPerPage))
  }, [props.pagination])

  useEffect(() => {
    if (totalPages < props.pagination.currentPage) {
      clickToPageNum(totalPages)
    }
    let items: React.ReactElement[] = []
    for (let i = 1, item; i < totalPages; i++) {
      items.push(
        <Pagination.Item key={i} active={props.pagination.currentPage === i} onClick={() => clickToPageNum(i)}>{i}</Pagination.Item>
      )
    }
    setPaginationItems(items)
  }, [totalPages, props.pagination.currentPage])

  const clickToPageNum = (pageNum: number) => {
    props.switchPagination({
      itemsPerPage: props.pagination.itemsPerPage,
      totalItems: props.pagination.totalItems,
      currentPage: pageNum,
    })
  }

  return (
    <Pagination>
      {/* <Pagination.First/> */}
      {/* <Pagination.Prev/> */}
      {paginationItems}
      {/* <Pagination.Next/> */}
      {/* <Pagination.Last/> */}
    </Pagination>
  )

}

export default MyPagination
