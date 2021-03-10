import React from 'react';
import FieldForm from '@/components/FieldForm';
import ResolutionInput from './components/ResolutionInput';

function FormCom() {

  const propsConfig = [
    {
      component: 'Input',
      label: '成员昵称',
      name: 'nikeName',
      required: true,
      maxLength: 10,
      pattern: /[A-Za-z0-9]+$/,
      hasClear: true,
      placeholder: '请输入',
      defaultValue: 'lucas',
      disabled: (props) => {
        return props.nikeName == '222'
      },
      tips: '该IP地址可能跟需要连接的ECS的IP不一致,请仔细确认填写'
    },
    {
      component: 'Select',
      name: 'role',
      label: '权限类型',
      dataSource: [{label: '测试1', value: 'test'}, {label: '测试2', value: 'test1'}],
      required: true,
      hasClear: true,
      defaultValue: 'test',
      validator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if(value === 'test') {
            reject([new Error(`值不可为 ${value}`)]);
          }else{
            resolve(value)
          }
        })
      }
    },
    {
      component: 'Radio',
      name: 'roles',
      label: '权限类型',
      dataSource: [{label: '测试1', value: 'test'}, {label: '测试2', value: 'test1'}],
      defaultValue: 'test1'
    },
    {
      component: 'Input.Password',
      name: 'password',
      required: true,
      label: '密码',
      hidden: (props) => {
        return props.nikeName == '111'
      }
    },
    {
      component: 'Input',
      label: '邮箱',
      name: 'useremail',
      required: true,
      pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      hasClear: true
    },
    {
      component: ResolutionInput,
      label: '分辨率',
      name: 'resolution',
      required: true,
      validator: (rule, value) => {
        const {value1, value2} = value || {};
        return new Promise((resolve, reject) => {
          if(!value1 || !value2) {
            reject([new Error('值有误')]);
          }else{
            resolve(value)
          }
        })
      }
    }
  ]
  
  return (
    <>
      <FieldForm 
        labelAlign="top" 
        footer={{
          actions: ['ok', 'reset'],
          aligin: 'right',
          before: [
            {
              type: "normal",
              children: '测试',
              onClick: (values) => {
                console.log(values)
              }
            }
          ]
        }}
        propsConfig={propsConfig} 
        style={{width: 600}}
        onSubmit={(v, e) => console.log(v, e)}
      />
    </>
  );
}

export default FormCom;