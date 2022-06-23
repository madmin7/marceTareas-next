import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../database";
import { seedData } from "../../database";
import { Entry } from "../../models";



interface Data {
  mensaje: string;

}


export default async function handler (req: NextApiRequest, res:NextApiResponse <Data>) {


  if ( process.env.NODE_ENV === 'production'){
    res.status(400).json({
      mensaje: 'No tiene acceso a este servicio'
    })
  }


  await db.connect();

  await Entry.deleteMany();

  await Entry.insertMany( seedData.entries );  

  await db.disconnect();



  res.status(200).json({
    mensaje: 'Proceso Realizado correctamente'
  })
}
