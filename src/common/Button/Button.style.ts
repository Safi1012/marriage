import { css } from 'styled-components';

const button = css`
	outline: none;
	display: inline-block;
    margin-bottom: 0;
    font-weight: normal;
    text-align: center;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    padding: 6px 16px;
    font-size: 13px;
    line-height: 1.846;
    border-radius: 3px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
	user-select: none;
	text-transform: uppercase;
    border: none;
    -webkit-box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
	transition: all 0.4s;

	${(props: any) => equals(props.brand, 'default') && css`
		color: #444444;
		background-color: #ffffff;
		border-color: transparent;
	`}

`;


const equals = (a: any, b: any): any => {
	return a === b;
};

export default button;
