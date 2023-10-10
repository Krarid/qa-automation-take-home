/// <reference types="Cypress" />

describe('QA Automation Take Home', () => {

    it( 'test to make sure that the app renders without error', () => {
        cy.visit(Cypress.env('url'));
        cy.get('h2').should('have.text', 'QA Automation Cypress Test');
    } )

    it( 'test to ensure that the `notes` state loads with no entries (as an empty array)', () => {
        cy.visit(Cypress.env('url'));

        cy.get('.note-container li').should('not.exist');
    } )

    it( 'test to check that when an input value is added and the submit button is pressed that the note gets added to the `notes` state and that the note is rendered in the `ul`', () => {

        cy.visit(Cypress.env('url'));

        cy.fixture('data').then( (data) => {
            cy.get('#text-input').type(data.name);
        } )
        
        cy.get('button[type="submit"]').click();

        cy.fixture('data').then( (data) => {
            cy.get('.note-container li').each(($element, index, $list) => {
                if( $element.text().includes(name) )
                    cy.wrap($element).should('have.text', data.name);
            }) 
        })
    })

    it('test to make sure that when the delete button is pressed that note is deleted from the `notes` list and that it is no longer present in the `ul`', () => {
        cy.visit(Cypress.env('url'));

        cy.fixture('data').then( (data) => {
            cy.get('#text-input').type(data.name);
        } )
        cy.get('button[type="submit"]').click();

        cy.fixture('data').then( (data) => {
            cy.get('.note-container li').each(($element, index, $list) => {
                if( $element.text().includes(name) )
                    cy.wrap($element).should('have.text', data.name);
            }) 
        })

        cy.get('.note-container button').each(($element, index, $list) => {
            cy.wrap($element).click();
        })

        cy.get('.note-container li').should('not.exist');
    })
})