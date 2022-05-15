import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import { Alert } from '@mui/material'
import React from 'react'
import useStyle from './styles'
import dashboardSnapshot from '../../assets/dashboard.png'
import failureSnapshot from '../../assets/failure.png'
import tabsSnapshot from '../../assets/tabs.png'
import disabledSnapshot from '../../assets/disabled.png'


const Help = () => {
    const classes = useStyle()

    return (
        <div>
            <main className={classes.topContainer}>
                <div className={classes.toolbar}>
                </div>
                <main style={{ width: '100%', backgroundColor: '#f6f6f9', padding: "25px" }}>
                    <Grid justifyContent="center" alignItems="center" container>
                        <Grid xs={12} sm={12} md={5} lg={5} item>
                            <Card variant="outlined" sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography variant="subtitle1" gutterBottom component="div">
                                        <b>1-</b> Please follow the instructions in the Getting Started section
                                        <a href='https://github.com/points/interview-test-server#getting-started'
                                            rel="noreferrer" target="_blank"> here </a> to start the backend server.
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom component="div">
                                        <b>2-</b> Please follow the instructions in the Getting Started section
                                        <a href='https://github.com/hayouni15/tax-calculator/blob/main/README.md#getting-started'
                                            rel="noreferrer" target="_blank"> here </a> to start the Tax Calculator App.
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom component="div">
                                        <b>3-</b> Make sure the "Demo" Tab is selected from the navigation menu.
                                        <img src={tabsSnapshot} alt="tabs" className={classes.image} />
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom component="div">
                                        <b>4-</b> Wait until the rates are loaded from the API. This may take couple of seconds.
                                    </Typography>
                                    <Alert variant="outlined" severity="info">
                                        <Typography variant="subtitle1" gutterBottom component="div">
                                            <b>-Note1:</b> The calculate button will be disabled while fetching rates. once the
                                            rates are retrieved the "calculate" button as well as the select menu will be enabled.
                                            <img src={disabledSnapshot} alt="disabled" className={classes.image} />
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom component="div">
                                            <b>-Note2:</b> Sometimes the App will fail to retch the rates.
                                            An alert will pop up to show the reason for the failure and gives you the option to retry.
                                            <img src={failureSnapshot} alt="failure" className={classes.image} />
                                        </Typography>
                                        <Typography variant="body1" gutterBottom component="div">
                                            <b>-Note3:</b>  If the rates are fetched successfully, a results dashboard will show up.
                                            That is when you can enter your gross income and hit calculate.
                                        </Typography>
                                        <img src={dashboardSnapshot} alt="dashboard" className={classes.image} />
                                        <Typography variant="body1" gutterBottom component="div">
                                            <b>-Note4:</b>  The API doesn't support the year 2022.
                                            It is added to the years select menu intentionally to test the failure with status code 404.
                                        </Typography>
                                    </Alert>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </main>
            </main >

        </div >
    )
}

export default Help