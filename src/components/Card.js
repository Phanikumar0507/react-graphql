import React, {useMemo} from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {measurements, metrics} from "../../store/packs";

const useStyles = makeStyles({
    card: {
        width: "40%",
        marginRight: "1rem",
        marginBottom: "1rem"
    }
});

export default ({metric}) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant={"h6"}>{metric}</Typography>
                <Typography variant={"h3"}>{metric}</Typography>
            </CardContent>
        </Card>
    );
};
