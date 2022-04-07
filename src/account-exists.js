import abortableFetch from "abortable-fetch"
import { debounce } from 'debounce-promise-with-cancel'

export const exists = debounce(
  (account = '') => abortableFetch(`/apis/account-exists?`
    + new URLSearchParams({
      account,
    }))
    .then(res => res.json())
    .then(body => {
      console.log(body)
      return body.exists
    })
  , 500)