// @ts-check
// @ts-ignore
const { test, expect, request } = require('@playwright/test');
import config from '../playwright.config';
import generateFormData from '../fixtures/faker.js'

const baseURL = config.use?.baseURL || '';

test('GET - List of users', async ({ request }) => {
    const response = await request.get(`${baseURL}/users?page=2`);
    const responseData = await response.json();
    console.log('get list of users response', responseData);
    expect(response.status()).toBe(200);
    expect(responseData).toHaveProperty('page', 2);
    expect(responseData.data).toHaveLength(6);
    expect(responseData.data[1]).toHaveProperty('id', 8);
});

test('POST - Create user', async ({ request }) => {
    const response = await request.post(`${baseURL}/users`, {
        data: {
            "name": generateFormData().lastname,
            "job": generateFormData().job
        }
    });
    const responseBody = await response.json();
    console.log('Response create user', responseBody);
    expect(response.status()).toBe(201);
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toHaveProperty('id');
})

test('PUT - Update User', async ({ request }) => {
    const response = await request.put(`${baseURL}/users/2`, {
        data : {
            "name": generateFormData().lastname,
            "job": generateFormData().job
        }
    })
    const responseBody = await response.json();
    console.log('Response update user', responseBody);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty("updatedAt");
})

test('DELETE - Delete User', async({ request }) => {
    const response  = await request.delete(`${baseURL}/users/3`);
    console.log('Delete user', response);
    expect(response.status()).toBe(204);
    expect(response.ok).toBeTruthy();
})

test('POST - Register successufl', async({ request }) =>{
    const response = await request.post(`${baseURL}/register`, {
        data : {
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        }
    });
    const responseBody = await response.json();
    console.log('POST - Register', responseBody);
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('token');
    expect(response.ok()).toBeTruthy();
})

test('POST - Login successful', async({request}) =>{
    const response = await request.post(`${baseURL}/login`, {
        data : {
            "email": "eve.holt@reqres.in",
            "password": "cityslicka"
        }
    });
    const responseBody = await response.json();
    console.log('POST - Login successful', responseBody);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('token')
    let token = responseBody.token
    console.log(token);
});

test('POST - Login unsuccessful', async({request}) => {
    const response = await request.post(`${baseURL}/login`, {
        data : {
            "email": generateFormData().email
        }
    })
    const responseBody = await response.json();
    console.log('POST - Login unsuccessful',responseBody);
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);
    expect(responseBody).toHaveProperty('error', 'Missing password');
});

test('GET - Delayed response', async({ request }) => {
    const response = await request.get(`${baseURL}/users?delay=3`);
    const responseBody = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(responseBody.data).toHaveLength(6);
});