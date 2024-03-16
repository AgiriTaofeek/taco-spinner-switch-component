export default class Switch {
  /**
   * Create new switch instance
   * @param {configureOption} options
   * @returns {Switch} - Returns the current Switch instance
   */
  constructor(options) {
    //Configure component
    // this.config = Object.assign(
    //   {
    //     class: "active",
    //   },
    //   options
    // ); //The Object.assign() combines multiple objects properties and overwrites the properties that appear more than one. i.e properties of the target object(1st parameter) are overwritten by properties of the source object(2nd parameter)

    //NOTE - Another approach to configure our component, instead of specifying options object as a parameter we can just use the data attribute who means we have to always have a data attribute in our HTML
    this.config = Object.assign(
      {
        attr: "data-switch",
        //NOTE - Lifecycle events
        // onSwitch: () => {}, // by default, it does nothing as it just an empty anonymous arrow function but whenever a click event is made, it is also called as specified in the switch method of the class. e.g when we toggle a button on and off, the onSwitch function is fired twice and if we continue to click it, it continues to get fired
        onSwitch: (btn, isSwitched) => {}, //We can leave this as an empty function because it would be overwritten
      },
      options
    );

    //Initialize component
    this.init();

    //Return an instance of the class
    return this;
  }

  /**
   * Start listening to event
   */
  init() {
    //Global event listener
    document.addEventListener("click", this.switch.bind(this)); //We had to explicitly bind the 'this' keyword of the switch function to the instance object of this class because by default, it's this keyword would be point to the document element

    //NOTE - The second approach to change the this bind
    // document.addEventListener("click", (e) => this.switch(e)); //We used the anonymous arrow function to return the switch function so that the 'this' keyword of the switch would point to the object instance of this class

    //Global keyboard event
    document.addEventListener("keydown", this.key.bind(this));
  }

  /**
   * Flip the switch
   * @param {MouseEvent} e - click event
   * @return {void}
   */
  switch(e) {
    //Not a spin button
    if (!e.target.matches(`[${this.config.attr}], [${this.config.attr}] *`))
      return;

    //Prevent default click event
    e.preventDefault();

    //Get the button
    const btn = e.target.closest(`[${this.config.attr}]`);

    //Attribute value
    const attrValue = btn.getAttribute(this.config.attr); // The getAttribute method would return the value of the data attribute in an element

    //Toggle the button
    btn.classList.toggle(attrValue);

    //NOTE - Fire the onSwitch lifecycle event on every click event
    this.config.onSwitch(btn, btn.classList.contains(attrValue)); // Here we passed the trigger element as 1st parameter and isSwitched i.e the toggle state of the trigger element as the 2nd parameter hence, we can access them outside of this class
  }

  /**
   *
   * @param {KeyboardEvent} e - keydown event
   * @return {void}
   */
  key(e) {
    //Return and do nothing when the focused element is not the spin-btn
    if (!e.target.matches(`[${this.config.attr}]`)) return;

    if (e.key === "t") {
      //Prevent default keydown
      e.preventDefault();

      //Get the button
      const btn = e.target;

      //Click the button
      btn.click(); //This click method triggers the global click event handler
    }
  }
}

/**
 * configureOption
 * @typedef {Object} configureOption
 * @property {string} attr - Trigger element data attribute
 * @property {onSwitch} onSwitch - callback function with access to the trigger element and the toggled state of the trigger element data.
 */

/**
 * onSwitch callback function
 * @callback onSwitch
 * @param {HTMLElement} btn - Trigger element
 * @param {boolean} isSwitched - Toggled state of trigger element
 */
