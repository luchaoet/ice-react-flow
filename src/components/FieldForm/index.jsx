
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
		field = new Field(this);

		onChange = (v, name) => {
			this.field.setvalue(name, v)
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

		renderFormItem = () => {
			const { propsConfig= [] } = this.props;
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
				const _validator = validator || ( 
					pattern
					? (rule, value) => {
							return new Promise((resolve, reject) => {
								if(!pattern.test(value)) {
									reject([new Error(patternMessage || `${label} 格式错误`)]);
								}
								resolve()
							})
						} 
					: null
				);
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
						<Com name={name} disabled={_disabled} {...options} onChange={v => this.onChange.bind(this, v, name)} />
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
			const aligin = footer.aligin || 'left';
			const before = footer.before || [];
			const after = footer.after || [];
			const buttons = {
				ok: <Form.Submit key='ok' validate type="primary" onClick={(v, e) => onSubmit(v, e)}>确定</Form.Submit>,
				reset: <Form.Reset key='reset' onClick={() => onReset()}>取消</Form.Reset>
			}
			return (
				<FormItem wrapperCol={{ offset: 6 }} style={{ textAlign: aligin }}>
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
			const { labelAlign, propsConfig, style, isPreview, formItemLayout: _formItemLayout } = props;
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