
describe('Stream from a canvas element to a video element', () => {
    beforeEach(() => {
      cy.visit('/samples/src/content/capture/canvas-video/')
    })
  
    it('Video element reflects canvas element', () => {
      // force video element to adjust its size:
      cy.reload();
      // check demo is loaded:
      cy.get('video').invoke('outerHeight').should('be.gt', 300, { timeout: 10000 });
      // trigger mouse events over canvas:
      cy.get('canvas')
        .trigger('mousedown', 'topLeft')
        .trigger('mousemove', 'bottomRight')
        .trigger('mouseup')
      // verify the video screenshot matches saved snapshot:
      cy.get("video").toMatchImageSnapshot();
    })
})
