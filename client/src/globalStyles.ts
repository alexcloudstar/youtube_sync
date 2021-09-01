import { createGlobalStyle } from 'styled-components';
// import  from 'styled-components';

const GlobalStyles = createGlobalStyle`
*,
html,
body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}


#root {
    h5,
    h6 {
        text-align: center;
    }
		h5 {
            margin-top: 1rem;

		}

        h6 {

        }
}
`;

export default GlobalStyles;
