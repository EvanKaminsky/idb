import React from 'react';
import Typography from 'material-ui/Typography';

import background from '../static/backgrounds/index.jpg';

const backgroundStyle = {
    backgroundImage: background,
    flex: 1,
    resizeMode: 'cover'
};

const HTMLText = ({children, component = ""}) => <Typography
    component="div"
    dangerouslySetInnerHTML={{ __html: children
        .replace(/\n/g, '<br/>')
        .replace(/(<? *script)/gi, 'illegalscript')
    }}
/>;

module.exports = {
    backgroundStyle, HTMLText
};