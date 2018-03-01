import axiosMock from 'axios'
import {createGist} from '../gist'

// during instruction, create a simple inline axios mock first

beforeEach(() => {
  axiosMock.post.mockClear()
})

test('makes a request to the github API with the given data', async () => {
  const data = {
    description: 'the description for this gist',
    public: true,
    files: {
      'file1.txt': {
        content: 'String file contents',
      },
    },
  }
  const mockResponse = {data: {id: '123'}}
  axiosMock.post.mockImplementationOnce(() => Promise.resolve(mockResponse))
  const responseData = await createGist(data)
  expect(responseData).toEqual(mockResponse.data)
  expect(axiosMock.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.post).toHaveBeenCalledWith(
    'https://api.github.com/gists',
    data,
  )
})
