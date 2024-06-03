import { z } from 'zod';

// Zod is a TypeScript-first schema declaration and validation library
// It is used to validate data in TypeScript projects

// Define a schema for a user object
// const UserSchema = z.object({
  // zod support many types like string, number, date, boolean, etc
  // unless we mark these fields as optional, they are required
  // username: z.string(), 
  // firstname: z.string().min(2), // we can also add constraints like min length. These are chainable methods
  // age: z.number().gt(0), // we can also add constraints like greater than
  // birthdate: z.date().nullable(), // we can also say that a field can be null
  // .nullish() is also available which allows null OR undefined
  // isProgrammer: z.boolean().optional(), // optional fields are marked with optional()
  // isVerified: z.boolean().default(false), // we can also set default values. Functions can be used inside default() - (e.g. new Date(), Math.random(), etc)
  // hobby: z.enum(['reading', 'coding', 'gaming']), // we can also use enums to restrict the values of a field. This can only be one of the values in the array
  
  // there are also types for unknown, undefined, null, etc
  // test: z.unknown(),
// });

// in normal typescript projects, we would need types to define the user object
//type User = {
//  username: string;
//}; but with zod, we don't need this

// infer the type of the user object
// any time UserSchema is changed, the User type will be updated
// type User = z.infer<typeof UserSchema>

// const user: User = { 
//   username: 'JDoe', 
//   firstname: 'John', age: 30, 
//   birthdate: new Date('1990-01-01'), 
//   isProgrammer: true,
//   hobby: 'coding'
// };

// we can use the parse method to validate the user object
// if the user object is invalid, an error will be thrown
// console.log(UserSchema.parse(user));

// we can also use the safeParse method to validate the user object
// this gives true/false if the user object is valid or not
// which is useful for validation in forms
// console.log(UserSchema.safeParse(user));

/*********************************  Version 2  ******************************/ 

// we can also use native enums in zod
enum Hobby {
  Reading = 'reading',
  Coding = 'coding',
  Gaming = 'gaming'
}

// we could also use an array to hold the enum values
const hobbies = ['reading', 'coding', 'gaming'] as const; // as const is used to make the array readonly

const UserSchema = z.object({
  username: z.string(), 
  age: z.number().gt(0),
  birthdate: z.date(),
  isProgrammer: z.boolean(),
  hobby: z.nativeEnum(Hobby), // this requires we use .nativeEnum() instead of .enum()
  //hobby: z.enum(hobbies) // this is how we would use an array to hold the enum values.
});

type User = z.infer<typeof UserSchema>

const user: User = { 
  username: 'JDoe', 
  age: 30,
  birthdate: new Date('1990-01-01'), 
  isProgrammer: true,
  hobby: Hobby.Coding
};

// zod object methods
const UserSchemaTwo = z.object({
  username: z.string(), 
  age: z.number().gt(0),
  birthdate: z.date(),
  isProgrammer: z.boolean(),
  hobby: z.enum(hobbies) 
}).partial(); // we can use .partial() to make fields optional
// z object also support different methods like
//.pick({ username: true }) -- UserSchemaTwo will only have the username field
//.omit({ age: true }) -- UserSchemaTwo will not have the age field
//.deepPartial() - this is used to make nested objects partial
//.extend({name: string}) - this is used to extend the object with additional fields
//.merge(z.object({ hasPet: z.boolean() })) - this is used to merge the object with another object

type UserTwo = z.infer<typeof UserSchemaTwo>

//console.log(UserSchemaTwo.shape);
// logs {username: _ZodString, age: _ZodNumber, birthdate: _ZodDate, isProgrammer: ZodBoolean, hobby: ZodNativeEnum} - if we didnt have .partial()

const userTwo: UserTwo = { 
  username: 'JDoe', 
};

//console.log(UserSchemaTwo.parse(userTwo));
// logs { username: 'JDoe' }

/*********************************  Version 3  ******************************/ 

const UserSchemaThree = z.object({
  username: z.string(), 
  friends: z.array(z.string()).nonempty(), // we can also use arrays. Here we are saying that friends is an array of strings, and it cannot be empty
  //.min/.max/.length can also be used to add constraints to the array
})
//.passthrough(); // we can use .passthrough() to allow additional fields
.strict() // is also available which will throw an error if there are additional fields

type UserThree = z.infer<typeof UserSchemaThree>

const userThree: UserThree = {
  username: 'JDoe', 
  friends: ['Jane', 'Jack'],
  //age: 30,
};

console.log(UserSchemaThree.parse(userThree)); // logs { username: 'JDoe', age: 30 }
// without .passthrough(), the age field would be removed