import { Divider, Grid, TextField, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import useStyle from './styles'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { withStyles } from "@material-ui/core/styles";
import { PieChart } from 'react-minimal-pie-chart';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import axios from "axios"
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import { Alert, Snackbar } from '@mui/material';
const settings = require('../../lib/settings.json')


const StyledTextField = withStyles({
    root: {
        "& label": {
            width: "100%",
            textAlign: "center",
            marginTop: "-5px",
            transformOrigin: "center",
            "&.Mui-focused": {
                transformOrigin: "center"
            }
        },
        "& input": {
            paddingLeft: "10px"
        }
    }
})(TextField);



const TaxSummary = () => {
    const classes = useStyle()
    const [year, setYear] = React.useState(2019);
    const [rates, setRates] = React.useState([])
    const [summary, setSummary] = React.useState({})
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState({ value: false })


    // handle selecting a new year
    const handleYearChange = (event) => {
        setLoading(true)
        setError({
            value: false
        })
        setYear(event.target.value);

    };


    // handle clicking calculate button
    const handleCalculate = () => {
        let income = document.getElementById("income").value
        let summary = {}
        parseRates(parseInt(income)).then((rate) => {
            if (rate) {
                summary["rate"] = rate
                summary["totalTax"] = Math.round(rate.rate * parseInt(income))
                summary["grossIncome"] = parseInt(income)
                summary["netPay"] = Math.round((1 - rate.rate) * parseInt(income))
                setSummary(summary)
            }

        })
    }


    // fetch all rates from API. this will set rates 
    const fetchRates = async () => {
        let url = settings.API
        if (year) {
            url += `/${year}`
        }
        await axios({
            method: 'get',
            url,
            headers: {},
        })
            .then(function (response) {
                // handle success
                setRates(response.data.tax_brackets)
                setLoading(false)
                setError({
                    value: false
                })
            })
            .catch(function (Error) {
                // handle error
                console.log('There was an error to fetch rates', Error)
                setError({
                    value: true,
                    reason: Error
                })
            })
    }


    // finds the rate that corresponds to the income that was entered by the user.
    const parseRates = async (income) => {
        return rates.find((rate) => {
            if (!rate.max) {
                return income >= rate.min
            }
            else {
                return income >= rate.min && income <= rate.max
            }

        });
    }


    useEffect(() => {
        // fetch the new rates everytime year changes
        fetchRates()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year])


    // the Loading component will be displayed while fetching the rates
    const Loading = () => {
        return (
            <div>
                {error.value &&
                    <Snackbar
                        style={{ top: '300px', zIndex: '2' }}
                        open={true}
                        // onClose={handleCloseAlert}
                        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                        <Alert severity="error" sx={{ width: '100%' }}>
                            <Stack>
                                <p> Sorry, We are having trouble fetching Tax Ratings.</p>
                                <p>{error.reason.message}</p>
                                <Button onClick={() => { window.location.reload(false) }} style={{ background: '#ff000045', color: "black" }} variant="contained" size="small">
                                    Retry
                                </Button>
                            </Stack>
                        </Alert>
                    </Snackbar>
                }
                <LoadingCircle style={{ zIndex: '1' }}></LoadingCircle>
            </div >)
    }

    // the Loaded component will be displayed once the rates are successfully fetched
    const Loaded = () => {
        return (
            <main style={{ width: '100%', backgroundColor: '#f6f6f9', padding: "25px" }}>
                <Grid justifyContent="center" alignItems="center" container>
                    <Grid xs={12} sm={12} md={5} lg={5} item>
                        <Card variant="outlined" sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={8} lg={8}>
                                        <Box className={classes.summaryBox}>
                                            <List style={{ display: "flex" }}>
                                                <ListItem> <p>Gross Income:</p></ListItem>
                                                <ListItem
                                                    secondaryAction={
                                                        <p edge="end" >
                                                            $  {summary.grossIncome}
                                                        </p>
                                                    }
                                                ></ListItem>
                                            </List>
                                            <List style={{ display: "flex" }}>
                                                <ListItem> <p>Tax Rate:</p></ListItem>
                                                <ListItem
                                                    secondaryAction={
                                                        <p edge="end" >
                                                            %{summary.rate && summary.rate.rate}
                                                        </p>
                                                    }
                                                ></ListItem>
                                            </List>
                                            <List style={{ display: "flex" }}>
                                                <ListItem> <p>Total Tax:</p></ListItem>
                                                <ListItem
                                                    secondaryAction={
                                                        <p edge="end" >
                                                            $ {summary.totalTax}
                                                        </p>
                                                    }
                                                ></ListItem>
                                            </List>
                                            <Divider></Divider>
                                            <List style={{ display: "flex" }}>
                                                <ListItem> <p>Net Pay:</p></ListItem>
                                                <ListItem
                                                    secondaryAction={
                                                        <p edge="end" >
                                                            $  {summary.netPay}
                                                        </p>
                                                    }
                                                ></ListItem>
                                            </List>

                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <div style={{ marginTop: "80px" }}>
                                            <PieChart
                                                animate
                                                animationDuration={500}
                                                animationEasing="ease-out"
                                                center={[50, 50]}
                                                lengthAngle={360}
                                                lineWidth={50}
                                                paddingAngle={0}
                                                startAngle={0}
                                                viewBoxSize={[100, 100]}
                                                data={[
                                                    { title: 'Total Tax', value: summary.totalTax ? summary.totalTax : 50, color: '#E38627' },
                                                    { title: 'Net Pay', value: summary.netPay ? summary.netPay : 50, color: '#78a4cb' }
                                                ]}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </main>
        )
    }

    return (
        <div>
            <main className={classes.topContainer}>
                <div className={classes.toolbar}>
                </div>
                <Grid justifyContent="center" alignItems="center" container>
                    <Grid xs={12} sm={12} md={8} lg={8} item>
                        <Typography variant="h4"> Income tax calculator</Typography>
                        <Typography style={{ color: "grey" }} > Calculate how much your salary is after tax</Typography>
                        <Stack style={{ marginTop: '25px' }} direction="row" spacing={2}>
                            <StyledTextField className={classes.input} size="small" id="income" label="Enter your gross income" variant="standard" />
                            <Select
                                disabled={loading}
                                labelId="yearLabel"
                                id="year"
                                value={year}
                                label="year"
                                onChange={handleYearChange}
                                size="small"
                                className={classes.select}
                            >
                                <MenuItem value={2019}>2019</MenuItem>
                                <MenuItem value={2020}>2020</MenuItem>
                                <MenuItem value={2021}>2021</MenuItem>
                                <MenuItem value={2022}>2022</MenuItem>
                            </Select>
                            <Button disabled={loading} onClick={() => handleCalculate()} className={classes.button} size="small" variant="contained">Calculate</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </main>
            {loading && <Loading></Loading>}
            {!loading && <Loaded></Loaded>}
        </div >
    )
}

export default TaxSummary