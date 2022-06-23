import { ChangeEvent, useMemo, useState, PropsWithChildren, FC, useContext, useEffect } from 'react';

import { Layout } from '../../components/layouts/Layout';
import { Grid, capitalize, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';


import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Entry, EntryStatus } from '../../interfaces';
import { GetServerSideProps } from 'next';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { getFormatDistanceToNow } from '../../utils';
import { useRouter } from 'next/router';



const validStatus:EntryStatus[] =['pending', 'in-progress', 'finished'];


interface Props {
    entry: Entry
}



export const EntryPage:FC <PropsWithChildren <Props> > = ({ entry }) => {

    const router = useRouter();

    const { updateEntry, deleteEntry } = useContext( EntriesContext );


    const [inputValue, setInputValue] = useState( entry.description );
    const [status, setStatus] = useState<EntryStatus>( entry.status);
    const [touched, setTouched] = useState(false);


    const isNotValid = useMemo( () => inputValue.length <= 0 && touched,[ inputValue, touched] );


    const onTextFieldChanged = ( event: ChangeEvent <HTMLInputElement> ) => {
        setInputValue( event.target.value);
    }

    const onStatusChanged = ( event: ChangeEvent <HTMLInputElement> ) => {
        setStatus( event.target.value as EntryStatus );
    }


    const onSave= () => {

        if( inputValue.trim().length === 0 ) return;

        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }

        updateEntry( updatedEntry, true );


        router.push('/');
    }


    const onDeleteEntry = ( ) =>{
        deleteEntry( entry, true );
        router.push('/');
    }


  return (
    <Layout title='Editar Entry'>
        <Grid
            container
            justifyContent='center'
            sx= {{ marginTop: 2 }}
        >
            <Grid item xs={ 12 } sm={ 8 } md={ 6 } >
                <Card>
                    <CardHeader
                        title={`Entrada:`}
                        subheader={ ` Creada ${getFormatDistanceToNow( entry.createdAt )}` }
                    />

                    <CardContent>

                        <TextField 
                            sx={{ marginTop: 2, marginBottom: 1}}
                            fullWidth
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label='Nueva entrada'
                            value={ inputValue }
                            onChange= { onTextFieldChanged }
                            helperText={ isNotValid && 'Ingrese un valor' }
                            error={ isNotValid && touched }
                            onBlur= { () => setTouched( true ) }
                        />

                        <FormControl>
                            <FormLabel>Estado:</FormLabel>
                            <RadioGroup
                                row= { true }
                                value= { status }
                                onChange= { onStatusChanged } 
                            >
                            {
                                validStatus.map( status => (
                                    <FormControlLabel 
                                        key={ status }
                                        value= { status }
                                        control={ <Radio /> }
                                        label={ capitalize(status) }
                                    />
                                    ))
                            }
                            </RadioGroup>
                        </FormControl>

                    </CardContent>

                    <CardActions>
                        <Button
                            startIcon={ <SaveOutlinedIcon/>}
                            variant='contained'
                            fullWidth
                            onClick={ onSave }
                            disabled= { inputValue.length <= 0 }
                        >
                            Save
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>

        <IconButton
            sx={{ position: 'fixed', bottom: 30, right: 30, backgroundColor: 'error.dark' }}
            onClick={ onDeleteEntry }
        >
            <DeleteIcon />
        </IconButton>

    </Layout>
  )
};


export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id:string }


    const entry = await dbEntries.getEntryById( id );


    if ( !entry ){
        return {
            redirect:{
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props:{
            entry,
        }
    }
}







export default EntryPage;