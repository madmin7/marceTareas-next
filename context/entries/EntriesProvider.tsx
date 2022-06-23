import { useSnackbar } from 'notistack';


import { FC, PropsWithChildren, useEffect, useReducer } from 'react';

import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer} from './';
import { entriesApi } from '../../apis';


export interface EntriesState{
   entries: Entry[];
}



const Entries_INITIAL_STATE: EntriesState = {
   entries: [],
}


export const EntriesProvider:FC < PropsWithChildren >= ({ children }) => {


    const { enqueueSnackbar } = useSnackbar();

    const [state, dispatch] = useReducer( entriesReducer, Entries_INITIAL_STATE )



    //!
    const addNewEntry = async( description: string ) => {

        const { data } = await entriesApi.post<Entry>('/entries', { description });


        dispatch({ type: '[Entry] - AddEntry', payload: data })

    }

    //!
    const updateEntry = async( { _id, description, status }: Entry, showSnackbar= false ) => {
        
        try{

            const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { description: description, status: status });

            dispatch({ type: '[Entry] - EntryUpdated', payload: data });

            //todo: mostrar snackbar

            if ( showSnackbar ){
                enqueueSnackbar( 'Tarea editada exitosamente', {
                    variant:'success',
                    autoHideDuration: 1500,
                    anchorOrigin:{
                        vertical: 'top',
                        horizontal: 'right'
                    }
                });
            }

        }
        catch ( err ){
            console.log({ err })
        }

    }




    //!
    const deleteEntry = async ( { _id }: Entry, showSnackbar= false ) => {

        try{

            const { data } = await entriesApi.delete<Entry>(`/entries/${ _id }`)

            dispatch({ type: '[Entry] - EntryDeleted', payload: data })


            if ( showSnackbar ){
                enqueueSnackbar( 'Entrada Borrada', {
                    variant:'error',
                    autoHideDuration: 1500,
                    anchorOrigin:{
                        vertical: 'top',
                        horizontal: 'right'
                    }
                });
            }


            await refreshEntries();

        }catch( err ){
            console.log( err );
        }


    }



    const refreshEntries = async () =>{

        const { data } = await entriesApi.get <Entry[]>('/entries');

        dispatch({ type: '[Entry] - Refresh-Data', payload: data })
    }


    useEffect(() => {
        refreshEntries()
    }, [])
    



    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updateEntry,
            deleteEntry 
        }}>
             { children }
        </EntriesContext.Provider>
    )
}