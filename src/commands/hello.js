// Credit to:
// https://medium.com/trabe/building-cli-tools-with-react-using-ink-and-pastel-2e5b0d3e2793
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Text, Box } from "ink";
import Spinner from "../components/spinner.js";

// Let's fake the service call
const getAlias = (name) =>
	new Promise((resolve, reject) => {
		// adding some delay
		setTimeout(() => {
			const alias = {
				david: "Barral",
				miguel: "migs",
				// more aliases
			}[name];

			if (alias) {
				resolve(alias);
			} else {
				reject();
			}
		}, 2000);
	});

const propTypes = {
	/// Name of the person to greet
	name: PropTypes.string.isRequired,
};

/// Hello world command
const hello = ({ name }) => {
	const [{ working, alias, error }, setState] = useState({ working: true });

	useEffect(() => {
		getAlias(name)
			.then((alias) => setState({ working: false, alias }))
			.catch(() => setState({ working: false, error: true }));
	}, []);

	// To use it alongside the Loading... text we wrap it in a Box component to have a row flex layout.
	if (working) {
		return (
			<Box>
				<Spinner />
				<Text>Loading...</Text>
			</Box>
		);
	}

	if (error) {
		return <Text color="yellow">Hello, {name} (poor soul without alias)</Text>;
	}

	return <Text color="green">Hello, {alias}</Text>;
};

hello.propTypes = propTypes;

export default hello;
