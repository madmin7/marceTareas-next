import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';

type Data =
 | { message: string }
 | IEntry



export default function handler(req: NextApiRequest, res:NextApiResponse <Data>) {

    // const { id } = req.query

    // if ( !mongoose.isValidObjectId( id ) ){
    //     return res.status(400).json({ message: 'El id no es válido' })
    // }


    switch ( req.method ) {
        
        case 'PUT':
            return updateEntry( req, res );


        case 'GET':
            return getEntry( req, res );


        case 'DELETE':
            return deleteEntry( req, res );
    
        default:
            return res.status(400).json({
                message: 'Endpoint no existe',
            })
    }

}



const getEntry = async (req: NextApiRequest, res:NextApiResponse <Data>) => {
    
    const { id } = req.query
        
        await db.connect();

        const entryById = await Entry.findById( id );

        if ( !entryById ){
            return res.status(401).json({ message: 'No existe esa entrada' })
        }

        return res.status(200).json( entryById );
}




const updateEntry = async (req: NextApiRequest, res:NextApiResponse <Data>) => {

    const { id } = req.query
        
        await db.connect();

        const entryToUpdate = await Entry.findById( id );

        if ( !entryToUpdate ){
            return res.status(401).json({ message: 'No existe esa entrada' })
        }


        const { 
            description = entryToUpdate.description, 
            status = entryToUpdate.status
        } = req.body


        try{

            const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new:true })

            await db.disconnect();

            res.status(200).json( updatedEntry! )
    
        }catch( err: any ){

            console.log( err );

            await db.disconnect();

            res.status(400).json({ message: err.errors.status.message })
        }
        
        // entryToUpdate.description = description,
        // entryToUpdate.status = status,
        // entryToUpdate.save()
}


const deleteEntry = async (req: NextApiRequest, res:NextApiResponse <Data>) => {

    const { id } = req.query
        
        await db.connect();

        const entryToDelete = await Entry.findById( id );

        if ( !entryToDelete ){
            return res.status(401).json({ message: 'No existe esa entrada' })
        }


        try{

            await entryToDelete.delete()

            await db.disconnect();

            res.status(200).json({ message: 'La entrada fue eliminada'})
     
        }catch( err: any ){

            console.log( err );

            await db.disconnect();

            res.status(400).json({ message: err.errors.status.message })
        }
}