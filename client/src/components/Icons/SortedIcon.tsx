import React from 'react'
import { validOption } from '../../dto/ValidOption.dto'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
type Props = {
  value: validOption
}

export const SortedIcon = (props: Props) => {
  const { value } = props
  switch (value) {
    case 'desc':
      return <ArrowDownwardIcon />
    case 'asc':
      return <ArrowUpwardIcon />
    default:
      return <FilterAltIcon />
  }
}
