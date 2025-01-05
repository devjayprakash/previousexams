export const PORT = process.env.PORT || 8080
export const JWT_SECRET = process.env.JWT_SECRET as string

if (!PORT) {
    throw new Error(
        'Env port does not found. Please check the .env file for PORT variable'
    )
}

if (!JWT_SECRET) {
    throw new Error(
        'Env jwt secret port does not found. Please check the .env file for JWT_SECRET variable'
    )
}
