import {expect, test} from "@playwright/test";

test('shows success message when order created', async ({ page }) => {
    await page.goto('https://shop.tl-academy.ee/checkout');

    await page.getByTestId('email-input').fill('Tam@mail.com')
    await page.getByTestId('name-input').fill('Mark Tam')


    await expect(page.getByTestId('place-order-button')).toBeEnabled();

    await page.getByTestId('place-order-button').click();
    await expect(page.getByTestId('order-message')).toBeVisible();

});

test('default state validation', async ({ page }) => {
    await page.goto('https://shop.tl-academy.ee/checkout');


    await expect(page.getByTestId('place-order-button')).toBeDisabled();

    await expect(page.getByTestId('delivery-parcel-locker-radio')).toBeChecked();

    await expect(page.getByTestId('delivery-home-radio')).not.toBeChecked();

    await expect(page.getByTestId('payment-card-radio')).toBeChecked();

    await expect(page.getByTestId('payment-paypal-radio')).toBeChecked({checked: false});
});

test('shows validation errors for invalid email', async ({ page }) => {
    await page.goto('https://shop.tl-academy.ee/checkout');


    await page.getByTestId('email-input').fill('M');
    await page.getByTestId('name-input').fill('');


    await expect(page.getByTestId('email-error')).toBeVisible();


    await expect(page.getByTestId('place-order-button')).toBeDisabled();

});