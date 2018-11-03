import * as React from 'react';


interface Props {}

class Impressum extends React.PureComponent<Props> {

	render() {
		return (
			<div>
				<h1>Impressum</h1>
				<p>Angaben gemäß § 5 TMG</p>
				<address>
					Arne Maier<br/>
					Hirtenstr. 8<br/>
					76307 Karlsbad<br/>
					Germany
				</address>
				<h4>Vertreten durch:</h4>
				Arne Maier<br/>
				<h4>Kontakt:</h4>
				E-Mail: <a href="mailto:arne_maier@gmx.de">arne_maier@gmx.de</a>
			</div>
		);
	}
}

export default Impressum;
