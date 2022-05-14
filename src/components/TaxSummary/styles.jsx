import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    title: {
        marginTop: '5%',
    },
    topContainer: {
        flexGrow: 1,
        backgroundColor: "white",
        padding: theme.spacing(3),
        margin: 'auto',
        // marginBottom: '34px'
    },
    input: {
        background: '#f0e8f1',
        borderRadius: '20px !important'
    },
    button: {
        background: "#e34b31 !important",
        borderRadius: '20px !important'
    },
    summaryBox: {
        padding: "50px",
        marginRight: "68px"
    }
}));