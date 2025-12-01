import jwt from 'jsonwebtoken'
import { redisClient } from '../index.js'

export const generateToken = async(id , res)=>{
    const accessToken = jwt.sign({id},process.env.JWT_SECRET , {
        expiresIn: "1m"
    })


    const refreshToken = jwt.sign({id}, process.env.REFRESH_SECRET , {
        expiresIn: "7d",
    })

    const refreshTokenKey = `refresh_token:${id}`

    await redisClient.setEx(refreshTokenKey, 7 * 24 * 60 * 60, refreshToken);

    res.cookie("accessToken" , accessToken ,{
        httpOnly: true ,   //backend read karr payegaa true mein false karkee document.cookie karogee milegaa cookie
        // secure: true,        //true hhtps mein kaam karega
        sameSite: "strict",  //csrf attack nahii hooga
        maxAge: 1 * 60 * 1000,
    })

// refresh token kabhii bhee frontend mein chorii nahii hoonaa chahiyee 
    res.cookie("refreshToken", refreshToken , {

        maxAge: 7 * 24 *60 * 60 * 1000 ,
        httpOnly: true , 
        sameSite: "none",

    })

    return { accessToken , refreshToken}


}



export const verifyRefreshToken = async(refreshToken) =>{
    try {
        const decode = jwt.verify(refreshToken , process.env.REFRESH_SECRET)
        const storedToken= await redisClient.get(`refresh_token:${decode.id}`)

        if (storedToken  === refreshToken){
            return decode

        }
        return null;
    } catch (error) {
        return null 
    }
}


export const generateAccessToken = (id , res) =>{
    const accessToken = jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: "1m"
    })

       res.cookie("accessToken", accessToken, {
         httpOnly: true, //backend read karr payegaa true mein false karkee document.cookie karogee milegaa cookie
         // secure: true,        //true hhtps mein kaam karega
         sameSite: "strict", //csrf attack nahii hooga
         maxAge: 1 * 60 * 1000,
       });


}