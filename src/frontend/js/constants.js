import React from 'react';
import Typography from 'material-ui/Typography';

const backgroundStyle = {
    backgroundImage: 'url(../static/webpacked_media/index.jpg)',
    flex: 1,
    resizeMode: 'cover'
};

const HTMLText = ({children, component = ""}) => <Typography
    component="body2"
    dangerouslySetInnerHTML={{ __html: children
        .replace(/\n/g, '<br/>')
        .replace(/(<? *script)/gi, 'illegalscript')
    }}
/>;

module.exports = {
    backgroundStyle, HTMLText
};