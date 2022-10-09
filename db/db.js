import mongoose from "mongoose"

const db = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
       })
    
       console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch(error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }


}

export default db;