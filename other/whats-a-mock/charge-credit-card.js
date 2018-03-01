import axios from 'axios'

const venderId = 'some unique identifier'

async function chargeCreditCard(number, verificationNumber, amount) {
  const response = await axios.post('https://example.com/api/charge-card', {
    number,
    verificationNumber,
    amount,
    venderId,
  })
  return response.data
}

export {chargeCreditCard}
