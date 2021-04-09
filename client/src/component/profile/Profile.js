import React, { useEffect, useState } from 'react'
import { Grid, Avatar, makeStyles, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { PacmanLoader } from 'react-spinners'
import { useHistory } from 'react-router-dom'
import {
	fetchProfileById,
	followUser,
	getFollowers,
	getFollowing,
	unFollowUser,
} from '../../Redux/actions/profile'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	small: {
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
	large: {
		width: theme.spacing(20),
		height: theme.spacing(20),
	},
	back: {
		padding: 10,
	},
	padding: {
		paddingLeft: 10,
	},
	loadingSpinner: {
		margin: 15,
		padding: 15,
	},
	follow: {
		marginTop: 25,
	},
	username: {
		fontWeight: '700',
		fontSize: '24px',
		margin: 0,
		padding: 0,
	},
	handle: {
		margin: 0,
		padding: 0,
	},
}))

const Profile = ({ user: profile }) => {
	const history = useHistory()
	const dispatch = useDispatch()
	const classes = useStyles()

	const loading = useSelector((state) => state.auth.loading)
	const userProfile = useSelector((state) => state.auth.user)
	let following = useSelector((state) => state.profile.following)
	let followers = useSelector((state) => state.profile.followers)
	let followingCount = following.length
	let followersCount = followers.length
	console.log(following)
	let user = profile ? profile : userProfile
	// user = profile ? profile : userProfile

	// To check weather Edit btn or follow btn is to be displayed.
	const isAuth = profile ? profile._id === userProfile._id : true
	// console.log(profile, userProfile)

	// To Implement follow and unfollow msg on btns
	let isFollowing = false
	following = following.filter((userData) => userData._id === user._id)
	console.log(following)
	if (following.length > 0) isFollowing = true

	useEffect(() => {
		dispatch(getFollowers())
		dispatch(getFollowing())
	}, [])

	const handleFollow = () => {
		isFollowing
			? dispatch(unFollowUser(user._id))
			: dispatch(followUser(user._id))
		isFollowing = !isFollowing

		// dispatch(fetchProfileById(profile._id))
	}

	return (
		<Grid container item>
			{loading || user === null ? (
				<Grid
					container
					justify='center'
					item
					className={classes.loadingSpinner}>
					<PacmanLoader loading color='#07ADEE' size={25} />
				</Grid>
			) : (
				<Grid container direction='column' item className={classes.back}>
					<Grid container alignItems='center' item>
						<Grid item>
							<div className={classes.root}>
								<Avatar
									alt={user.username}
									src={user.avatar}
									className={classes.large}></Avatar>
							</div>
						</Grid>
						<Grid item>
							<Grid
								container
								direction='column'
								className={classes.padding}
								item>
								<Grid className={classes.username} item>
									{user.username}
								</Grid>
								<Grid className={classes.handle} item>
									@{user.handle}
								</Grid>
							</Grid>
						</Grid>
						{isAuth ? (
							<Button
								variant='contained'
								color='primary'
								fullWidth
								onClick={() => history.push('/setting')}>
								Edit Profile
							</Button>
						) : (
							<Button
								variant='contained'
								color='primary'
								fullWidth
								onClick={handleFollow}>
								{isFollowing ? 'UnFollow' : 'Follow'}
							</Button>
						)}
					</Grid>
					<Grid container direction='column' alignItems='center'>
						<Grid className={classes.padding} item>
							{user.caption}
						</Grid>
						<Grid
							container
							justify='space-evenly'
							className={classes.follow}
							item>
							{!profile ? followingCount : user.following.length}
							<Button
								color='primary'
								fullWidth
								onClick={() => history.push('/following')}>
								Following
							</Button>

							{!profile ? followersCount : user.followers.length}
							<Button
								color='primary'
								fullWidth
								onClick={() => history.push('/followers')}>
								Followers
							</Button>
						</Grid>
					</Grid>
				</Grid>
			)}
		</Grid>
	)
}

export default Profile
