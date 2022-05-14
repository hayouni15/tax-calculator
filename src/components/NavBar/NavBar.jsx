import { AppBar, Grid } from '@material-ui/core'
import React from 'react'
import useStyle from './styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const NavBar = () => {
    let classes = useStyle()
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <AppBar className={classes.appBar}>
                <Grid justifyContent="center" alignItems="center" container>
                    <Grid xs={12} sm={12} md={6} lg={6} item>
                        <Toolbar>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                textColor="secondary"
                                indicatorColor="secondary"
                                aria-label="secondary tabs example"
                                className={classes.tabs}
                            >
                                <Tab value="one" label="Item One" />
                                <Tab value="two" label="Item Two" />
                                <Tab value="three" label="Item Three" />
                            </Tabs>

                            <Typography> Income tax calculator</Typography>
                        </Toolbar>
                    </Grid>
                </Grid>

            </AppBar>

        </div>
    )
}

export default NavBar