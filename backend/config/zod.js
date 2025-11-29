import {z} from 'zod'


// jessee user schema banayaa thaa sam e register kee liyee 

export const registerSchema = z.object({

    name: z.string().min(3, "Name must be atleast 3 charachter long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be atleast 8 characters long"),

})