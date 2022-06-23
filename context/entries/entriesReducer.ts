import { PlaylistAddOutlined } from '@mui/icons-material';
import { Entry } from '../../interfaces';
import { EntriesState } from './';


   type EntriesActionType = 
   | { type: '[Entry] - AddEntry', payload: Entry }
   | { type: '[Entry] - EntryUpdated', payload: Entry }
   | { type: '[Entry] - Refresh-Data', payload: Entry[] }
   | { type: '[Entry] - EntryDeleted', payload: Entry }



   export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {

        switch ( action.type ) {
            case '[Entry] - AddEntry':
                return {
                   ...state,
                   entries: [ ...state.entries, action.payload ]
                }

            case '[Entry] - EntryUpdated':
                return {
                   ...state,
                   entries: state.entries.map( entry => {
                    
                    if ( entry._id === action.payload._id ){

                        entry.status = action.payload.status;
                        entry.description = action.payload.description;
                    }

                    return entry
                   })
                }


            case '[Entry] - EntryDeleted':
                return {
                    ...state,
                    entries: state.entries.map( entry =>{
                        if( entry._id !== action.payload._id ){
                            return entry
                        }
                    })
                }
            
            case '[Entry] - Refresh-Data':
                return {
                    ...state,
                    entries: [ ...action.payload ]
                }

            default:
                return state;
       }
   }