import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  makeStyles,
  Tabs,
  Tab,
  Paper,
  Box,
  Typography
} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useSelector } from "react-redux";
import Tweets from "../tweets/Tweets";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={0}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`
  };
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

const ToggleTweets = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const tweet = useSelector((state) => state.tweet);
  const { tweets, retweets, likes } = tweet;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Paper square className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant='fullWidth'
          indicatorColor='primary'
          textColor='primary'
          aria-label='icon tabs example'>
          <Tab icon={<TwitterIcon />} aria-label='tweets' />
          <Tab icon={<RepeatIcon />} aria-label='retweets' />
          <Tab icon={<FavoriteIcon />} aria-label='likes' />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <Tweets tweets={tweets} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Tweets tweets={retweets} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Tweets tweets={likes} />
      </TabPanel>
    </Fragment>
  );
};

export default ToggleTweets;
