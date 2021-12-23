function poll({ prop, validate, interval, maxAttempts }) {
  let attempts = 0;
  let command = 'win.' + prop
  console.log(command)

  function executePoll () {
    cy.window().then(async function(win) {
        cy.log('Polling: ' + attempts)
        let result = await eval(command);
        console.log(result)
        attempts++;

        if (validate(result)) {
          return result;
        } else if (maxAttempts && attempts === maxAttempts) {
          throw 'Exceeded max attempts';
        } else {
          cy.wait(interval);
          return executePoll();
        }
    })
  };
  return executePoll();
};

Cypress.Commands.add("js", (prop) => {
    cy.window().then(async function(win) {
        let command = 'win.' + prop
        let result = await eval(command);
        return result;
    })
})

Cypress.Commands.add("jspoll", (prop, validate) => {
    return poll({
        prop: prop,
        validate: validate,
        interval: 1000,
        maxAttempts: 5
    })
})