import { test, expect } from '@playwright/test';

test('fill all fields and sumbit order', async ({ page }) => {
  await page.goto('https://basic-ui.tl-academy.ee/en/');

  await expect(page.getByTestId('create-order-button')).toBeDisabled();

  await page.getByTestId('first-name-input').fill('Mark')
  await expect(page.getByTestId('create-order-button')).toBeDisabled();

  await page.getByTestId('last-name-input').fill('Tam')
  await expect(page.getByTestId('create-order-button')).toBeDisabled();

  await page.getByTestId('email-input').fill('Tam@gmail.com')
  await page.getByTestId('address-input').fill('Tallinn')
  await page.getByTestId('create-order-button').click();
  await expect(page.getByTestId('order-success')).toBeVisible();

});

test('shows error on ivalid email and order button disabled', async ({ page }) => {
  await page.goto('https://basic-ui.tl-academy.ee/en/');

  await page.getByTestId('first-name-input').fill('Mark')
  await page.getByTestId('last-name-input').fill('Tam')


  await page.getByTestId('email-input').fill('Tam@')
  await page.getByTestId('address-input').fill('Tallinn')

  await expect(page.getByTestId('email-error')).toBeVisible();

  await expect(page.getByTestId('create-order-button')).toBeDisabled();

});

test('shows error on each fields', async ({ page }) => {
  await page.goto('https://basic-ui.tl-academy.ee/en/');

  await page.getByTestId('first-name-input').click();
  await page.getByTestId('last-name-input').click();

  await expect(page.getByTestId('first-name-error')).toBeVisible();

  await page.getByTestId('email-input').click()

  await expect(page.getByTestId('last-name-error')).toBeVisible();

  await page.getByTestId('address-input').click()

  await expect(page.getByTestId('email-error')).toBeVisible();
  await page.getByTestId('first-name-input').click();

  await expect(page.getByTestId('address-error')).toBeVisible();

});
