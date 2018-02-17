import axiosMock from 'axios'
import {createGist} from '../gist'

// during instruction, create a simple inline axios mock first

beforeEach(() => {
  axiosMock.__mock.reset()
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
  await createGist(data)
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledWith('/', data)
})
