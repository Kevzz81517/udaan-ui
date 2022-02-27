import {
  AlipayCircleOutlined,
  LockOutlined,
  MessageOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, message, Tabs, Form, Input, Row, Col, Button } from 'antd';
import React, { useState } from 'react';
import { ProFormCaptcha, ProFormText, LoginForm, ProFormSelect } from '@ant-design/pro-form';
import { useIntl, history, FormattedMessage, SelectLang, useModel, Link } from 'umi';
import Footer from '@/components/Footer';
import { getOtp, login } from '@/services/ant-design-pro/login';
import styles from './index.less';
import { useRequest } from 'ahooks';
import { verifyAndSignup, getOtpForSignup } from './service';

const RegisterMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Register = () => {
  const [type, setType] = useState('PHONE');
  const [userLoginState, setUserLoginState] = useState({});
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();
  const [loginForm] = Form.useForm();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
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
      const msg = await verifyAndSignup({PHONE: values.captcha});
      if (msg.response.ok) {
        localStorage.setItem('Authorization', msg.response.headers.get('Authorization'));
        const defaultLoginSuccessMessage = 'Registered Successfully!';
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
      const defaultLoginFailureMessage = 'Registration failed, please try again!';
      message.error(defaultLoginFailureMessage);
    }
  };

  const { loading: submitting, run: register } = useRequest(verifyAndSignup, {
    manual: true,
    onSuccess: (data, params) => {
      if (data.status === 'ok') {
        message.success('Registration successful!');
        history.push({
          pathname: '/user/register-result',
          state: {
            account: params.email,
          },
        });
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <Row  justify='center'>
        <Form
  
          style={{ flexDirection: 'column',  alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}
          onValuesChange={(values) => {
            
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
              tab='Register'
            />
          </Tabs>

          {status === 'error' && <RegisterMessage content="Verification code error" />}
          {(
            <>
              <ProFormText  
                    fieldProps={{
                      size: 'large',
                    }}
                    name="shgName"
                    placeholder='SHG Name'
                    rules={[
                      {
                        required: true,
                        message: `Please enter SHG Name!`,
                      },
                    ]}
                  />
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
                  debugger;
                  const checkValidId = await getOtpForSignup({
                    phone: contactId, name: loginForm.getFieldsValue('shgName')?.shgName 
                  });

                  if (checkValidId?.response && checkValidId?.response.ok) {
                    debugger;
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
          <Form.Item>
          <Button
            size="large"
            loading={submitting}
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            <span>Register</span>
          </Button>
          <Link className={styles.login} to="/user/login">
            <span>Log in with an existing account</span>
          </Link>
        </Form.Item>
        </Form>
        </Row>
      </div>
      <Footer />
    </div>
  );
}


export default Register;