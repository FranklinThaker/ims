import React, { Component } from "react";
export default class Footer extends Component {
    render() {
        return (
            <div style={{ width: '100%', position: "fixed", bottom: '0', fontSize: '20px', textAlign: "center", color: "grey" }} >
                <span>Copyright © Bacancy Technology 2019</span>
            </div>
        );
    }
}