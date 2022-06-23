import { PropsWithChildren, FC, useContext, useMemo, DragEvent } from 'react';
import { List, Paper } from "@mui/material"

import { EntryStatus } from "../../interfaces"
import { EntryCard } from "./EntryCard"

import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';

import styles from './EntryList.module.css'

interface Props {
    status: EntryStatus;
}



export const EntryList: FC <PropsWithChildren < Props>> = ({ status }) => {

    const { isDragging, endDragging } = useContext( UIContext )

    const { entries, updateEntry } = useContext( EntriesContext );

    const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [entries]);
    


    const allowDrop = ( event: DragEvent <HTMLDivElement> ) => {
        event.preventDefault();
    }


    const onDropEntry = ( event: DragEvent <HTMLDivElement> ) => {
        
        const id = event.dataTransfer.getData('text');

        const entry = entries.find( entry => entry._id === id )!;

        entry.status = status;

        updateEntry( entry );

        endDragging();

    }

  return (
    <div 
        onDrop={ onDropEntry }
        onDragOver= { allowDrop }
        className= { isDragging ? styles.dragging : ''}
    >
        <Paper sx={{
            height: 'calc(100vh - 150px)',
            backgroundColor: 'transparent',
            overflow: 'scroll',
            padding: '2px- 5px'
        }}>
            
            <List sx={{ 
                opacity: isDragging ? 0.2 : 1, 
                padding: '10px',
                transition: 'all .3s' 
            }}>

                {
                    entriesByStatus.map( entry => (
                        <EntryCard key={ entry._id } entry={ entry }/>
                    ))

                }
            </List>
        </Paper>
    </div>
  )
}
