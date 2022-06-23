import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { PropsWithChildren, FC, DragEvent, useContext } from 'react';
import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui/UIContext';
import { useRouter } from 'next/router';
import { getFormatDistanceToNow } from '../../utils';



interface Props {
    entry: Entry
}



export const EntryCard: FC <PropsWithChildren <Props>> = ({ entry }) => {


    const router = useRouter();

    const { startDragging, endDragging } = useContext( UIContext )
  
    const onDragStart = ( event: DragEvent ) => {
        event.dataTransfer.setData( 'text', entry._id ); 

        startDragging();
    }


    const onDragEnd = () => {
        endDragging();
    }



    const onClickTarjeta = () => {
        router.push(`/entries/${ entry._id }`)
    }


    
    return (
        <Card 
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart= { onDragStart }
            onDragEnd= { onDragEnd }
            onClick={ onClickTarjeta }
        >
        <CardActionArea>
            <CardContent>
                <Typography sx={{
                        whiteSpace: 'pre-line'
                    }}
                >{ entry.description }</Typography>
            </CardContent>
            
            <CardActions sx={{
                display: 'flex',
                justifyContent: 'end',
                paddingRight: 2
            }}>
                <Typography variant='body2'>{ getFormatDistanceToNow( entry.createdAt ) }</Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}
