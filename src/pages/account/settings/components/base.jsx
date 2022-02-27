import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Upload, message } from 'antd';
import ProForm, {
  ProFormDependency,
  ProFormDigit,
  ProFormDigitRange,
  ProFormFieldSet,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { getSHGProfileDetails } from '../service';
import styles from './BaseView.less';

const validatorPhone = (rule, value, callback) => {
  if (!value[0]) {
    callback('Please input your area code!');
  }

  if (!value[1]) {
    callback('Please input your phone number!');
  }

  callback();
}; // 头像组件 方便以后独立，增加裁剪之类的功能

const AvatarView = ({ avatar }) => (
  <>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
            Upload Logo
        </Button>
      </div>
    </Upload>
  </>
);

const BaseView = () => {

  const [profileData, setProfileData] = useState();
  const [loading, setLoading] = useState(true);

  const userProfileData = async () => {
    setProfileData(await getSHGProfileDetails());
    setLoading(false)
  }

  useEffect(() => {
    userProfileData()
  }, []);

  let currentUser = profileData?.shg;

  debugger;

  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.base64logo) {
        return currentUser.base64logo;
      }

      const url = 'https://png.pngitem.com/pimgs/s/157-1571855_upload-button-transparent-upload-to-cloud-hd-png.png';
      return url;
    }

    return '';
  };

  const handleFinish = async (values) => {
    console.log(values)
    message.success('Profile updated successfully');
  };

  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
                submitButtonProps: {
                  children: 'Update basic information',
                },
              }}
              initialValues={{ ...currentUser }}
              hideRequiredMark
            >
              <ProFormText
                width="md"
                name="name"
                label="SHG Name"
                rules={[
                  {
                    required: true,
                    message: 'SHG Name is Required !',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: 'Please enter phone number !',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="email"
                label="E- Mail"
              />
              <ProFormDigit
                width="md"
                name="noOfMembers"
                label="No of Members"
              />

              <ProFormSwitch
                width="md"
                name="hasUndergoneEdpTraining"
                label="Has members undergone EDP Training ?"
                
              />

              <ProFormText
                width="md"
                name="instituteOfEdpTraining"
                label="Institute of EDP Training"
              />

              <label>
                Address
              </label>

              <ProFormText
                width="md"
                name="addressLine1"
                label="Address Line 1"
              />

              <ProFormText
                width="md"
                name="addressLine2"
                label="Address Line 2"
              />

              <ProFormText
                width="md"
                name="addressLine1"
                label="Address Line 2"
              />

              <ProFormText
                width="md"
                name="village"
                label="Village"
              />

              <ProFormText
                width="md"
                name="taluka"
                label="Taluka"
              />

              <ProFormText
                width="md"
                name="city"
                label="City"
              />

              <ProFormText
                width="md"
                name="state"
                label="State"
              />

              <ProFormText
                width="md"
                name="pincode"
                label="Pincode"
              />
            </ProForm>
          </div>
          <div className={styles.right}>
                <AvatarView avatar={getAvatarURL()} />
            </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
