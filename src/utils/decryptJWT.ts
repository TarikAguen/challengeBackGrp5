import jwt from "jsonwebtoken";


export const benchJWT = async (token: string) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT_SECRET is not defined in the environment variables.");
    try {
        const decodedJWT = jwt.verify(token, jwtSecret);
        console.log("------decodedJWT");
        console.log(decodedJWT);
        console.log("------------------------------------------------------");
        console.log("------token");
        console.log(token);
    } catch (err) {
        console.error(err);
    }
};
