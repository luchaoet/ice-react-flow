
import React from 'react';
import { Form, Input, Radio, Field, Button, Select, Checkbox, NumberPicker, Switch, Balloon, Icon } from '@alifd/next';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const _formItemLayout = {
	labelCol: {
		span: 6
	},
	wrapperCol: {
		span: 14
	}
};

const empty = () => {}

const components = {
	'Input': Input,
	'Select': Select,
	'Radio': RadioGroup,
	'Input.Password': Input.Password,
	'Checkbox': Checkbox,
	'NumberPicker': NumberPicker,
	'Switch': Switch,
}

export default class FieldForm extends React.Component {
		field = new Field(this, {
			// onChange: (name, value) => {
			// 	const values = this.field.getValues();
			// 	this.props.node.setValues(values)
			// 	const errors = this.field.getErrors();
			// 	console.log(errors)
			// 	this.props.node.setErrors(errors)
			// },
			values: this.props.node.getValues()
		});
		constructor(props){
			super(props);
			this.state = {
				node: props.node,
				propsConfig: props?.node?.initProps || []
			}
		}

		onChange = (name, v) => {
			this.field.setValue(name, v);
			const values = this.field.getValues();
			const errors = this.field.getErrors();
			this.state.node.setAttributes({values, errors})
			// console.log({values, errors})
		}

		renderLabel = (props) => {
			const { tips, label } = props;
			return (
				<div style={{
					display: 'inline-flex'
				}}>
					<p>{label}</p>
					{
						tips && 
						<Balloon trigger={<Icon size='small' type="help" />} closable={false}>
						{tips}
						</Balloon>
					}
				</div>
			)
		}

		componentWillUnmount() {
			// const node = this.state.node;
			// this.field.validate((errors, values) => {
			// 	node.setAttributes({values, errors})
      // });
		}

		renderFormItem = () => {
			const { propsConfig } = this.state;
			const { getValues } = this.field;

			return propsConfig.map((props, index) => {
				const { 
					name, label, tips, required, component, help, 
					pattern, patternMessage, validator, 
					disabled = false, 
					hidden = false,
					...options 
				} = props;
				// 组件id或自定义组件
				const Com = typeof component === 'string' ? components[component] : component;
				// 空值提示
				const requiredMessage = required ? `${label} 是必填字段` : null;
				// 自定义校验函数或正则
				let _validator = null;
				if(validator) {
					_validator = validator.bind(this, this.field, props)
				}else if(pattern) {
					_validator = (rule, value, callback) => {
						if(!value && !required) callback()
						return pattern.test(value) ? callback() : callback(patternMessage || `${label} 格式错误`)
					}
				}
				const values = getValues();
				// 禁用
				const _disabled = disabled instanceof Function ? disabled(values, this.field) : !!disabled;
				// 隐藏
				const _hidden = hidden instanceof Function ? hidden(values, this.field) : !!hidden;
				if(_hidden)return null;
				// label
				const _label = this.renderLabel(props);

 				return (
					<FormItem
						label={_label}
						required={required}
						requiredMessage={requiredMessage}
						key={index}
						fullWidth
						validator={_validator}
					>
						<Com name={name} disabled={_disabled} {...options} onChange={v => this.onChange(name, v)} />
						{help && <p>{help}</p>}
					</FormItem>
				)
			})
		}

		renderFooter = () => {
			const { 
				footer = {},
				onSubmit = empty,
				onReset = empty
			} = this.props;
			if(footer === false) return null;
			const actions = footer.actions || ['ok', 'reset'];
			const align = footer.align || 'left';
			const before = footer.before || [];
			const after = footer.after || [];
			const buttons = {
				ok: <Form.Submit key='ok' validate type="primary" onClick={(v, e) => onSubmit(v, e)}>确定</Form.Submit>,
				reset: <Form.Reset key='reset' onClick={() => onReset()}>取消</Form.Reset>
			}
			return (
				<FormItem label=" " style={{ textAlign: align }}>
					{this.footerPushButtons(before)}
					{actions.map(v => buttons[v])}
					{this.footerPushButtons(after)}
				</FormItem>
			)
		}

		footerPushButtons = (btns) => {
			return btns.map((btn, index) => {
				const { children, onClick = empty, ...options} = btn;
				return <Button key={index} onClick={() => onClick(this.field)} {...options}>{children}</Button>
			})
		}

    render() {
			const { field, props } = this;
			const { labelAlign, node, style, isPreview, formItemLayout: _formItemLayout } = props;
			return (
				<Form 
					field={field} 
					style={style} 
					labelAlign={labelAlign} 
					isPreview={isPreview}
					{..._formItemLayout} 
				>
					{this.renderFormItem()}
					{this.renderFooter()}
				</Form>
			);
    }
}