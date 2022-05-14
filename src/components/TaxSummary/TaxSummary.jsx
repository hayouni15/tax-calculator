import { Container, Divider, Grid, TextField, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import useStyle from './styles'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from '@mui/material/InputAdornment';
import { PieChart } from 'react-minimal-pie-chart';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import axios from "axios"
const backEndHostName = 'localhost'

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

    const handleYearChange = (event) => {
        setYear(event.target.value);

    };
    const handleCalculate = () => {
        console.log(year)
        let income = document.getElementById("income").value
        console.log(document.getElementById("income").value)
        parseRates()
    }
    const fetchRates = async () => {
        let url = `http://${backEndHostName}:5000/tax-calculator/brackets`
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
                console.log(response)
                setRates(response.data.tax_brackets)
            })
            .catch(function (Error) {
                // handle error
                console.log('There was an error to fetch rates', Error)
            })
    }

    const parseRates = (income) => {
        console.log(rates)
    }

    useEffect(() => {
        fetchRates()
    }, [year])

    return (
        <div>
            <main className={classes.topContainer}>
                <div className={classes.toolbar}>
                </div>
                <Grid justifyContent="center" alignItems="center" container>
                    <Grid xs={12} sm={12} md={8} lg={8} item>
                        <Typography variant="h4"> Income tax calculator</Typography>
                        <Typography style={{ color: "grey" }} > Find out how much your salary is after tax</Typography>
                        <Stack style={{ marginTop: '25px' }} direction="row" spacing={2}>
                            <StyledTextField className={classes.input} size="small" id="income" label="Enter your gross income" variant="standard" />
                            <Select
                                labelId="yearLabel"
                                id="year"
                                value={year}
                                label="year"
                                onChange={handleYearChange}
                                size="small"
                                className={classes.input}
                            >
                                <MenuItem value={2019}>2019</MenuItem>
                                <MenuItem value={2020}>2020</MenuItem>
                                <MenuItem value={2021}>2021</MenuItem>
                                <MenuItem value={2022}>2022</MenuItem>
                            </Select>

                            <Button onClick={() => handleCalculate()} className={classes.button} size="small" variant="contained">Calculate</Button>
                        </Stack>
                    </Grid>
                </Grid>

            </main>
            <main style={{ width: '100%', backgroundColor: '#f6f6f9', padding: "25px" }}>
                <Grid justifyContent="center" alignItems="center" container>
                    <Grid xs={12} sm={12} md={6} lg={6} item>
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
                                                            $52,000
                                                        </p>
                                                    }
                                                ></ListItem>
                                            </List>
                                            <List style={{ display: "flex" }}>
                                                <ListItem> <p>Tax Rate:</p></ListItem>
                                                <ListItem
                                                    secondaryAction={
                                                        <p edge="end" >
                                                            30%
                                                        </p>
                                                    }
                                                ></ListItem>
                                            </List>
                                            <List style={{ display: "flex" }}>
                                                <ListItem> <p>Total Tax:</p></ListItem>
                                                <ListItem
                                                    secondaryAction={
                                                        <p edge="end" >
                                                            $22,000
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
                                                            $522,000
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
                                                    { title: 'Total Tax', value: 27, color: '#E38627' },
                                                    { title: 'Net Pay', value: 73, color: '#C13C37' }
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
        </div>
    )
}

export default TaxSummary