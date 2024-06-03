import { z } from 'zod';

// Define a schema for a user object
const UserSchema = z.object({
  // zod support many types like string, number, date, boolean, etc
  username: z.string(),
  age: z.number(),
  birthdate: z.date(),
  isProgrammer: z.boolean(),
});

// in normal typescript projects, we would need types to define the user object
//type User = {
//  username: string;
//}; but with zod, we don't need this

// infer the type of the user object
// any time UserSchema is changed, the User type will be updated
type User = z.infer<typeof UserSchema>

const user: User = { username: 1};

// we can use the parse method to validate the user object
// if the user object is invalid, an error will be thrown
console.log(UserSchema.parse(user));

// we can also use the safeParse method to validate the user object
// this gives true/false if the user object is valid or not
// which is useful for validation in forms
console.log(UserSchema.safeParse(user));
