import React from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

export default class DetailMultiSection extends React.Component {

    constructor(props) {
        super(props);
        this.openDetail = this.openDetail.bind(this);
        this.resolve = this.resolve.bind(this);
    }

    openDetail(url, event) {

    };

    resolve(type) {
        if (type === "cocktail" || type === "cocktails") {
            return ["Cocktails", "/cocktail-detail/"];
        } else if (type === "ingredient" || type === "ingredients") {
            return ["Ingredients", "/ingredient-detail/"];
        } else if (type === "brand" || type === "brands") {
            return ["Brands", "/brand-detail/"];
        } else if (type === "country" || type === "countries") {
            return ["Countries", "/country-detail/"];
        }
    }

    render() {
        if (this.props.elements.length < 1) {
            return null;
        }
        
        const strings = this.resolve(this.props.type);

        return (
            <div>
                <Typography type="display1" align="left">{strings[0]}</Typography>

                {this.props.elements.map((element, i) => { return (
                    <Button key={i} onClick={ (event) => {
                        event.preventDefault();
                        this.props.history.push({
                            pathname: strings[1] + element.id,
                            state: {"fromURL": this.props.location.pathname}
                        });
                    }}>
                        {element.label}
                    </Button>
                );}, this)}
            </div>
        )
    }
}
