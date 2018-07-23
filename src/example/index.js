import React, { Component } from 'react';
import searchKit from '../searchKit';

class Example extends Component{

    fetchData = (params) => {
        return fetch('/xyz');
    }

    render(){
        return <div>Example Content here</div>;
    }
}

const WrappedExample = searchKit(Example, {baseUrl: '/xyz'});

export default WrappedExample;
