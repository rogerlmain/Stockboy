import React from "react"

export default class App extends React.Component {
	render = () => <form>
		<select id="test_select" name="test_select" value="two">
			<option value="one">One</option>
			<option value="two" selected={true}>Two</option>
		</select>
	</form>
}
