import mapPage from '../support/pages/Map'
import createPage from '../support/pages/Create'

describe('Recomendação', () => {

    it('deve recomendar um food truck', () => {

        const user = {
            name: 'Benson',
            instagram: '@benson',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '-23.584548837854058',
            longitude: '-46.674446913517876',
            name: 'Tienda Del Chavo',
            details: 'O melhor lugar para tomar o suco de limão, que parece de groselha e tem sabor de tamarindo.',
            opening_hours: 'das 14h às 20h',
            open_on_weekends: true
        }

        cy.apiCreateUser(user)
        cy.uiLogin(user)

        mapPage.createLink()
        createPage.form(foodtruck)
        createPage.submit()
        createPage.modal.haveText('Food truck cadastrado com sucesso!')
    })

    it('não deve cadastrar foodtruck com nome duplicado', () => {

        const user = {
            name: 'Doppelganger',
            instagram: '@doppelganger',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '-23.583654062428796',
            longitude: '-46.67752861976624',
            name: 'Dona Florinda - Lanches',
            details: 'Compre seu lanche com orégano especial.',
            opening_hours: 'das 20h às 03h',
            open_on_weekends: false
        }

        cy.apiCreateUser(user)
        cy.apiLogin(user)
        cy.apiCreateFoodTruck(foodtruck)

        cy.uiLogin(user)

        mapPage.createLink()
        createPage.form(foodtruck)
        createPage.submit()
        createPage.modal.haveText('Esse food truck já foi cadastrado!')
    })

    it('todos os campos devem ser obrigatórios', () => {

        const user = {
            name: 'Mordecai',
            instagram: '@mordecai',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '-23.584548837854058',
            longitude: '-46.674446913517876',
        }

        cy.apiCreateUser(user)
        cy.uiLogin(user)

        mapPage.createLink()
        cy.setGeolocation(foodtruck.latitude, foodtruck.longitude)
        createPage.submit()

        const message = 'Os campos nome, descrição e horário de funcionamento devem ser informados para recomendar um food truck!'
        createPage.modal.haveText(message)
    })

})