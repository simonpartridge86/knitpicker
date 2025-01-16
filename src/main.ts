const greeting: string = "Hello, Bun.js and Test!";
console.log(greeting);

const heading = document.querySelector("h1");
if (heading) {
  heading.textContent = greeting;
}
