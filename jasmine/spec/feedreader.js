/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });
    /* Done: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    function testUrl(allFeeds, index) {
      it('has URL defined', function() {
        expect(allFeeds.url).toBeDefined();
        expect(allFeeds).not.toEqual(jasmine.objectContaining({
          url: ''
        }));
      });
    };
    /*in order to avoid any weird behaviour the loop is outside the function*/
    for (var i = 0; i < allFeeds.length; i++) {
      testUrl(allFeeds[i]);
    };
    /* Done: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    function testName(allFeeds, index) {
      it('has name defined', function() {
        expect(allFeeds.name).toBeDefined();
        expect(allFeeds).not.toEqual(jasmine.objectContaining({
          name: ''
        }));
      });
    };
    /*in order to avoid some weird behaviour the loop is outside the function*/
    for (var i = 0; i < allFeeds.length; i++) {
      testName(allFeeds[i]);
    };
  });
  /* Done: Write a new test suite named "The menu" */
  describe('The menu', function() {
    /* Done: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('is hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
    /* Done: Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */

    it('changes visibility when the menu icon is clicked', function() {
      /*mimicking a click event to see if the hidden class is omitted*/
      $('.menu-icon-link').click();
      expect($('body').hasClass('')).toBe(true);
      /*then checking if on a second click the class will be added back*/
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(true);

    });
  });
  /* Done: Write a new test suite named "Initial Entries" */
  describe('Initial Entries', function() {
    /* Done: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    beforeEach(function(done) {
      /*after loading first entry*/
      loadFeed(0, done);
    });
    /*checks if there is at least one entry*/
    it('have at least one entry', function() {
      expect($('.feed .entry')).toBeDefined();
    });
  });
  /* Done: Write a new test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {
    /* Done: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    /*set two variables that will be used for comparision*/
    var firstEntry, secondEntry;

    beforeEach(function(done) {
      /*after loading, the first and second entries will be asigned to variables so we can compare*/
      loadFeed(0, function() {
        firstEntry = $('.feed').find(allFeeds.url);
        done();
      });
      loadFeed(1, function() {
        secondEntry = $('.feed').find(allFeeds.url);
        done();
      });

    });
    /*comparing the two feeds to make sure the content changes*/
    it('is different from the previous one', function() {
      expect(firstEntry).not.toBe(secondEntry);
    });

  });
}());
