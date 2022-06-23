import { ChangeEvent, useContext, useState } from "react";
import { Button, TextField } from "@mui/material"

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

import { Box } from "@mui/system";
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';


export const NewEntry = () => {



    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const { addNewEntry } = useContext(EntriesContext);

    const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);


    const onTextFieldChanged = ( event: ChangeEvent <HTMLInputElement>) => {

        setInputValue( event.target.value);
    }


    const onSave = () => {

        if ( inputValue.length === 0) return;
        
        addNewEntry( inputValue );
        setIsAddingEntry( false );
        setTouched( false );
        setInputValue('');
    }



    return (
    <Box sx={{
        marginBottom: 2,
        padding: '2px'
    }}>
        {
           ( isAddingEntry ) 
           ? (
            <>
                <TextField 
                    fullWidth
                    sx={{ marginTop: 2, marginBottom: 2 }}
                    placeholder='Nueva entrada...'
                    autoFocus
                    multiline
                    label='Nueva Entrada'
                    helperText= { inputValue.length <= 0 && touched && 'Ingrese una tarea'}
                    error={ inputValue.length <= 0 && touched }
                    value={ inputValue }
                    onChange={ onTextFieldChanged }
                    onBlur={ () => setTouched( true ) }
                />

                <Box display='flex' justifyContent='space-between'>
                    <Button
                        variant="text"
                        endIcon={ <CancelOutlinedIcon /> }
                        onClick={ () => setIsAddingEntry( false ) }
                    >
                        Cancelar
                    </Button>

                    <Button
                    variant="outlined"
                    color="secondary"
                    endIcon={ <SaveOutlinedIcon /> }
                    onClick={ onSave }
                    >
                        Guardar
                    </Button>
                </Box>
            </>
           ) 
           : (
            <>
                <Button
                    startIcon={ <AddCircleOutlinedIcon /> }
                    fullWidth
                    variant="outlined"
                    onClick={ () => setIsAddingEntry( true )}
                >
                    Agregar Tarea
                </Button>
            </>
           )
        }





    
    </Box>
  )
}
