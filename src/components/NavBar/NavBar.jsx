import { AppBar, Grid } from '@material-ui/core'
import React from 'react'
import useStyle from './styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const NavBar = ({ tab, setTab }) => {
    let classes = useStyle()
    // const [tab, setTab] = React.useState('1');

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };
    return (
        <div>
            <AppBar className={classes.appBar}>
                <Grid justifyContent="center" alignItems="center" container>
                    <Grid xs={12} sm={12} md={6} lg={6} item>
                        <Toolbar>
                            <Tabs
                                value={tab}
                                onChange={handleTabChange}
                                textColor="secondary"
                                indicatorColor="secondary"
                                aria-label="secondary tabs example"
                                className={classes.tabs}
                            >
                                <Tab value="1" label="Demo" />
                                <Tab value="2" label="Help" />
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