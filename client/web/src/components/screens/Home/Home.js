import React, { Component } from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

export default class Home extends Component{

    render(){
        const { containerStyle, contentStyle } = styles

        return(
            <Content style={ contentStyle }>
                <div style={ containerStyle }>

                    {/* Our logo goes here  */}
                    <h1>Schedule Me Up</h1>
                </div>

            </Content>
        )
    }

}

const styles = {
    containerStyle:{
        background: '#fff', 
        padding: 24, 
        minHeight: 500, 
        marginTop: 20
    },

    contentStyle : {
        padding: '0 50px', 
        width: "60%",
        marginTop: 60,
        alignSelf: "center"
    }
}