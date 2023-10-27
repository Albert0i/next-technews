### Tips and Tricks 

### Prologue

### 1. [Next.js CLI](https://nextjs.org/docs/app/api-reference/next-cli)
`next dev` starts the application in development mode. By default, it will start at `http://localhost:3000`, which can be changed with `-p`: 
```
npx next dev -p 3001
```
`-p <port>` also works for `next start`. You can enable more verbose build output with the `--debug` flag in `next build`. 
```
next build --debug
```
With this flag enabled additional build output like rewrites, redirects, and headers will be shown.


### 2. Escalating string literals
```
<body className={inter.className}>
```
to
```
<body className={`${inter.className} `}>
```
And 
```
<button type='submit' className='primary-btn'>Create Post</button>
```
to
```
<button type='submit' className={`primary-btn `}>Create Post</button>
```
In this way, subsequent actions of injecting styles can be fulfilled. 


### 3. [useRouter](https://nextjs.org/docs/app/api-reference/functions/use-router) vs [redirect](https://nextjs.org/docs/app/api-reference/functions/redirect) 
> The `useRouter` hook allows you to programmatically change routes inside Client Components.
> **Recommendation**: Use the `<Link> component` for navigation unless you have a specific requirement for using `useRouter`.

> The `redirect` function allows you to `redirect` the user to another URL. redirect can be used in Server Components, Client Components, [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations).


### 4. [Check if a Property Exists in a JavaScript Object](https://www.freecodecamp.org/news/how-to-check-if-a-property-exists-in-a-javascript-object/)
```
const myObject = {
    name: 'john',
    age: 26
}

// Method 1: 
if (myObject.name) {
    console.log(myObject.name)
} else {
    console.log('no name')
}

// Method 2: 
if ('name' in myObject) {
    console.log(myObject.name)
} else {
    console.log('no name')
}

// Method 3: 
if (myObject.hasOwnProperty('name')) {
    console.log(myObject.name)
} else {
    console.log('no name')
}
```
> The `hasOwnProperty()` method will check if an object contains a direct property and will return true or false if it exists or not. The `hasOwnProperty()` method will only return true for direct properties and not inherited properties from the prototype chain.

> Unlike the `hasOwnProperty()` method, the `in` operator will return true for both direct and inherited properties that exist in the object or its prototype chain.

> Lastly, we can see if a property exists in the object by checking if `property !== undefined`.


### 5. [min-h-screen](https://tailwindcss.com/docs/min-height) and [flex-auto](https://tailwindcss.com/docs/flex)
```
. . . 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='lg:max-w-[900px] lg:px-16 mx-auto py-8 shadow-xl min-h-screen flex flex-col px-8'>
          <div className='flex-auto'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
```
The children is set to full screen height. 


### 6. `fetch` from clinet/server component 
To `fetch` backend api from client component, you can specify relative path, ie
```
const res = await fetch('/api/categories')
```
but 
```
const res = await fetch('http://localhost:3000/api/categories')
```
in server component.


### 7. environment var in front end
Whenever we are using environment variables in a client component
The name of the environment variable should start with `NEXT_PUBLIC`


### 8. react hot toast 


### 9. hero icons 


### 12. open ssl random token 
```
openssl rand -base64 32 
```


### 13. importing a json file


### Reference
1. [Build & Deploy a Full-Stack Website with Next.js 13 | Typescript, Prisma, Cloudinary, Tailwind](https://youtu.be/g7rE5exVQRk)
2. [The Brothers Karamazov](https://www.gutenberg.org/cache/epub/28054/pg28054-images.html#chap93)

### Epilogue 


### EOF (2023/10/27)
