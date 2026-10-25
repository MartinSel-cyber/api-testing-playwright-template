import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { AccountDto } from '../dto/account-dto'

test('get accounts with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://shop.tl-academy.ee/api/accounts/1', {
    headers: { 'X-API-KEY': 'my-api-key' },
  })

  // Parse raw response body to JSON
  const responseBody = await response.json()
  const statusCode = response.status()

  // Log the response body
  console.log('response body:', responseBody)

  // Check if the response status is 200
  expect(statusCode).toBe(StatusCodes.OK)
})

test('create account with correct payload should receive code 201', async ({ request }) => {
  // Build and send a POST request to the server
  const response = await request.post('https://shop.tl-academy.ee/api/accounts', {
    headers: { 'X-API-KEY': 'my-api-key' },
    data: new AccountDto('Mark', 'USD'),
  })

  // Parse raw response body to JSON
  const responseBody = await response.json()
  console.log('response body:', responseBody)
  const statusCode = response.status()
  const accountId = responseBody.id
  console.log('account id:', accountId)
  // Check if the response status is 201
  expect(statusCode).toBe(StatusCodes.CREATED)

  const responseDeposit = await request.post(
    `https://shop.tl-academy.ee/api/accounts/${accountId}/deposit`,
    {
      headers: { 'X-API-KEY': 'my-api-key' },
      data: { amount: 23 },
    },
  )

  const responseBodyDeposit = await responseDeposit.json()
  const depositStatus = responseDeposit.status()
  console.log('response body:', responseBodyDeposit)
  console.log('code', depositStatus)
})
