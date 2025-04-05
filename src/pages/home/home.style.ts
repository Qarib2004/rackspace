import { createUseStyles } from 'react-jss';

interface StyleProps {
    isDarkMode?: boolean;
  }

const useHomeStyles = createUseStyles<string, StyleProps>({
    home: {
        backgroundColor: '#F4F7F6',
    },
});

export default useHomeStyles;
