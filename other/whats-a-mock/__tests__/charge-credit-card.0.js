import axios from 'axios'
import {chargeCreditCard} from '../charge-credit-card'

const originalPost = axios.post

beforeEach(() => {
  axios.post = originalPost
})

test('charges the card', async () => {
  const postCalls = []
  const mockResponse = {data: {success: true}}
  axios.post = (...args) => {
    postCalls.push(args)
    return Promise.resolve(mockResponse)
  }

  const number = '1234567887654321'
  const verificationNumber = '123'
  const amount = 140.33
  const responseData = await chargeCreditCard(
    number,
    verificationNumber,
    amount,
  )
  expect(responseData).toEqual(mockResponse.data)
})
