import { getGreeting } from '../support/app.po';

describe('angular-app', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to angular-app!');
  });
});
