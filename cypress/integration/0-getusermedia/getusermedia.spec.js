
describe('Basic getUserMedia demo', () => {
    beforeEach(() => {
      cy.visit('/samples/src/content/getusermedia/gum/')
    })
  
    it('Video tracks are started and can be stopped', () => {
      // check demo is loaded:
      cy.get('#gum-local')
      // output device info for debugging:
      cy.js('navigator.mediaDevices.enumerateDevices()').then(function(devices) {
        console.log(devices);
      })
      // Display the video stream from fake webcam:
      cy.get('#showVideo').click()
      // wait for stream var to be created:
      cy.jspoll('stream', res => typeof(res) != "undefined").then(function(stream) {
        expect(stream.active).to.equal(true)
      })
      cy.js('stream.getTracks()').then(function(tracks) {
        tracks.forEach(function(track) {
            expect(track.label).to.equal('fake_device_0')
            // check track state:
            expect(track.readyState).to.equal('live')
            // stop track:
            track.stop();
            // check track state:
            expect(track.readyState).to.equal('ended')
        })
      })
    })
})