import React, { useEffect } from 'react'
import { Form, Input, Field, Radio } from '@alifd/next'
import IfElse, { If, Else } from '@/components/IfElse'
import ComponentInput from '@/components/ComponentInput'

const FormItem = Form.Item
const RadioGroup = Radio.Group

function Drawer({ initProps, fieldValidate: _fieldValidate }) {
  const field = Field.useField({
    values: initProps,
  })
  // const { getValue } = field

  function componentDidUnmount() {
    field.validate((error, data) => {
      _fieldValidate && _fieldValidate(error, data)
    })
  }

  useEffect(() => {
    field.validate()
    return componentDidUnmount
  }, [])

  return (
    <Form field={field}>
			
			<FormItem 
				label="网页连接" 
				required={true} 
				requiredMessage="请输入网页地址" 
				hasFeedback
			>
				<Input placeholder="" name="url" />
			</FormItem>
		
			<FormItem
				label="打开方式"
				required={true}
				requiredMessage=""
			>
				<RadioGroup 
					name="type" 
					dataSource={[{"value":"1","label":"1"},{"value":"2","label":"2"}]} 
				/>
			</FormItem>
    
    </Form>
  )
}

export default Drawer
