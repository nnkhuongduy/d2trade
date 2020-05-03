import _ from 'lodash'

import { userQuickSort } from './user-sort'

export const userQueryFilter = (query, filter, users) => {
  let index = 1;

  if (filter) {
    users = userQuickSort(users, 0, users.length - 1, filter)
  }

  users = users.filter(user => _.lowerCase(user.personaname).includes(_.lowerCase(query)))

  users.forEach(user => {
    user.itemIndex = index
    index++
  })

  return users
}