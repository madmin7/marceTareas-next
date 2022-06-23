import { useContext } from 'react';
import { Drawer, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';


import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

import { UIContext } from '../../context/ui/UIContext';


const menuItems: string[] = [ 'Inbox', 'Starter', 'Send Email', 'Drafts' ] 


export const Sidebar = () => {

    const { sidemenuOpen, closeSideMenu } = useContext( UIContext );

    return (
        <Drawer
        anchor='left'
        open={ sidemenuOpen }
        onClose={ closeSideMenu }
        >
            <Box sx={{ width: 250 }}>
                <Box sx={{ padding: '5px 10px' }}> 
                    <Typography variant='h4'> Menú </Typography>
                </Box>
                <List>

                    {
                        menuItems.map( ( texto, index ) => (
                            <ListItem key={ index } button >

                                <ListItemIcon>
                                    { index % 2 ? <InboxOutlinedIcon/> :  <MailOutlineOutlinedIcon /> }
                                </ListItemIcon>

                                <ListItemText primary= { texto }/>

                            </ListItem>
                        ))
                    }
                    
                </List>

                <Divider />

                <List>

                    {
                        menuItems.map( ( texto, index ) => (
                            <ListItem key={ index } button >

                                <ListItemIcon>
                                    { index % 2 ? <InboxOutlinedIcon/> :  <MailOutlineOutlinedIcon /> }
                                </ListItemIcon>

                                <ListItemText primary= { texto }/>

                            </ListItem>
                        ))
                    }

                </List>

            </Box>
        </Drawer>
    )
}
