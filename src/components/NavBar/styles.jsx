import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    appBar: {
        boxShadow: 'none',
        background: 'white',
        color: 'white',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        // height: '200px',
        // position: 'inherit'
    },
    tabs: {
        margin: 'auto'
    }
}));