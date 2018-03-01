import axiosMock from 'axios'
import {createJSON} from '../myjson'

beforeEach(() => {
  axiosMock.post.mockClear()
})

test('makes a request to the myjson API with the given data', async () => {
  const data = {tests: 'rock'}
  const mockResponse = {data: {you: 'bet'}}
  axiosMock.post.mockImplementationOnce(() => Promise.resolve(mockResponse))
  const responseData = await createJSON(data)
  expect(responseData).toEqual(mockResponse.data)
  expect(axiosMock.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.post).toHaveBeenCalledWith(
    'https://api.myjson.com/bins',
    data,
  )
})
