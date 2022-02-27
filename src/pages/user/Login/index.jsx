import {
  AlipayCircleOutlined,
  LockOutlined,
  MessageOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, message, Tabs, Form } from 'antd';
import React, { useState } from 'react';
import { ProFormCaptcha, ProFormText, LoginForm, ProFormSelect } from '@ant-design/pro-form';
import { useIntl, history, FormattedMessage, SelectLang, useModel } from 'umi';
import Footer from '@/components/Footer';
import { getOtp, login } from '@/services/ant-design-pro/login';
import styles from './index.less';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);


const Login = () => {
  const [type, setType] = useState('PHONE');
  const [userLoginState, setUserLoginState] = useState({});
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();
  const [loginForm] = Form.useForm();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    debugger;
    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const automaticOtp = (i, otp) => {
    i++;
    if(i !== 7) {
      loginForm.setFieldsValue({'captcha': new String(otp+i)})
      setTimeout(() => automaticOtp(i, new String(otp+i)), 90);
    }  
  }

  const handleSubmit = async (values) => {
    try {
      // 登录
      const msg = await login({ ...values });
      if (msg.response.ok) {
        localStorage.setItem('Authorization', msg.response.headers.get('Authorization'));
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: 'Login Successful!',
        });
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();

        if (!history) return;
        const { query } = history.location;
        const { redirect } = query;
        history.push(redirect || '/');
        return;
      }


      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm
          onValuesChange={(values) => {
            const {loginType} = values;
            if(loginType && loginType !== type) {
              setType(loginType);
            }
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Udaan"
          subTitle={intl.formatMessage({
            id: 'pages.layouts.userLayout.title',
          })}
          initialValues={{
            autoLogin: false,
          }}
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
          form={loginForm}
        >
          <Tabs activeKey={''}>
            <Tabs.TabPane
              key=""
              tab={intl.formatMessage({
                id: 'pages.login.phoneLogin.tab',
                defaultMessage: 'Mobile phone number login',
              })}
            />
          </Tabs>

          {status === 'error' && <LoginMessage content="Verification code error" />}
          {(
            <>
              <ProFormSelect
                name='loginType'
                placeholder={'Login Type'}
                initialValue={'PHONE'}
                options={[
                  {
                    value: "PHONE",
                    label: "Phone Number",
                  },
                  {
                    value: "EMAIL",
                    label: "E-Mail",
                  }
                ]}
              >
              </ProFormSelect>
              {
                type == 'PHONE' ? (
                  <ProFormText  
                    fieldProps={{
                      size: 'large',
                      prefix: <><MobileOutlined className={styles.prefixIcon} /> +91</>,
                    }}
                    name="contactId"
                    placeholder='Phone Number'
                    rules={[
                      {
                        required: true,
                        message: `Please enter phone number!`,
                      },
                      {
                        pattern:  /^\d{10}$/,
                        message: `Malformed phone number!`,
                      },
                    ]}
                  />
                ) : (null)
              }
              {
                type == 'EMAIL' ? (
                  <ProFormText  
                    fieldProps={{
                      size: 'large',
                      prefix: <MessageOutlined className={styles.prefixIcon} />,
                    }}
                    name="contactId"
                    placeholder='E-Mail'
                    rules={[
                      {
                        required: true,
                        message: `Please enter email!`,
                      },
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: `Malformed e-mail!`,
                      },
                    ]}
                  />
                ) : (null)
              }
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.captcha.placeholder',
                  defaultMessage: 'Please enter verification code',
                })}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} sec(s)`;
                  }

                  return 'Get Code'
                }}
                name="captcha"
                phoneName="contactId"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.captcha.required"
                        defaultMessage="Please enter verification code!"
                      />
                    ),
                  },
                ]}
                onGetCaptcha={async (contactId) => {
                  const checkValidId = await getOtp({
                    contactId, loginType: type
                  });

                  if (checkValidId?.response && checkValidId?.response.ok) {

                    const token = checkValidId.response.headers.get('Authorization')
                    localStorage.setItem('Authorization', token)
                    message.success('Verification code sent successfully');
                    message.info('OTP Detected')
                    automaticOtp(0, "");                    
                  } else {
                    return
                  }
                 
                }}
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
