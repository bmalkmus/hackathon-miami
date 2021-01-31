import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin:"15px",
    boxShadow: "5px 10px 10px black"
  },
});

export default function Tag({tag, users, url}) {
    const classes = useStyles();
    const [name, setName] = React.useState();
    const owner = tag[1]

    React.useEffect(()=>{
        for (let i = 0; i < users.length; i++){
            if(owner === users[i].account){
                setName(users[i].username)
                break;
            }
        }
    }, [owner, users])

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Tag Image"
          height="140"
          image={url}
          title="Tag Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {tag[0]}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}