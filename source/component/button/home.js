import React, { Component } from 'react';
import {
	View,
	Image,
    StyleSheet,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { ComponentStyles, StyleConfig } from '../../style';

const buttons = [{
    title:'闪存',
    icon: 'ios-color-palette-outline',
    action:'toBlinkAdd',
    color: StyleConfig.color_primary
},{
    title:'博问',
    icon: 'ios-document-outline',
    action:'toQuestionAdd',
    color: StyleConfig.color_primary
}];

class HomeButton extends Component {

	constructor(props) {
	    super(props);
        this.state = {
            activeButton: null
        };
	}

    componentWillUnmount() {
	  TimerMixin.clearTimeout(this.timer);
	}

    onButtonPress(item){
        let { router } = this.props;
        this.timer = TimerMixin.setTimeout(() => { 
			router && router[item.action] && router[item.action](item);
	    }, 500);
    }

    renderButtonItem(item, index){
        return (
            <ActionButton.Item 
                size = { StyleConfig.action_size }
                key = { index }
                title={ item.title }
                onPress={() => this.onButtonPress(item) }
                buttonColor = { item.color } 
                style = { styles.button_item }
                titleColor = { StyleConfig.color_white }
                titleBgColor = { item.color }>
                <Icon name={ item.icon }  style={ ComponentStyles.button_icon } />
            </ActionButton.Item>
        )
    }

    renderButtonIcon(){
        return (
            <Icon name="ios-add" style={ [ComponentStyles.button_icon, styles.button_icon] }/>
        )
    }   

	render() {
	    return (
            <ActionButton
                offsetY = { StyleConfig.action_offset_y }
                offsetX = { StyleConfig.action_offset_x }
                size = { StyleConfig.action_size }
                bgColor = { StyleConfig.action_background_color }
                btnOutRange = { StyleConfig.action_color_danger_active }
                buttonColor = { StyleConfig.action_color_danger }
                icon = {  this.renderButtonIcon() }>
                {
                    buttons && buttons.map((button, index)=>{
                        return this.renderButtonItem(button, index)
                    })
                }
            </ActionButton>
	    )
	}
}

const styles = StyleSheet.create({
  button_item:{
      elevation: 0
  },
  button_icon:{
      fontSize: StyleConfig.icon_size + 6
  }
});

export default HomeButton;