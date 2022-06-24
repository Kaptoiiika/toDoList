import { Button, CircularProgress, Pagination } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { ItemCard } from '../components/cards/ItemCard'
import { ItemAddForm } from '../components/forms/ItemAddForm/ItemAddForm'
import { SortedIcon } from '../components/Icons/SortedIcon'
import { itemStore } from '../store/ItemsStore'
import { queryStore } from '../store/QueryStore'
import './ItemPage.scss'

type Props = {}

const ItemPage = observer((props: Props) => {
  const navigate = useNavigate()

  const items = itemStore.items
  const countAll = itemStore.countAll
  const loading = itemStore.loading

  const limit = queryStore.limit
  const currentPage = queryStore.page
  const username = queryStore.username
  const email = queryStore.email
  const status = queryStore.status

  const totalPage = Math.ceil(countAll / limit)

  React.useEffect(() => {
    if (!items) itemStore.getItems()
  }, [items])

  const handleChangePage = (e: any, value: number) => {
    queryStore.setPage(value)
  }
  const handleUsernameFilter = () => {
    queryStore.setUsernameFilter()
  }
  const handleEmailFilter = () => {
    queryStore.setEmailFilter()
  }
  const handleStatusFilter = () => {
    queryStore.setStatusFilter()
  }

  const hundleNavigate = React.useCallback(() => {
    const params: any = {}

    params.page = currentPage
    if (username) params.username = username

    if (email) params.email = email

    if (status) params.status = status

    navigate({
      pathname: '',
      search: `?${createSearchParams(params)}`,
    })
    itemStore.getItems()
  }, [currentPage, email, navigate, status, username])

  React.useEffect(() => {
    hundleNavigate()
  }, [hundleNavigate])

  return (
    <div className="itemPage">
      <ItemAddForm />
      <div className="itemPage-filter">
        <Button variant="contained" onClick={handleUsernameFilter}>
          username
          <SortedIcon value={username} />
        </Button>
        <Button variant="contained" onClick={handleEmailFilter}>
          email
          <SortedIcon value={email} />
        </Button>
        <Button variant="contained" onClick={handleStatusFilter}>
          status
          <SortedIcon value={status} />
        </Button>
      </div>
      <div className="items">
        {loading && (
          <div className="items-loading">
            <CircularProgress />
          </div>
        )}
        {items && items.map((item) => <ItemCard key={item.id} item={item} />)}
      </div>
      <div className="paginator">
        <Pagination
          count={totalPage}
          page={currentPage}
          onChange={handleChangePage}
        />
      </div>
    </div>
  )
})
export default ItemPage
