# **JavaScript Frameworks**
This is a project buildt with Next.js, React, TypeScript using Tailwind CSS for styling. The project is a online shop where you can browse and search for products, view product details, add and remove items from cart, checkout-flow and a contactform. 

## Getting Started

First, install dependecies - then run the development server:
```bash
npm run install
```

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## **Contact**
Thea Nordhøy Kristensen

thea.n.k@hotmail.com

Emilie Sofie Fosmo

emilie.fosmo@hotmail.com

--- 

## **AI_LOG**

- **Tool used:** ChatGPT
- **Date:** 15 september 2026
- **Purpose:** Error when running ‘npm run dev’ on Emilies Windows computer
- **Outcome:** She had to run npm run dev – –webpack instead of turbopack that Thea’s mac used
---
- **Tool used:** ChatGPT
- **Date:** 15 september 2026
- **Purpose:** Emilie got and error invalid type: boolean true expected enum CodeFramColorMode and something wrong with the code-line : params: { id: string };  when trying to fetch single product. Asked what this meant. 
- **Outcome:** The error happened because Next.js 16 makes params asynchronous, so we need to use Promise<{ id: string }> and await params to get the ID correctly. I then talked to the teacher, because I could not find anything about this in the modules and he agreed to the same conclusion
---
-  **Tool used:** ChatGPT
- *Date:* 17 september 2026
- **Purpose:** How can I apply different Tailwind CSS classes to a p-element depending on whether the product has a discount?
- **Outcome:** Tailwind classes can be applied conditionally in react by using conditional expression inside className. In this case i needed to check if a product is discounted and if discounted the original price gets a different styling such as line-through and the discounted price gets a red color. 
---
-  **Tool used:** ChatGPT
- **Date:** 21 september 2026
- **Purpose:** Asked what this error-message meant. “Attempted to call useCart() from the server but useCart is on the client. “
- **Outcome:** Learned that the cart-count could not be used directly in layout.tsx because this is a Server Component. Solution was that we need to create header as a separate client component and implement cart-count in the headercomponent. 
---
-  **Tool used:** ChatGPT
- **Date:** 23 september 2026
- **Purpose:** Console error: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn’t have a dependency array, or one of the dependencies changes on every render.
- **Outcome:** ChatGTP explained that we React got an endless loop when. That we rendered, clearedCart, setCart and updated CartProvider and then it all began again. So we had to remove ‘clearCart’ from the square brackets.
---
-  **Tool used:** ChatGPT
- **Date:** 24 september 2026
- **Purpose:**  Error debug if/else (ternery operator) for the condition product.reviews. 
- **Outcome:** Found out that we only checked condition “do reviews exist” not if the array was empty. 
---
