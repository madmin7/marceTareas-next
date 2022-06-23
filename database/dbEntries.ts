import { isValidObjectId } from 'mongoose';
import { db } from '.';
import { Entry, IEntry } from '../models';




export const getEntryById = async ( id:string ): Promise <IEntry | null> => {

    if( !isValidObjectId( id )) return null;

    await db.connect();

    const entry = await Entry.findById(id).lean();

    // lean(), es utilizado cuando sabemos que vamos a usar con los datos minimos

    await db.disconnect();

    return JSON.parse( JSON.stringify( entry ));

}