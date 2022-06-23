import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

//! No solo podemos cambiar los colores de theme sino que tambien podemos cambiar,
//! el comportamiento y el aspecto visual de todo los componentes de materialUI

export const lightTheme = createTheme({
    palette:{
      mode: 'light',
      background:{
        default: grey[300]
      },
      primary:{
        main: '#4a148c'
      },
      secondary:{
        main: '#19857b'
      },
      error: {
        main: red.A400
      },
    },


    components:{

      MuiAppBar:{
        defaultProps:{
          elevation: 0
        },
        styleOverrides:{}
      }
    }
  });
  
  