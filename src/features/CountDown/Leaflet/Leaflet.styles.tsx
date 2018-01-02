import { css } from 'styled-components';

	// float: left;
const light = '#fff';
const dark = '#f7f7f7';
const LeafletStyles = css`
	position: relative;
	text-align: center;
    height: 110px;
    width: 100px;
    margin-right: 10px;
    background-color: ${light};
	border-radius: 8px;
	-moz-box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2), inset 2px 4px 0 0 rgba(255, 255, 255, 0.08);
	-webkit-box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2), inset 2px 4px 0 0 rgba(255, 255, 255, 0.08);
	box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2), inset 2px 4px 0 0 rgba(255, 255, 255, 0.08);

    &:last-child {
      margin-right: 0;
    }

    >span {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      font: normal 5.94em/107px "Lato";
      font-weight: 700;
      color: #de4848;
    }

    .top, .bottom-back {
      &:after {
        content: "";
        position: absolute;
        z-index: -1;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
      }
    }

    .top {
		z-index: 3;
		background-color: ${dark};
		transform-origin: 50% 100%;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		-webkit-transform-origin: 50% 100%;
		transform: perspective(200px);
		-webkit-transform: perspective(200px);
    }

    .bottom {
      z-index: 1;

      &:before {
        content: "";
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 50%;
        background-color: rgba(0, 0, 0, .02);
      }
    }

    .bottom-back {
      z-index: 2;
      top: 0;
      height: 50%;
      overflow: hidden;
      background-color: ${dark};
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;

      span {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
    }

    .top, .top-back {
      height: 50%;
      overflow: hidden;
	backface-visibility: hidden;
	-moz-backface-visibility: hidden;
	-webkit-backface-visibility: hidden;
    }

    .top-back {
      z-index: 4;
      bottom: 0;
      background-color: ${light};
      -webkit-transform-origin: 50% 0;
      transform-origin: 50% 0;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	-moz-transform: perspective(200px) rotateX(180deg);
	-ms-transform: perspective(200px) rotateX(180deg);
	-webkit-transform: perspective(200px) rotateX(180deg);
	transform: perspective(200px) rotateX(180deg);

      span {
        position: absolute;
        top: -100%;
        left: 0;
        right: 0;
        margin: auto;
      }
    }
  }
`;

export default LeafletStyles;
