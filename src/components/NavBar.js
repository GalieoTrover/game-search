import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';

const NavBar = ({ classes }) => {
	return (
		<div>
			<Container style={{ display: 'flex', justifyContent: 'space-between' }}
				className={classes.logoCont}>
				<Link
					className={classes.titleMargin}
					to="/"
					style={{ fontWeight: 'bold', letterSpacing: 1 }}
				>
					{/* <img src='/src/components/gamepad2.png' alt="icon" /> */}
					GameSearch
				</Link>
				<div style={{ display: 'flex' }}>
					<Link
						className={classes.linkButton}
						to="/about"
					>
						About
					</Link>
					<a
						className={classes.linkButton}
						href="https://github.com/galieotrover/game-search"
						target="_blank"
						rel="noreferrer"
					>
						Github
					</a>
				</div>
			</Container>
		</div>
	);
};

export default NavBar;
