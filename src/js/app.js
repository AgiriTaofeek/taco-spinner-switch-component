import Switch from "./switch";

//NOTE - Switch button
const switchBtn = new Switch();

//NOTE - Jiggle button
const jiggleBtn = new Switch({
  attr: "data-jiggle",
  onSwitch: (btn, isSwitched) => {
    console.log("switching", btn, isSwitched);
    //An example of what we can do with these parameters
    btn.querySelector(".spinner").textContent = isSwitched ? "🌯😁" : "🌯";
  },
});

// const btns = document.querySelectorAll("button");

// btns.forEach((btn) => {
//   //NOTE - Mouse click events
//   btn.addEventListener("click", (e) => {
//     console.log(e);
//     //NOTE - Prevent the default of button in a form causing a reload of the webpage by attempting to submit the form with POST request
//     e.preventDefault();
//     btn.classList.toggle("spin");
//   });

//   //NOTE - Keyboard events
//   btn.addEventListener("keydown", (e) => {
//     //FIXME - Never prevent default for keyboard events
//     // e.preventDefault(); //This would not make the keyboard work at all
//     //NOTE - To check things about any key on a keyboard visit the website keycode.info

//     if (e.key === "t") {
//       e.preventDefault();
//       console.dir(btn);
//       btn.click(); //This click method is inherited from the HTMLElement object
//     }
//   });
// });

//SECTION - Adding async content. An important consequence of this is that the button that would be added to the async-content div would not have any event listener since the synchronous code has already been executed before the async code. To solve this, event delegation is the most logical approach and it capitalize on the fact that event bubbles up the tree i.e event travels from the element that triggers it up to the html element and if any of the ancestor has an event listener to that same event, it fires
setTimeout(() => {
  document.querySelector("#async-btn").innerHTML = `
    <button class="warning spin-btn" data-switch='spin'>
        <span class="spinner">🍕</span>
    </button>
`;
}, 3000);

//!SECTION - Global listener to capitalize on event delegation
// document.addEventListener("click", (e) => {
//   //NOTE - e.target returns a DOM element and the matches method is inherited from the Element object which is the prototype of the HTMLElement object
//   if (!e.target.matches(".spin-btn, .spin-btn *")) return; //Do nothing when we click on the other elements that is not spin button or the spin button children element

//   //Prevent the default click event
//   e.preventDefault();

//   //NOTE - The closest method traverses the DOM looking upwards for the closest element we want it to find and if it does, it return that element. It is also inherited from the Element object
//   const btn = e.target.closest(".spin-btn");

//   //Switch that button
//   btn.classList.toggle("spin");
// });

//!SECTION - Global keyboard event listener
// document.addEventListener("keydown", (e) => {
//   //Return and do nothing when the focused element is not the spin-btn
//   if (!e.target.matches(".spin-btn")) return;

//   if (e.key === "t") {
//     //Prevent default keydown
//     e.preventDefault();

//     //Get the button
//     const btn = e.target;

//     //Click the button
//     btn.click();
//   }
// });
