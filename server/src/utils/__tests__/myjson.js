import axiosMock from 'axios'
import {createJSON} from '../myjson'

beforeEach(() => {
  axiosMock.__mock.reset()
})

test('makes a request to the myjson API with the given data', async () => {
  const data = {tests: 'rock'}
  await createJSON(data)
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledWith('/bins', data)
})
