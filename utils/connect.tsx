//IMPORT MONGOOSE
import mongoose, { Model } from "mongoose"
import CreatureModel from "./creatureschema"

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { DATABASE_URL } = process.env

// connection function
export const connect = async () => {
  const connection = await mongoose
    .connect(`${DATABASE_URL as string}`)
    .catch(err => console.log(err))
  console.log("Mongoose Connection Established")
  const creatureCollection = CreatureModel;
  creatureCollection.createCollection()
  return { connection, creatureCollection }
}