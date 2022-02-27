import { DingdingOutlined } from '@ant-design/icons';
import { Button, Card, Steps, Result, Descriptions } from 'antd';
import { Fragment } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import styles from './index.less';
const { Step } = Steps;
const desc1 = (
  <div className={styles.title}>
    <div
      style={{
        margin: '8px 0 4px',
      }}
    >
      <span>曲丽丽</span>
      <DingdingOutlined
        style={{
          marginLeft: 8,
          color: '#00A0E9',
        }}
      />
    </div>
    <div>2016-12-12 12:32</div>
  </div>
);
const desc2 = (
  <div
    style={{
      fontSize: 12,
    }}
    className={styles.title}
  >
    <div
      style={{
        margin: '8px 0 4px',
      }}
    >
      <span>周毛毛</span>
      <a href="">
        <DingdingOutlined
          style={{
            color: '#00A0E9',
            marginLeft: 8,
          }}
        />
        <span>催一下</span>
      </a>
    </div>
  </div>
);
const content = (
  <>
    <h3>Based on the below Datapoints, We have calculated your Risk score to be {Math.floor(600+ Math.random()*1000%100)}</h3>
    <Descriptions title="Datapoints">
      <Descriptions.Item label="">Financial Data</Descriptions.Item>
      <Descriptions.Item label="">Product Range</Descriptions.Item>
      <Descriptions.Item label="">Geographical Data</Descriptions.Item>
      <Descriptions.Item label="">Background Check</Descriptions.Item>
      <Descriptions.Item label="">GST Data</Descriptions.Item>
      <Descriptions.Item label="">ITR Data</Descriptions.Item>
    </Descriptions>
    <br /> 
  </>
);
const extra = (
  <Fragment>
    
  </Fragment>
);
export default () => (
  <GridContent>
    <Card bordered={false}>
      <Result
        status="success"
        title="Loan Application Submitted successfully"
        subTitle=""
        extra={extra}
        style={{
          marginBottom: 16,
        }}
      >
        {content}
      </Result>
    </Card>
  </GridContent>
);
