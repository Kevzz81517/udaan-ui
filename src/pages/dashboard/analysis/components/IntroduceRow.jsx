import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress } from '@ant-design/charts';
import { Button, Col, Form, Input, Modal, Row, Tooltip } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';
import { useState } from 'react';
import { applyForLoan } from '../service';
const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};

const IntroduceRow = ({ loading, visitData }) => {

  const [visible, setVisible] =  useState(false);
  const [vuaId, setVuaId] = useState();
  return <>
  <Modal visible={visible} onCancel={() => setVisible(false)} title='Apply New Loan' onOk={() => {
    applyForLoan(vuaId).then(res => {
      window.location.replace(res);
      setVisible(false);
    })
  }}>
      <Form.Item
          label='Loan Amount'
        >
        <Input type='text' />
      </Form.Item>
      <Form.Item
        label='VUA Id'
      >
        <Input type='text' onChange={(val) => {setVuaId(val.target.value)}} />
      </Form.Item>
  </Modal>
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="Loan Application Status"
        loading={loading}
        contentHeight={46}
      >
          <Button  type='primary'>
            View Status
          </Button>
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="Loan Repayment"
        loading={loading}
        contentHeight={46}
      >
          <Button  type='primary'>
            Pay
          </Button>
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="Apply For New Loan"
        loading={loading}
        contentHeight={46}
      >
        <Button  type='primary' onClick={() => {
          setVisible(true)
        }}>
            Apply
          </Button>
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="Active Loans"
        loading={loading}
        contentHeight={46}
      >
        <Button  type='primary'>
            View Loans
          </Button>
      </ChartCard>
    </Col>
  </Row>
  </>
};

export default IntroduceRow;
