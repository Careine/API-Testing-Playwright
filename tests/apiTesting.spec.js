// @ts-check
// @ts-ignore
const { test, expect, request } = require('@playwright/test');
import config from '../playwright.config';
import generateFormData from '../fixtures/faker.js'

// URL de base pour toutes les requêtes API
const baseURL = config.use?.baseURL || '';

// Test pour récupérer la liste des utilisateurs
test('GET - List of users', async ({ request }) => {
    // Envoi d'une requête GET pour obtenir la page 2 des utilisateurs
    const response = await request.get(`${baseURL}/users?page=2`);
    const responseData = await response.json();
    // console.log('get list of users response', responseData);
    // Vérification du statut 200 (succès)
    expect(response.status()).toBe(200);
    // Vérification que nous sommes bien sur la page 2
    expect(responseData).toHaveProperty('page', 2);
    // Vérification qu'il y a 6 utilisateurs dans la réponse
    expect(responseData.data).toHaveLength(6);
    // Vérification que l'utilisateur à l'index 1 a l'ID 8
    expect(responseData.data[1]).toHaveProperty('id', 8);
});

// Test pour créer un nouvel utilisateur
test('POST - Create user', async ({ request }) => {
    // Envoi d'une requête POST avec des données générées aléatoirement
    const response = await request.post(`${baseURL}/users`, {
        data: {
            "name": generateFormData().lastname,
            "job": generateFormData().job
        }
    });
    const responseBody = await response.json();
    // console.log('Response create user', responseBody);
    // Vérification du statut 201 (création réussie)
    expect(response.status()).toBe(201);
    expect(response.ok()).toBeTruthy();
    // Vérification que l'ID a été généré
    expect(responseBody).toHaveProperty('id');
})

// Test pour mettre à jour un utilisateur existant
test('PUT - Update User', async ({ request }) => {
    // Envoi d'une requête PUT pour modifier l'utilisateur avec l'ID 2
    const response = await request.put(`${baseURL}/users/2`, {
        data : {
            "name": generateFormData().lastname,
            "job": generateFormData().job
        }
    })
    const responseBody = await response.json();
    // console.log('Response update user', responseBody);
    expect(response.ok()).toBeTruthy();
    // Vérification du statut 200 (succès)
    expect(response.status()).toBe(200);
    // Vérification que la date de mise à jour est présente
    expect(responseBody).toHaveProperty("updatedAt");
})

// Test pour supprimer un utilisateur
test('DELETE - Delete User', async({ request }) => {
    // Envoi d'une requête DELETE pour supprimer l'utilisateur avec l'ID 3
    const response  = await request.delete(`${baseURL}/users/3`);
    // console.log('Delete user', response);
    // Vérification du statut 204 (suppression réussie)
    expect(response.status()).toBe(204);
    expect(response.ok).toBeTruthy();
})

// Test pour l'enregistrement d'un nouvel utilisateur
test('POST - Register successufl', async({ request }) =>{
    // Envoi d'une requête POST avec des identifiants valides
    const response = await request.post(`${baseURL}/register`, {
        data : {
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        }
    });
    const responseBody = await response.json();
    // console.log('POST - Register', responseBody);
    // Vérification du statut 200 et de la présence du token
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('token');
    expect(response.ok()).toBeTruthy();
})

// Test pour la connexion réussie
test('POST - Login successful', async({request}) =>{
    // Envoi d'une requête POST avec des identifiants valides
    const response = await request.post(`${baseURL}/login`, {
        data : {
            "email": "eve.holt@reqres.in",
            "password": "cityslicka"
        }
    });
    const responseBody = await response.json();
    // console.log('POST - Login successful', responseBody);
    expect(response.ok()).toBeTruthy();
    // Vérification du statut 200 et de la présence du token
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('token')
    let token = responseBody.token
    // console.log(token);
});

// Test pour la connexion échouée
test('POST - Login unsuccessful', async({request}) => {
    // Envoi d'une requête POST avec un email aléatoire et sans mot de passe
    const response = await request.post(`${baseURL}/login`, {
        data : {
            "email": generateFormData().email
        }
    })
    const responseBody = await response.json();
    // console.log('POST - Login unsuccessful',responseBody);
    // Vérification que la requête a échoué (statut 400)
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);
    // Vérification du message d'erreur
    expect(responseBody).toHaveProperty('error', 'Missing password');
});

// Test pour vérifier la réponse différée
test('GET - Delayed response', async({ request }) => {
    // Envoi d'une requête GET avec un délai de 3 secondes
    const response = await request.get(`${baseURL}/users?delay=3`);
    const responseBody = await response.json();
    // Vérification du succès de la requête
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    // Vérification du nombre d'utilisateurs retournés
    expect(responseBody.data).toHaveLength(6);
});