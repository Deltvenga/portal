import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden'
    },
    paper: {
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
    Item: {
        alignSelf: 'center'
    }
}));

export default function AutoGridNoWrap() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container wrap="nowrap" spacing={2} >
                    <Grid item>
                        <Avatar src="https://ru.js.cx/carousel/1.png"/>
                    </Grid>
                    <Grid item xs zeroMinWidth className={classes.Item}>
                        <Typography noWrap>За старательность</Typography>
                    </Grid>
                    <Grid item>
                        <Avatar src="https://ru.js.cx/carousel/2.png"/>
                    </Grid>
                    <Grid item xs zeroMinWidth className={classes.Item}>
                        <Typography noWrap>За помощь</Typography>
                    </Grid>
                    <Grid item>
                        <Avatar src="https://ru.js.cx/carousel/3.png"/>
                    </Grid>
                    <Grid item xs zeroMinWidth className={classes.Item}>
                        <Typography noWrap>Старание и упоство</Typography>
                    </Grid>
                    <Grid item>
                        <Avatar src="https://ru.js.cx/carousel/4.png"/>
                    </Grid>
                    <Grid item xs zeroMinWidth className={classes.Item}>
                        <Typography noWrap>Выполнение плана</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}